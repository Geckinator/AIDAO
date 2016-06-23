__author__ = 'Konstantinos'

from scipy.interpolate import spline
import matplotlib.pyplot as plt
import sys
from factory import *
from utils import *
from collections import Counter
from random import Random
import pandas as pd

letters = ('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
           'w', 'x', 'y', 'z')


class Simulator(object):
    def __init__(self, text_file, a_factory, min_dur, max_dur, a_random):
        self.text_file = text_file
        self.min = min_dur
        self.max = max_dur
        self.factory = a_factory
        self.iterations = None
        self.mean_queue_length = 0
        self.rand = a_random
        self.cumul_reward = 0
        self.win_size = 10
        # self.window = pd.DataFrame(columns=letters)
        self.time = 0
        self.avg_word_length = 0
        self.estimates = dict.fromkeys(letters, 0)

    def initialize(self):
        self.factory.initialize()
        self.cumul_reward = 0
        self.time = 0
        self.avg_word_length = 0
        # self.estimates = dict.fromkeys(letters, 0)
        # self.window = pd.DataFrame(columns=letters)

    def run(self, words_to_read, plan, verbose=False):
        self.initialize()
        mean_queue_length = 0
        self.iterations = words_to_read
        f = open(self.text_file, 'r')

        for i, word in enumerate(generate_word(f)):
            self.time += 1
            # self.window.loc[len(self.window)] = 0
            c = Counter(word)
            self.update_stats(word, c)
            self.update_production_queue(self.time)
            # ----- Actions ------
            self.factory.react_to_incoming_word(c, self.time)

            """
            # build initial window
            for char in letters:
                if i > 0:
                    self.window[char][i] = self.window[char][i - 1] + Simulator.number_of_letters_in_word(char, c)
                else:
                    self.window[char][i] = Simulator.number_of_letters_in_word(char, c)"""
            if i == self.win_size - 1:
                break

        for word in generate_word(f):

            # prediction = self.fit_model()

            if verbose:
                print '------------- time:' + str(self.time) + '---------------------------'
            self.time += 1
            letters_distribution = Counter(word)
            # self.update_window(letters_distribution)

            self.update_stats(word, letters_distribution)
            self.update_production_queue(self.time)

            # ---- Actions -----
            self.factory.act(plan, letters_distribution, self.time, self.min, self.max)
            # self.factory.react_to_incoming_word(letters_distribution, self.time)
            # self.factory.plan2(self.time, self.rand)
            # self.factory.plan(self.avg_word_length, self.time, self.rand)
            # self.factory.scan_and_fill_2(self.time)

            # self.factory.ship_ready_products(time)
            self.factory.sell_ready_letters()
            self.cumul_reward += self.reward_function_2()
            mean_queue_length += (len(self.factory.words_queue) - mean_queue_length) / float(self.time)
            if verbose:
                print 'orders queue', [el[0] for el in self.factory.words_queue], '\np_time',
                print [pr_time for pr_time in self.factory.prod_times.values()], '\nletters',
                for l in letters:
                    print l.upper() + ',',
                print '\ndemand', [self.factory.unmet_demand[i] for i in letters]
                print 'prod  ', [self.factory.get_number_under_production(char) for char in letters]
                print 'stock ', [self.factory.get_stock_number(char) for char in letters]
                print 'free slots:', self.factory.free_slots, '\n'
                # print self.factory.production_queue
            if self.time >= self.iterations:
                break
        f.close()
        print 'p_time', [pr_time for pr_time in self.factory.prod_times.values()], '\nletters',
        for l1 in letters:
            print l1.upper() + ',',
        print '\ndemand', [self.factory.unmet_demand[i] for i in letters]
        print 'prod  ', [self.factory.get_number_under_production(char) for char in letters]
        print 'stock ', [self.factory.get_stock_number(char) for char in letters]
        print 'free slots:', self.factory.free_slots, '\n'
        print self.cumul_reward
        # print 'Served', self.factory.completed_words, 'words with average word length:', avg_length
        # print 'perf metric:', self.reward_function(self.time, mean_queue_length)
        # return self.factory.mean_service_time, mean_queue_length, self.factory.accum_money, self.cumul_reward
        return self.cumul_reward

    def update_production_queue(self, current_time):
        for key, a_list in self.factory.production_queue.iteritems():
            if not a_list:
                continue
            for el in a_list:
                if current_time - el[1] == self.factory.prod_times[key]:
                    self.factory.stock[key] += self.factory.production_queue[key].pop(0)[0]

    def reward_function(self, steps, avg_queue_length):
        """
        Takes into account 'words sold/served , avg_service_time and avg_queue_length
        :param steps: time steps (words) used/simulated
        :return: a weighted average in [0..1] (best 1)
        """
        if self.factory.mean_service_time > 4:
            ast = 4
        else:
            ast = self.factory.mean_service_time
        if avg_queue_length > 10:
            aql = 10
        else:
            aql = avg_queue_length
        return 0.5 * (steps - len(self.factory.words_queue)) / steps + 0.25 * (1 - (ast / 4)) + 0.25 * (1 - (aql / 10))

    def reward_function_2(self):
        """
        :return:
        """
        # metric = sum(abs(val) for val in (self.factory.unmet_demand - self.factory.stock - Counter({char: self.factory.get_number_under_production(char) for char in letters})).itervalues())
        metric = sum(val for val in self.factory.unmet_demand.itervalues())
        if metric > 100:
            metric = 100
        return 1 - metric / float(100)

    """def update_window(self, word_counter):
        assert isinstance(word_counter, Counter)
        self.window = self.window.drop(0).reset_index().ix[:, 1:len(self.window.columns) + 1]
        self.window.loc[len(self.window)] = 0
        for c in letters:
            self.window[c][self.win_size - 1] += self.window[c][self.win_size - 2] + Simulator.number_of_letters_in_word(c, word_counter)"""

    @staticmethod
    def number_of_letters_in_word(char, counter_of_word):
        assert isinstance(counter_of_word, Counter)
        if not counter_of_word[char]:
            return 0
        else:
            return counter_of_word[char]

    def update_stats(self, word, letters_distribution):
        self.factory.counts += letters_distribution
        self.factory.unmet_demand += letters_distribution
        self.avg_word_length += (sum(letters_distribution.itervalues()) - self.avg_word_length) / float(self.time)
        self.factory.words_queue.append((''.join(word), self.time))

    """def fit_model(self):
        # ArimaResultsClass
        self.window['ind'] = self.window.index
        #  use date as index
        self.window.index = pd.to_datetime(self.window.index, unit='D')
        self.window.set_index('ind').index
        # d = {c: ARIMA(self.window.c, order=(1, 0, 0)).fit() for c in letters}
        d = ARIMA(self.window.astype(float).a, order=(1, 0, 0))
        res = d.fit()
        del self.window['ind']
        return res"""

    def sim_and_plot(self, a_plan):
        fi = open(self.text_file, 'r')
        demand = defaultdict(list)
        for i, word in enumerate(generate_word(fi)):
            self.time += 1
            c = Counter(word)
            self.update_stats(word, c)
            for c1 in letters:
                demand[c1].append(self.factory.unmet_demand[c1])
            self.update_production_queue(self.time)
            # ----- Actions ------
            self.factory.react_to_incoming_word(c, self.time)

            if i == self.win_size - 1:
                break
        for word in generate_word(fi):
            self.time += 1
            letters_distribution = Counter(word)
            self.update_stats(word, letters_distribution)
            for c1 in letters:
                demand[c1].append(self.factory.unmet_demand[c1])
            self.update_production_queue(self.time)
            # ---- Actions -----
            self.factory.act(a_plan, letters_distribution, self.time, self.min, self.max)
            self.factory.sell_ready_letters()
            self.cumul_reward += self.reward_function_2()
            if self.time >= self.iterations:
                break
        fi.close()
        print 'total reward', self.cumul_reward
        interpolate_factor = 5
        # xnew = np.linspace(T.min(),T.max(),300)
        # power_smooth = spline(T,power,xnew)
        # plt.plot(xnew,power_smooth)
        for c1 in letters:
            plt.plot(np.linspace(1, self.iterations, self.iterations * interpolate_factor), spline([ii for ii in range(self.iterations)], np.array(demand[c1]), np.linspace(1, self.iterations, self.iterations * interpolate_factor)))
        plt.xlabel('Time')
        plt.ylabel('Demand')
        plt.title('Cumulative Demand graph')
        plt.legend(letters)
        try:
            plt.savefig('figures/' + self.text_file + '_' + 'words' + str(self.iterations) + '_' + 'plan' + str(a_plan) + '_mm' + str(self.min) + str(self.max) + '.png')
        except IOError:
            os.makedirs('figures/')
            plt.savefig('figures/' + self.text_file + '_' + 'words' + str(self.iterations) + '_' + 'plan' + str(a_plan) + '_mm' + str(self.min) + str(self.max) + '.png')
        plt.close()
        return self.cumul_reward


if __name__ == '__main__':
    capacity = int(sys.argv[1])
    rand = Random()
    min_pdur = int(sys.argv[2])
    max_pdur = int(sys.argv[3])
    factory = MegaFactory(capacity, [rand.randint(min_pdur, max_pdur) for l in letters])
    book = 'Alice.txt'
    sim = Simulator(book, factory, min_pdur, max_pdur, rand)
    sim.iterations = int(sys.argv[4])
    plan = int(sys.argv[5])
    sim.sim_and_plot(plan)
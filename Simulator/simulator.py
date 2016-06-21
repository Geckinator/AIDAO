__author__ = 'Konstantinos'

import re
from collections import Counter

letters = ('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
           'w', 'x', 'y', 'z')


class Simulator(object):
    def __init__(self, text_file, a_factory, a_random):
        self.text_file = text_file
        self.factory = a_factory
        self.iterations = None
        self.mean_queue_length = 0
        self.rand = a_random

    def initialize(self):
        self.factory.unmet_demand = Counter()
        self.factory.avg_service_time = 0
        self.factory.words_queue = []
        self.factory.completed_words = 0
        self.factory.counts = Counter()

    def run(self, iterations, verbose=False, debug=False):
        self.initialize()
        mean_queue_length = 0
        time = 0
        avg_length = 0
        self.iterations = iterations
        f = open(self.text_file, 'r')

        for word in self.generate_word(f):
            if verbose:
                print '---------------------------------------------'
            time += 1
            letters_distribution = Counter(word)
            self.factory.counts += letters_distribution
            self.factory.unmet_demand += letters_distribution
            avg_length += (sum(letters_distribution.itervalues()) - avg_length) / float(time)
            self.factory.words_queue.append((''.join(word), time))
            self.update_production_queue(time)

            # self.factory.fill_missing_letters(time)
            self.factory.plan(avg_length, time, self.rand)
            self.factory.react_to_incoming_word(letters_distribution, time)
            if verbose:
                print 'orders queue', [el[0] for el in self.factory.words_queue], '\np_time',
                print [pr_time for pr_time in self.factory.prod_times.values()], '\nletters',
                for l in letters:
                    print l.upper() + ',',
                print '\ndemand', [self.factory.unmet_demand[i] for i in letters]
                print 'prod  ', [self.factory.get_number_under_production(char) for char in letters]
                print 'stock ', [self.factory.get_stock_number(char) for char in letters]
                print 'free slots:', self.factory.free_slots, '\n'

            self.factory.ship_ready_products(time)
            mean_queue_length += (len(self.factory.words_queue) - mean_queue_length) / float(time)
        f.close()
        print 'Served', self.factory.completed_words, 'words with average word length:', avg_length
        print self.reward_function(time, mean_queue_length)
        return self.factory.mean_service_time, mean_queue_length

    def generate_word(self, a_file):
        i = 0
        done = False
        while i < self.iterations and not done:
            for line in a_file:
                words = re.findall(r'\w+', line)
                if len(words) == 0:
                    continue
                for w in words:
                    yield ''.join([char for char in w.lower() if char.isalpha()])
                    i += 1
                    if i == self.iterations:
                        done = True
                        break
                if done:
                    break
            # done = True

    def update_production_queue(self, current_time):
        for key, value in self.factory.production_queue.iteritems():
            if not value:
                continue
            if current_time - self.factory.production_queue[key][0][1] == self.factory.prod_times[key]:
                self.factory.stock[key] += self.factory.production_queue[key].pop(0)[0]

    def reward_function(self, steps, avg_queue_length):
        if not self.factory.words_queue:
            return 1
        metric = sum(abs(val) for val in (self.factory.unmet_demand - self.factory.stock - Counter({char: self.factory.get_number_under_production(char) for char in letters})).itervalues())
        if metric > 100:
            metric = 100
        if self.factory.mean_service_time > 4:
            ast = 4
        else:
            ast = self.factory.mean_service_time
        if avg_queue_length > 10:
            aql = 10
        else:
            aql = avg_queue_length
        return 0.5 * (steps - len(self.factory.words_queue)) / steps + 0.25 * (1 - (ast / 4)) + 0.25 * (1 - (aql / 10))

    def replicate(self, number_of_words, repetitions):
        mean_service_time_i, mean_queue_length_i = self.run(number_of_words, verbose=False, debug=False)
        var_service_time_i = 0
        var_queue_length_i = 0
        for i in xrange(2, repetitions + 1):
            self.factory.initialize_random_prod_times(1, 3, self.rand)
            res = self.run(number_of_words, verbose=False, debug=False)
            new_mean_service_time_i = mean_service_time_i + (res[0] - mean_service_time_i) / float(i)
            var_service_time_i = (1 - 1.0 / (i - 1)) * var_service_time_i + i * pow(new_mean_service_time_i - mean_service_time_i, 2)
            mean_service_time_i = new_mean_service_time_i
            new_mean_queue_length_i = mean_queue_length_i + (res[0] - mean_queue_length_i) / float(i)
            var_queue_length_i = (1 - 1.0 / (i - 1)) * var_queue_length_i + i * pow(new_mean_queue_length_i - mean_queue_length_i, 2)
            mean_queue_length_i = new_mean_queue_length_i
        return (mean_service_time_i, var_service_time_i), (mean_queue_length_i, var_queue_length_i)
__author__ = 'Konstantinos'

letters = ('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
           'w', 'x', 'y', 'z')
from collections import Counter, defaultdict


class MegaFactory(object):
    def __init__(self, capacity, production_times):
        self.capacity = capacity
        self.prod_times = dict(zip(letters, production_times))
        self.unmet_demand = Counter()
        self.stock = Counter()
        self.rates = dict.fromkeys(letters)
        self.production_queue = defaultdict(list)
        self.free_slots = capacity
        self.words_queue = []
        self.completed_words = 0
        self.mean_service_time = 0
        self.counts = Counter()
        self.accum_money = 0

    def insert_into_production_slot(self, letter, amount, current_time):
        if amount > self.free_slots:
            self.production_queue[letter].append((self.free_slots, current_time))
            self.free_slots = 0
        else:
            self.production_queue[letter].append((amount, current_time))
            self.free_slots -= amount

    def sell_word(self, word_order, current_time):
        """
        Trys to sell word if all components are in stock (finished being produced)
        :type word_order: tuple of word and time stamp
        """
        counts = Counter(word_order[0])
        print word_order[0], 'ready? : ', self.word_ready(word_order[0])
        if self.word_ready(word_order[0]):
            # print 'selling', word_order[0], '...'
            self.stock -= counts
            self.free_slots += sum(counts.itervalues())
            self.completed_words += 1
            self.mean_service_time += (current_time - word_order[1] - self.mean_service_time) / float(
                self.completed_words)
            self.words_queue.remove(word_order)
            self.accum_money += sum(self.unmet_demand[char] for char in counts.iterkeys())
            self.unmet_demand -= counts

    def react_to_incoming_word(self, letter_distribution, current_time):
        """counts
        puts into production the incoming word's letters
        :param letter_distribution: Counter
        """
        for key, l in letter_distribution.iteritems():
            diff = self.unmet_demand[key] - (self.get_number_under_production(key) + self.stock[key])
            if diff > 0:
                self.insert_into_production_slot(key, diff, current_time)

    def plan(self, avg_word_length, current_time, a_random):
        if current_time % 3 != 0:
            return
        if self.free_slots < self.capacity / 2:
            return
        pick = a_random.random()
        for char_tuple in self.counts.most_common(int(avg_word_length / 1)):
            if pick < self.get_rate(char_tuple[0], current_time):
                self.insert_into_production_slot(char_tuple[0], 1, current_time)

    def get_number_under_production(self, letter):
        return sum(order[0] for order in self.production_queue[letter])

    def get_rate(self, letter, current_time):
        return self.counts[letter] / float(current_time)

    def get_stock_number(self, letter):
        if letter not in self.stock:
            return 0
        return self.stock[letter]

    def ship_ready_products(self, current_time):
        for word_order in self.words_queue:
            self.sell_word(word_order, current_time)

    def initialize_random_prod_times(self, min_dur, max_dur, random):
        self.prod_times = dict(zip(letters, [random.randint(min_dur, max_dur) for l in letters]))

    def word_ready(self, word):
        c = Counter(word)
        for key, value in c.iteritems():
            if key not in self.stock or self.stock[key] < value:
                return False
        return True

    def scan_and_fill(self, current_time):
        for word in self.words_queue:
            self.fill_missing_letters(word, current_time)

    def fill_missing_letters(self, word, current_time):
        for char in word:
            diff = self.unmet_demand[char] - (self.get_number_under_production(char) + self.stock[char])
            if diff > 0:
                self.insert_into_production_slot(char, diff, current_time)
"""
     diff = self.unmet_demand[key] - (self.get_number_under_production(key) + self.stock[key])
            if diff > 0:
                self.insert_into_production_slot(key, diff, current_time)"""
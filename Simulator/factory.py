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
        self.mean_service_time = 0
        self.counts = Counter()
        self.accum_money = 0

    def initialize(self):
        self.unmet_demand = Counter()
        self.stock = Counter()
        self.rates = dict.fromkeys(letters)
        self.production_queue = defaultdict(list)
        self.free_slots = self.capacity
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

    def act(self, plan, letter_distribution, current_time, min1, max1, a_random):
        """
        :type plan: integer
        """
        if plan == 1:
            self.react_to_incoming_word(letter_distribution, current_time)
        elif plan == 2:
            self.react_to_incoming_word(letter_distribution, current_time)
            self.plan2(current_time, min1, max1)
        elif plan == 3:
            self.plan2(current_time, min1, max1)
            self.react_to_incoming_word(letter_distribution, current_time)
        elif plan == 4:
            self.plan(current_time, a_random)
            self.react_to_incoming_word(letter_distribution, current_time)
        elif type(plan) == list:
            self.act_with_parameter_vector(plan, current_time)
            self.react_to_incoming_word(letter_distribution, current_time)

    def react_to_incoming_word(self, letter_distribution, current_time):
        """counts
        puts into production the incoming word's letters
        :param letter_distribution: Counter
        """
        for key, l in letter_distribution.iteritems():
            diff = self.unmet_demand[key] - (self.get_number_under_production(key) + self.stock[key])
            if diff > 0:
                self.insert_into_production_slot(key, diff, current_time)

    def plan(self, current_time, a_random):
            pick = a_random.random()
            for l in letters:
                if pick < self.get_rate(l, current_time):  # and self.stock[char_tuple[0]] < 6:
                    self.insert_into_production_slot(l, 1, current_time)

    def plan2(self, current_time, min1, max1):
        if self.free_slots > self.capacity / 2:
            for l in letters:
                if self.get_rate(l, current_time) != 0:
                    if self.stock[l] + self.get_number_under_production(l) < (min1 + max1 + 5) / 2.0:
                        schedule_time = int(1 / self.get_rate(l, current_time)) - self.prod_times[l]
                        if schedule_time < 0:
                            schedule_time = current_time
                        else:
                            schedule_time += current_time
                        self.insert_into_production_slot(l, 1, schedule_time)

    def act_with_parameter_vector(self, chromosome, current_time):
        parameters = dict(zip(letters, chromosome))
        if self.free_slots > self.capacity / 2:
            for l in letters:
                if self.get_rate(l, current_time) != 0:
                    if self.stock[l] + self.get_number_under_production(l) < parameters[l]:
                        schedule_time = int(1 / self.get_rate(l, current_time)) - self.prod_times[l]
                        if schedule_time < 0:
                            schedule_time = current_time
                        else:
                            schedule_time += current_time
                        self.insert_into_production_slot(l, 1, schedule_time)

    def get_number_under_production(self, letter):
        return sum(order[0] for order in self.production_queue[letter])

    def get_rate(self, letter, current_time):
        return self.counts[letter] / float(current_time)

    def get_stock_number(self, letter):
        if letter not in self.stock:
            return 0
        return self.stock[letter]

    def sell_ready_letters(self):
        """
        Trys to sell letters in stock for which there exists a non-zero demand
        """
        for char, amount in self.stock.iteritems():
            if self.unmet_demand[char] > 0:
                if self.unmet_demand[char] > amount:
                    self.sell_a_letter(char, amount)
                else:
                    self.sell_a_letter(char, self.unmet_demand[char])

    def sell_a_letter(self, char, amount):
        assert(self.stock[char] >= amount)
        self.stock[char] -= amount
        self.accum_money += self.unmet_demand[char] * amount
        self.unmet_demand[char] -= amount
        self.free_slots += amount

    def initialize_random_prod_times(self, min_dur, max_dur, random):
        self.prod_times = dict(zip(letters, [random.randint(min_dur, max_dur) for _ in letters]))

    def word_ready(self, word):
        c = Counter(word)
        for key, value in c.iteritems():
            if key not in self.stock or self.stock[key] < value:
                return False
        return True

    def fill_missing_letters(self, word, current_time):
        for char in word:
            diff = self.unmet_demand[char] - (self.get_number_under_production(char) + self.stock[char])
            if diff > 0:
                self.insert_into_production_slot(char, diff, current_time)
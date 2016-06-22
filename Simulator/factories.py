__author__ = 'Konstantinos'


class Factory(object):
    def __init__(self, letter, capacity, prod_duration):
        self.letter = letter
        self.capacity = capacity
        self.prod_duration = prod_duration
        self.stock = 0
        self.queue = []
        self.under_production = 0

    def insert_into_production_line(self, amount, time):
        if self.stock + self.under_production + amount > self.capacity:
            self.queue.append((self.capacity - self.stock - self.under_production, time))
            self.under_production += self.capacity - self.stock - self.under_production
        else:
            self.queue.append((amount, time))
            self.under_production += amount

    def update_production_line(self, time):
        i = 0
        while time - self.queue[i][1] > self.prod_duration:
            self.stock += self.queue[i][0]
            self.under_production -= self.queue[i][0]
            i += 1

    def sell(self, amount):
        if amount > 0:
            if amount > self.stock:
                self.stock = 0
            else:
                self.stock -= amount
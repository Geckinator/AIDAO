# coding=utf-8
__author__ = 'Konstantinos'

from random import shuffle
from simulator import *


class EvolutionaryAlgorithm(object):
    def __init__(self, mu, lamda, dimensionality, domain, recombination_rate, mutation_rate, a_random, simulator, word_depth):
        assert(mu % 2 == 0)
        assert(lamda % 2 == 0)
        self.m = mu
        self.l = lamda
        self.d = dimensionality
        self.min = domain[0]
        self.max = domain[1]
        self.rec_rate = recombination_rate
        self.mut_rate = mutation_rate
        self.rand = a_random
        self.pop = []
        self.sim = simulator
        self.words = word_depth

    def evolve(self, num_of_generations, verbose=False):
        self.initialize_population()
        for i in xrange(num_of_generations):
            if verbose:
                print 'gen:', i, 'max fitness:', self.fittest[1]
            parents = self.select_parents()
            self.recombination(parents)
            self.mutation()
            self.select_survivors()
        return self.fittest

    def get_random_chromosome(self):
        chromosome = [self.rand.randint(self.min, self.max) for _ in xrange(self.d)]
        fitness = None
        return [chromosome, fitness]

    def initialize_population(self):
        for i in range(self.m):
            self.pop.append(self.get_random_chromosome())
            self.evaluate(i)

    def evaluate(self, index):
        self.pop[index][1] = self.sim.compute_fitness(self.pop[index][0], self.words)

    # Fitness Proportional Selection
    def select_parents(self):
        assert(len(self.pop) == self.m)
        fitness_sum = sum(el[1] for el in self.pop)
        cumul_probs = [el[1] / float(fitness_sum) for el in self.pop]
        assert(abs(sum(cumul_probs) - 1) < 0.001)
        for i in range(self.m - 1):
            cumul_probs[i + 1] += cumul_probs[i]
        parent_pointers = stochastic_universal_sampling(cumul_probs, self.l, self.rand)
        shuffle(parent_pointers)
        return parent_pointers

    # mu + lambda selection
    def select_survivors(self):
        assert(len(self.pop) == self.m + self.l)
        self.pop = [self.pop[index] for index in sorted(range(len(self.pop)), key=lambda x: self.pop[x][1])[self.l:]]
        assert(len(self.pop) == self.m)

    # uniform crossover for discrete values
    def crossover(self, ind1, ind2):
        if self.rand.random() < self.rec_rate:
            self.pop.append([[], None])
            self.pop.append([[], None])
            p = [self.rand.random() for _ in range(self.d)]
            for i, prob in enumerate(p):
                if prob < 0.5:
                    self.pop[-2][0].append(self.pop[ind1][0][i])
                    self.pop[-1][0].append(self.pop[ind2][0][i])
                else:
                    self.pop[-1][0].append(self.pop[ind2][0][i])
                    self.pop[-2][0].append(self.pop[ind1][0][i])
            assert(len(self.pop[-2][0]) == self.d)
            assert(len(self.pop[-1][0]) == self.d)
            self.evaluate(len(self.pop) - 2)
            self.evaluate(len(self.pop) - 1)

    # random resseting
    def mutate(self, ind):
        for i in range(self.d):
            if self.rand.random() < self.mut_rate:
                self.pop[ind][0][i] = self.rand.randint(self.min, self.max)

    def recombination(self, parents):
        for i in xrange(self.l / 2):
            self.crossover(parents[i], parents[i + 1])
        assert(len(self.pop) == self.m + self.l)

    def mutation(self):
        for i in xrange(self.l):
            self.mutate(i + self.m)

    @property
    def fittest(self):
        best = self.pop[0]
        for i in range(1, len(self.pop)):
            if self.pop[i][1] > best[1]:
                best = self.pop[i]
        return best

if __name__ == '__main__':
    rand = Random()
    prod_times = read_production_times()
    factory = MegaFactory(500, prod_times)
    sim = Simulator('Alice.txt', factory, 5, 15, rand)
    mu1 = int(sys.argv[1])
    lamda1 = int(sys.argv[2])
    d = int(sys.argv[3])
    min_value = int(sys.argv[4])
    max_value = int(sys.argv[5])
    rec_rate = float(sys.argv[6])
    mut_rate = float(sys.argv[7])
    words_to_read = int(sys.argv[8])
    generations = int(sys.argv[9])
    ea = EvolutionaryAlgorithm(mu1, lamda1, d, (min_value, max_value), rec_rate, mut_rate, rand, sim, words_to_read)
    fittest = ea.evolve(generations)
    print 'max fitness found', fittest[1]
    print fittest[1] / float(words_to_read) * 100, '%'
    print fittest[0]

    with open('ea.txt', 'a') as fi:
        fi.write('m: %d l: %d d: %d gens: %d domain:[%d,%d] rec_rate: %.1f mut_rate: %.2f words: %d\n' % (mu1, lamda1, d, generations, min_value, max_value, rec_rate, mut_rate, words_to_read))
        fi.write(str(fittest[1]) + '\n')
        fi.write(', '.join(str(x) for x in fittest[0]) + '\n')
        fi.write(', '.join(str(x) for x in prod_times) + '\n\n')
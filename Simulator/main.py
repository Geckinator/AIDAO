__author__ = 'Konstantinos'

from simulator import *
from random import Random
from utils import *
from eaAlgorithm import EvolutionaryAlgorithm
import sys


letters = ('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
           'w', 'x', 'y', 'z')

min_dur = 2
max_dur = 5
capacity = 500
rand = Random()
factory = MegaFactory(capacity, [rand.randint(min_dur, max_dur) for l in letters])

book = 'Alice.txt'
book1 = '../a.txt'  # has 10 words
f = open(book, 'r')
if len(sys.argv) > 1:
    n = int(sys.argv[1])  # of words to read
verb = False
if len(sys.argv) == 3:
    if sys.argv[2] == 'true' or sys.argv[2] == 'True':
        verb = True

capacity = int(sys.argv[1])
rand = Random()
min_pdur = int(sys.argv[2])
max_pdur = int(sys.argv[3])
factory = MegaFactory(capacity, [13, 14, 12, 8, 5, 10, 11, 7, 10, 14, 15, 6, 11, 14, 11, 11, 15, 12, 14, 12, 15, 12, 6, 11, 5, 15])
book = 'Alice.txt'
sim = Simulator(book, factory, min_pdur, max_pdur, rand)
sim.iterations = int(sys.argv[4])
plan = [9, 14, 5, 19, 22, 16, 1, 9, 10, 14, 12, 8, 1, 13, 17, 7, 15, 4, 15, 7, 19, 5, 12, 1, 16, 20]
sim.sim_and_plot(plan)

"""
rand = Random()
factory = MegaFactory(500, [rand.randint(5, 15) for _ in letters])
sim = Simulator('Alice.txt', factory, 5, 15, rand)
mu1 = 10
lamda1 = 70
d = 26
min_value = 1
max_value = 20
rec_rate = 1
mut_rate = 0.2
words_to_read = 200
generations = 100
ea = EvolutionaryAlgorithm(mu1, lamda1, d, (min_value, max_value), rec_rate, mut_rate, rand, sim, words_to_read)
fittest = ea.evolve(generations)
print 'max fitness found', fittest[1]
print fittest[1] / float(words_to_read) * 100, '%'
print fittest[0]"""
__author__ = 'Konstantinos'

from utils import *
from simulator import Simulator
from factory import MegaFactory
import sys
from random import Random

letters = ('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
           'w', 'x', 'y', 'z')

if __name__ == '__main__':
    rand = Random()
    capacity = 500
    min_pdur = 5
    max_pdur = 15
    offset = int(sys.argv[1])
    number_of_words = int(sys.argv[2])
    repetitions = int(sys.argv[3])
    plan = 1
    prod_times = read_production_times()
    factory = MegaFactory(capacity, prod_times)
    book = 'Alice.txt'
    sim = Simulator(book, factory, min_pdur, max_pdur, rand)
    # mean, std = replicate(sim, offset, number_of_words, repetitions, plan)
    #with open('results/baseline', 'a') as f:
      #  f.write('words [%d..%d] reps %d mean: %.2f std: %.2f\n\n' % (offset, offset + number_of_words, repetitions, mean, std))
    #print 'mean', mean, 'std', std
    sim.sim_and_plot(offset, number_of_words, plan)
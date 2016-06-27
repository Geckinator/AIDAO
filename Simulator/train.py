__author__ = 'Konstantinos'

from simulator import *
from random import Random
from utils import *
from eaAlgorithm import EvolutionaryAlgorithm
import sys
from collections import Counter


letters = ('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
           'w', 'x', 'y', 'z')


def main(text_file, num_train_words, num_test_words, replicates, generations, min_dur=5, max_dur=15, a_capacity=500, mu=10,
         lamda=70, mut_rate=0.5):
    rand1 = Random()
    prod_times = read_production_times()
    fact = MegaFactory(a_capacity, prod_times)
    sim1 = Simulator(text_file, fact, min_dur, max_dur, rand1)
    res = get_counts_on_train_set(text_file, num_train_words, verbose=True)
    fact.incorporate_train_counts(res, num_train_words)
    ea = EvolutionaryAlgorithm(mu, lamda, 26, (1, 10), 1, mut_rate, rand1, sim1, num_train_words)
    fittest = ea.evolve(generations, verbose=True)
    plan0 = fittest[0]
    print plan0
    res = replicate(sim1, num_train_words, num_test_words, replicates, plan0)
    for c in letters:
        print fact.counts[c] / float(num_train_words + num_test_words)
    with open('results/resuls.txt', 'a') as fi:
        fi.write('words: [%d...%d] reps: %d, evols: %d mean: %.2f std: %.2f min %d max %d\n' % (num_train_words, num_train_words + num_test_words, replicates, generations, res[0], res[1], sim1.min, sim1.max))
        fi.write('plan: ')
        for i in plan0:
            fi.write('%s ' % i)
        fi.write('\n')
    print 'mean', res[0], 'std:', res[1]
    # sim1.sim_and_plot(num_train_words, num_test_words, plan0)

if __name__ == '__main__':
    book = str(sys.argv[1])
    num_train_words0 = int(sys.argv[2])
    num_test_words0 = int(sys.argv[3])
    replicates0 = int(sys.argv[4])
    generations0 = int(sys.argv[5])
    main(book, num_train_words0, num_test_words0, replicates0, generations0, min_dur=5, max_dur=15, a_capacity=500, mu=10, lamda=70, mut_rate=0.5)
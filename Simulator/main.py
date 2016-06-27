__author__ = 'Konstantinos'

from simulator import *
from random import Random
from utils import *
from eaAlgorithm import EvolutionaryAlgorithm
import sys


letters = ('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
           'w', 'x', 'y', 'z')

aplan = [2, 9, 9, 1, 2, 7, 3, 8, 8, 5, 2, 6, 2, 8, 8, 2, 6, 1, 6, 3, 6, 10, 1, 10, 1, 1]
rand1 = Random()
prod_times = read_production_times()
fact = MegaFactory(500, prod_times)
sim1 = Simulator('Alice.txt', fact, 5, 15, rand1)


def main(aaplan):
    li = []
    for i in xrange(100):
        rand1.seed(i)
        res = sim1.run(1000, 1000, aaplan, verbose=False)
        li.append(res)
    mean = sum(li) / float(len(li))
    std = sqrt(sum((ob - mean) ** 2 for ob in li) / float(len(li)))
    print 'mean:', mean, 'std:', std

"""
def main2():
    plan = [2, 9, 9, 1, 2, 7, 3, 8, 8, 5, 2, 6, 2, 8, 8, 2, 6, 1, 6, 3, 6, 10, 1, 10, 1, 1]
    rand1 = Random()
    prod_times = read_production_times()
    fact = MegaFactory(500, prod_times)
    sim1 = Simulator('Alice.txt', fact, 5, 15, rand1)
    sim1.sim_and_plot(1000, 1000, plan)"""

if __name__ == '__main__':
    main(1)
    main(aplan)
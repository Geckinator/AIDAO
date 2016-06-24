__author__ = 'Konstantinos'

from utils import replicate
from simulator import Simulator
from factory import MegaFactory
import sys
from random import Random

letters = ('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
           'w', 'x', 'y', 'z')

if __name__ == '__main__':
    rand = Random()
    capacity = int(sys.argv[1])
    min_pdur = int(sys.argv[2])
    max_pdur = int(sys.argv[3])
    number_of_words = int(sys.argv[4])
    repetitions = int(sys.argv[5])
    plan = int(sys.argv[6])
    factory = MegaFactory(capacity, [rand.randint(min_pdur, max_pdur) for l in letters])
    book = 'Alice.txt'
    sim = Simulator(book, factory, min_pdur, max_pdur, rand)
    mean, std = replicate(sim, number_of_words, repetitions, plan)
    print 'mean', mean, 'std', std
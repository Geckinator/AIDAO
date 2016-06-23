__author__ = 'Konstantinos'

from factory import MegaFactory
from simulator import *
from random import Random
from utils import *

import sys


letters = ('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
           'w', 'x', 'y', 'z')

min_dur = 1
max_dur = 5
capacity = 500
rand = Random()
factory = MegaFactory(capacity, [rand.randint(min_dur, max_dur) for l in letters])

book = 'Alice.txt'
book1 = '../a.txt'  # has 10 words
f = open(book, 'r')
if len(sys.argv) == 2:
    n = int(sys.argv[1])  # of words to read
verb = False
if len(sys.argv) == 3:
    if sys.argv[2] == 'true' or sys.arvg[2] == 'True':
        verb = True

sim = Simulator(book, factory, min_dur, max_dur, rand)
plan = 2
# mean_service_time, avg_queue_length, money, total_reward = sim.run(n, 2, verbose=verb)

# print 'Average Service Time:', mean_service_time
# print 'Average queue length:', avg_queue_length
# print 'Total money:', money
# print 'Total reward:', total_reward

# replicate(sim, 100, 10, 2)

draw_graph(book, 100)

# print replicate(sim, n, 100)



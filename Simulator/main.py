__author__ = 'Konstantinos'

from factory import MegaFactory
from simulator import *
from random import Random
from utils import *
import sys
#import pandas as pd

letters = ('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
           'w', 'x', 'y', 'z')

min_dur = 1
max_dur = 3
capacity = 500
rand = Random()
factory = MegaFactory(capacity, [rand.randint(min_dur, max_dur) for l in letters])

book = '../Alice.txt'
book1 = '../a.txt'  # has 10 words
f = open(book, 'r')
n = int(sys.argv[1])  # of words to read
verb = False
if len(sys.argv) == 3:
    if sys.argv[2] == 'true' or sys.arvg[2] == 'True':
        verb = True
sim = Simulator(book, factory, rand)

# train_data = pd.DataFrame(columns=letters)

#for word in generate_word(1000, f):
    #train_data.loc[len(train_data)] = 0
    #for l in
mean_service_time, avg_queue_length = sim.run(n, verbose=verb, debug=False)

print 'Average Service Time:', mean_service_time
print 'Average queue length:', avg_queue_length

# print replicate(sim, n, 100)



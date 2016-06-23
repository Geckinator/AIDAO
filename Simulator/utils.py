__author__ = 'Konstantinos'

import matplotlib.pyplot as plt
import re
import os
from math import sqrt
import numpy as np
from collections import Counter

letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
           'w', 'x', 'y', 'z']


def generate_word(a_file):
    for line in a_file:
        words = re.findall(r'\w+', line)
        if len(words) == 0:
            continue
        for w in words:
            yield ''.join([char for char in w.lower() if char.isalpha()])


def replicate(simulator, words_to_read, iterations, plan):
    with open('results' + str(plan) + '.txt', 'a') as fi:
        obs = np.empty(iterations)
        for i in xrange(iterations):
            simulator.rand.seed(i)
            simulator.factory.initialize_random_prod_times(simulator.min, simulator.max, simulator.rand)
            obs[i] = simulator.run(words_to_read, plan, verbose=False)

        mean = sum(obs) / float(iterations)
        var = sum((ob - mean) ** 2 for ob in obs) / float(iterations)
        fi.write('words: %d reps: %d, mean: %d std: %.2f min %d max %d\n\n' % (words_to_read, iterations, mean, sqrt(var), simulator.min, simulator.max))


def draw_graph(text_file, num_of_words):
    c = Counter('abcdefghijklmnopqrstuvwxyz')
    data = np.empty((num_of_words, 26))
    with open(text_file, 'r') as fi:
        for i, word in enumerate(generate_word(fi)):
            if i == num_of_words:
                break
                c += Counter(word)
            for ii, l in enumerate(letters):
                data[i, ii] = c[l] - 1

    for i in xrange(len(letters)):
        plt.plot(np.linspace(1, num_of_words, num_of_words), data[:, i], 'o')

    plt.xlabel('Time')
    plt.ylabel('Demand')
    plt.title('Cumulative Demand graph')
    plt.legend(letters)

    try:
        plt.savefig('figures/trend_graph' + text_file + str(num_of_words) + '.png')
    except IOError:
        os.makedirs('figures/')
        plt.savefig('figures/trend_graph' + text_file + str(num_of_words) + '.png')
    plt.close()

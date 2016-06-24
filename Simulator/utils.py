__author__ = 'Konstantinos'

import re
from math import sqrt
import numpy as np

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
        std = sqrt(sum((ob - mean) ** 2 for ob in obs) / float(iterations))
        fi.write('words: %d reps: %d, mean: %d std: %.2f min %d max %d\n\n' % (words_to_read, iterations, mean, std, simulator.min, simulator.max))
    return mean, std


def stochastic_universal_sampling(cumul_probs, num_of_samples, a_rand):
    r = a_rand.random() / num_of_samples
    indices = []
    current_member = 1
    i = 1
    while current_member <= num_of_samples:
        while r <= cumul_probs[i - 1]:
            indices.append(i - 1)
            r += 1.0 / num_of_samples
            current_member += 1
        i += 1
    return indices
"""
double rand = aRandom.nextDouble() / numberOfSamples;
    int[] indicesSampled = new int[numberOfSamples];
    int currentMember = 1;
    int i = 1;
    // stochastic universal sampling algorithm
    while (currentMember <= numberOfSamples){
        while (rand <= cumulProbs[i-1]){
            indicesSampled[currentMember-1] = i-1;
            rand += 1.0/numberOfSamples;
            currentMember ++;
        }
        i ++;
    }
    return indicesSampled;"""
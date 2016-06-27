__author__ = 'Konstantinos'

import re
from math import sqrt
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


def replicate(simulator, offset, words_to_read, iterations, plan):
    obs = []
    for i in xrange(iterations):
        simulator.factory.counts = simulator.factory.train_counts
        simulator.rand.seed(i)
        obs.append(simulator.run(offset, words_to_read, plan, verbose=False))
    mean = sum(obs) / float(iterations)
    std = sqrt(sum((ob - mean) ** 2 for ob in obs) / float(iterations))
    return mean, std


def read_production_times():
    with open('prod_times.txt', 'r') as f:
        line = f.readline().split()
    print line
    res = map(int, line)
    return res


def get_counts_on_train_set(a_text_file, words_to_read, verbose=False):
    """
    :param a_text_file: String
    :param words_to_read: integer
    """
    counts = Counter()
    f = open(a_text_file, 'r')
    for i, word in enumerate(generate_word(f)):
        counts += Counter(word)
        if i == words_to_read - 1:
            break
    if verbose:
        for c in letters:
            print counts[c] / float(words_to_read),
    return counts


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
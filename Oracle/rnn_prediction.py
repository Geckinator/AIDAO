from pybrain.structure import *
from nltk.tokenize import RegexpTokenizer
from pybrain.datasets import SupervisedDataSet
from pybrain.supervised.trainers import BackpropTrainer
import math
import numpy
from string import ascii_lowercase



tokenizer =RegexpTokenizer(r'\w+')
letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","x","y","z"]
cumulative = True
vanilla_data={}
data = {}
for c in ascii_lowercase:
    data[c] = 0

timeseries = []
with open('mobydick.txt', 'r') as f:
    for line in f:
        line = f.readline().lower()
        line = tokenizer.tokenize(line)
        for word in line:
            if not(cumulative):
                # data = dict.copy(vanilla_data)
                data = {}
                for c in ascii_lowercase:
                    data[c] = 0

            for letter in word:
                if letter in letters:
                    if letter in data:
                        data[letter] += 1
                    else:
                        data[letter] = 1


            timeseries.append(dict(data))

print('Book parsed')

timeseries_train = timeseries[0:math.floor(len(timeseries)/2)]
timeseries_test = timeseries[math.floor(len(timeseries)/2): len(timeseries)]
train_a = SupervisedDataSet(1, 1)
test_a = SupervisedDataSet(1, 1)

if len(timeseries_train) > len(timeseries_test):
    index_limit=len(timeseries_test)
else:
    index_limit = len(timeseries_train)
for i in range(index_limit):
    train_a.addSample(i, timeseries_train[i]['a'])
    test_a.addSample(i+len(timeseries_train), timeseries_test[i]['a'])

print("Train and Test data created")
n = RecurrentNetwork()
n.addInputModule(LinearLayer(1, name='in'))
n.addModule(LSTMLayer(130, name='hidden'))
# n.addModule(LSTMLayer(130, name='hidden2'))

n.addOutputModule(LinearLayer(1, name='out'))
n.addConnection(FullConnection(n['in'], n['hidden'], name='c1'))
# n.addConnection(FullConnection(n['hidden'], n['hidden2'], name='c2'))

n.addConnection(FullConnection(n['hidden'], n['out'], name='c3'))
n.addRecurrentConnection(FullConnection(n['hidden'], n['hidden'], name='c4'))
n.sortModules()

print("Network built, training model....")

trainer = BackpropTrainer(n, train_a)
trainer.trainEpochs(20)

trainer.testOnData(test_a,verbose=True)
print (numpy.array([n.activate(x) for x, _ in test_a]))

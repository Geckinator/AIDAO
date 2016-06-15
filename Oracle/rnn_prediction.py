from pybrain.structure import *
from nltk.tokenize import RegexpTokenizer
from pybrain.datasets import SupervisedDataSet
from pybrain.supervised.trainers import BackpropTrainer
import math

i = 0;

tokenizer =RegexpTokenizer(r'\w+')
letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","x","y","z"]

vanilla_data={}
for i in range(ord('a'), ord('n')+1):
    vanilla_data[chr(i)] = 0

timeseries = []
with open('mobydick.txt', 'r') as f:
    for line in f:
        line = f.readline().lower()
        line = tokenizer.tokenize(line)
        for word in line:
            data = vanilla_data
            for letter in word:
                if letter in data:
                    data[letter] += 1
                else:
                    data[letter] = 1


            timeseries.append(data)
    i+=1
print('Book parsed')

timeseries_train =  timeseries[0:math.floor(len(timeseries)/2)]
timeseries_test = timeseries[math.floor(len(timeseries)/2): len(timeseries)]
train_a = SupervisedDataSet(1, 1)
test_a = SupervisedDataSet(1, 1)

if len(timeseries_train) > len(timeseries_test):
    index_limit=len(timeseries_test)
else:
    index_limit = len(timeseries_train)
for i in range(index_limit):
    train_a.addSample(i, timeseries_train[i]['a'])
    test_a.addSample(i, timeseries_test[i]['a'])

print("Train and Test data created")
n = RecurrentNetwork()
n.addInputModule(LinearLayer(1, name='in'))
n.addModule(SigmoidLayer(3, name='hidden'))
n.addOutputModule(LinearLayer(1, name='out'))
n.addConnection(FullConnection(n['in'], n['hidden'], name='c1'))
n.addConnection(FullConnection(n['hidden'], n['out'], name='c2'))
n.addRecurrentConnection(FullConnection(n['hidden'], n['hidden'], name='c3'))
n.sortModules()

print("Network built, training model....")

trainer = BackpropTrainer(n, train_a)
trainer.trainUntilConvergence()

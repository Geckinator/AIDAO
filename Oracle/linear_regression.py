from sklearn.linear_model import Ridge
import numpy as np
from nltk.tokenize import RegexpTokenizer
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


n_samples= len(timeseries)
n_features = 1;
np.random.seed(0)
y = np.random.randn(n_samples)
X = np.random.randn(n_samples, n_features)
clf = Ridge(alpha=1.0)
clf.fit(X, y)

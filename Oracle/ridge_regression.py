from sklearn.linear_model import Ridge
import pandas as pd
import random
import matplotlib.pyplot as plt
from matplotlib.pylab import rcParams
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


def ridge_regression(data, predictors, alpha, models_to_plot={}):
    #Fit the model
    ridgereg = Ridge(alpha=alpha,normalize=True)
    ridgereg.fit(data[predictors],data['y'])
    y_pred = ridgereg.predict(data[predictors])

    #Check if a plot is to be made for the entered alpha
    if alpha in models_to_plot:
        plt.subplot(models_to_plot[alpha])
        plt.tight_layout()
        plt.plot(data['x'],y_pred)
        plt.plot(data['x'],data['y'],'.')
        plt.title('Plot for alpha: %.3g'%alpha)

    #Return the result in pre-defined format
    rss = sum((y_pred-data['y'])**2)
    ret = [rss]
    ret.extend([ridgereg.intercept_])
    ret.extend(ridgereg.coef_)
    return ret

#Importing libraries. The same will be used throughout the article.

rcParams['figure.figsize'] = 12, 10

#Define input array with angles from 60deg to 300deg converted to radians
x = np.array([i for i in range(1,len( timeseries))])
y= np.array([timeseries[i]['c'] for i in range(1,len( timeseries))])
# for i in range(len(timeseries)):
#     y_temp =  timeseries[i]['a']
#
#     y.add_argument(y_temp)
data = pd.DataFrame(np.column_stack([x,y]),columns=['x','y'])
plt.plot(data['x'],data['y'],'.')
plt.show()

for i in range(2,16):  #power of 1 is already there
    colname = 'x_%d'%i      #new var will be x_power
    data[colname] = data['x']**i
print (data.head())

#Initialize predictors to be set of 15 powers of x
predictors=['x']
predictors.extend(['x_%d'%i for i in range(2,16)])

#Set the different values of alpha to be tested
alpha_ridge = [1e-15, 1e-10, 1e-8, 1e-4, 1e-3,1e-2, 1, 5, 10, 20]

#Initialize the dataframe for storing coefficients.
col = ['rss','intercept'] + ['coef_x_%d'%i for i in range(1,16)]
ind = ['alpha_%.2g'%alpha_ridge[i] for i in range(0,10)]
coef_matrix_ridge = pd.DataFrame(index=ind, columns=col)

models_to_plot = {1e-15:231, 1e-10:232, 1e-4:233, 1e-3:234, 1e-2:235, 5:236}
for i in range(10):
    coef_matrix_ridge.iloc[i,] = ridge_regression(data, predictors, alpha_ridge[i], models_to_plot)
plt.show()

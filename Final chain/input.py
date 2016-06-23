import numpy as np
import argparse
from sklearn.linear_model import Ridge
import pandas as pd
import matplotlib.pyplot as plt
from operator import itemgetter
from matplotlib.pylab import rcParams

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
    return ridgereg, ret

def predict_ridge_reg(demand, productionTime, letter, plot):
    # return the sum to the output stream
    rcParams['figure.figsize'] = 12, 10

    # Define input array with angles from 60deg to 300deg converted to radians
    x = np.array([i for i in range(0, demand.shape[1])])
    y = demand[letter][:]
    # for i in range(len(timeseries)):
    #     y_temp =  timeseries[i]['a']
    #
    #     y.add_argument(y_temp)
    data = pd.DataFrame(np.column_stack([x, y]), columns=['x', 'y'])
    if (plot):
        plt.plot(data['x'], data['y'], '.')
        plt.show()

    for i in range(2, 16):  # power of 1 is already there
        colname = 'x_%d' % i  # new var will be x_power
        data[colname] = data['x'] ** i

    # Initialize predictors to be set of 6 powers of x
    predictors = ['x']
    predictors.extend(['x_%d' % i for i in range(2, 7)])

    # Set the different values of alpha to be tested
    alpha_ridge = [1e-15, 1e-10, 1e-8, 1e-4, 1e-3, 1e-2, 1, 5, 10, 20]

    # Initialize the dataframe for storing coefficients.
    col = ['rss', 'intercept'] + ['coef_x_%d' % i for i in range(1, 16)]
    ind = ['alpha_%.2g' % alpha_ridge[i] for i in range(0, 10)]
    coef_matrix_ridge = pd.DataFrame(index=ind, columns=col)


    models_to_plot = {1e-15: 231, 1e-10: 232, 1e-4: 233, 1e-3: 234, 1e-2: 235, 5: 236}
    if (plot):
        for i in range(10):
            a, coef_matrix_ridge.iloc[i,] = ridge_regression(data, predictors, alpha_ridge[i], models_to_plot)
        plt.show()
    reg,_ = ridge_regression(data, predictors, alpha_ridge[3], models_to_plot)
    return reg.predict(np.array([(demand.shape[1] + productionTime)**i for i in range(1,7)]).reshape(1, -1))


def main():

    # Get the arguments sent to the oracle from index.js
    parser = argparse.ArgumentParser(description='Oracle which handles orders according to changing demand.')
    parser.add_argument('-t', '--demand', help='The demand history so far.', required=True)
    parser.add_argument('-u', '--productionTimes', help='The production times for all 26 letters.', required=True)
    parser.add_argument('-v', '--nEmptySlot', help='The number of available slots at current time.', required=True)
    args = vars(parser.parse_args())

    demand = np.array(eval(args['demand']))
    productionTimes = np.array(eval(args['productionTimes']))
    nEmptySlot = int(args['nEmptySlot'])

    # Do regressin on all letters, storing predictions and labeling them with the corresponding letter
    predictions = [(predict_ridge_reg(demand, productionTimes[letter], letter, False), letter) for letter in range(0, demand.shape[0])]

    # Pick nEmptySlot of the letters with highest predictions
    lettersToProduce = []
    for i in range(0, nEmptySlot):
        predictions.sort(key=itemgetter(0), reverse=True)
        lettersToProduce.append(predictions[0][1])
        predictions[0] = (predictions[0][0] - 1, predictions[0][1])

    print lettersToProduce



#start process
if __name__ == '__main__':
    main()

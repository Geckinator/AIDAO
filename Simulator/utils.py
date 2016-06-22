__author__ = 'Konstantinos'

import re
import numpy as np
import pandas as pd
from statsmodels.tsa.arima_model import ARIMA
import matplotlib.pylab as plt
import datetime
from dateutil.relativedelta import relativedelta
from statsmodels.tsa.stattools import acf, pacf

df = pd.DataFrame(
    columns=['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
             't', 'u', 'v', 'w', 'x', 'y', 'z'])


def generate_word(a_file):
    for line in a_file:
        words = re.findall(r'\w+', line)
        if len(words) == 0:
            continue
        for w in words:
            yield ''.join([char for char in w.lower() if char.isalpha()])
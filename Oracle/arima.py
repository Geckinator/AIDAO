import numpy as np 
import pandas as pd
from statsmodels.tsa.arima_model import ARIMA
import matplotlib.pylab as plt
import datetime
from dateutil.relativedelta import relativedelta
from statsmodels.tsa.stattools import acf, pacf

df = pd.DataFrame(columns = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s',
	't','u','v','w','x','y','z'])
f = open('alice-train.txt')
words = f.read().split()

#making data frame with amount of letters for each step(word)
for i, word in enumerate(words):
	df.loc[len(df)] = 0
	word_new = word.translate(None, "1234567890_-*,?.!/;:'&#@$^`").lower()
	for l in word_new:
		for c in df.columns:
			if l == c:
				df[c][i] += 1
	words[i] = word_new



	

def arima():
	# creat column for index
	df['ind'] = df.index

	# use date as index
	df.index = pd.to_datetime(df.index, unit='D')
	df.set_index('ind').index

	# building models
	model = ARIMA(df.a, order=(1, 0, 1))  
	results_a = model.fit()  
	
	model = ARIMA(df.b, order=(1, 0, 1))  
	results_b = model.fit()  
	
	model = ARIMA(df.c, order=(1, 0, 1))  
	results_c = model.fit()  
	
	model = ARIMA(df.d, order=(3, 0, 0))  
	results_d = model.fit(disp=-1)  

	model = ARIMA(df.e, order=(1, 0, 1))  
	results_e = model.fit()  

	model = ARIMA(df.f, order=(3, 0, 0))  
	results_f = model.fit()  

	model = ARIMA(df.g, order=(1, 0, 1))  
	results_g = model.fit()  

	model = ARIMA(df.h, order=(1, 0, 1))  
	results_h = model.fit()  

	model = ARIMA(df.i, order=(3, 0, 0))  
	results_i = model.fit()  

	model = ARIMA(df.j, order=(3, 0, 0))  
	results_j = model.fit()  

	model = ARIMA(df.k, order=(1, 0, 1))  
	results_k = model.fit()  

	model = ARIMA(df.l, order=(1, 0, 1))  
	results_l = model.fit()  

	model = ARIMA(df.m, order=(1, 0, 1))  
	results_m = model.fit()  

	model = ARIMA(df.n, order=(3, 0, 0))  
	results_n = model.fit()  

	model = ARIMA(df.o, order=(3, 0, 0))  
	results_o = model.fit() 

	model = ARIMA(df.p, order=(1, 0, 1))  
	results_p = model.fit()  

	model = ARIMA(df.q, order=(3, 0, 0))  
	results_q = model.fit()  

	model = ARIMA(df.r, order=(3, 0, 0))  
	results_r = model.fit()  

	model = ARIMA(df.s, order=(3, 0, 0))  
	results_s = model.fit()  

	model = ARIMA(df.t, order=(1, 0, 1))  
	results_t = model.fit() 

	model = ARIMA(df.u, order=(1, 0, 1))  
	results_u = model.fit() 

	model = ARIMA(df.v, order=(3, 0, 0))  
	results_v = model.fit()    

	model = ARIMA(df.w, order=(3, 0, 0))  
	results_w = model.fit()  

	model = ARIMA(df.x, order=(3, 0, 0))  
	results_x = model.fit()  

	model = ARIMA(df.y, order=(3, 0, 0))  
	results_y = model.fit()  

	model = ARIMA(df.z, order=(1, 0, 1))  
	results_z = model.fit()  

	# set start and duration of forcasting
	start = datetime.datetime.strptime("2025-12-27", "%Y-%m-%d")
	date_list = [start + relativedelta(days=x) for x in range(0,12)]
	future = pd.DataFrame(index=date_list, columns= df.columns)
	da = pd.concat([df, future])

	# prediction
	da['forecast_a'] = results_a.predict(start = 20449, end= 20500, dynamic= True)  
	da['forecast_b'] = results_b.predict(start = 20449, end= 20500, dynamic= True)  
	da['forecast_c'] = results_c.predict(start = 20449, end= 20500, dynamic= True) 
	da['forecast_d'] = results_d.predict(start = 20449, end= 20500, dynamic= True)
	da['forecast_e'] = results_e.predict(start = 20449, end= 20500, dynamic= True)
	da['forecast_f'] = results_f.predict(start = 20449, end= 20500, dynamic= True)
	da['forecast_g'] = results_g.predict(start = 20449, end= 20500, dynamic= True)
	da['forecast_h'] = results_h.predict(start = 20449, end= 20500, dynamic= True)
	da['forecast_i'] = results_i.predict(start = 20449, end= 20500, dynamic= True)
	da['forecast_j'] = results_j.predict(start = 20449, end= 20500, dynamic= True)
	da['forecast_k'] = results_k.predict(start = 20449, end= 20500, dynamic= True)
	da['forecast_l'] = results_l.predict(start = 20449, end= 20500, dynamic= True)
	da['forecast_m'] = results_m.predict(start = 20449, end= 20500, dynamic= True)
	da['forecast_n'] = results_n.predict(start = 20449, end= 20500, dynamic= True)
	da['forecast_o'] = results_o.predict(start = 20449, end= 20500, dynamic= True)
	da['forecast_p'] = results_p.predict(start = 20449, end= 20500, dynamic= True) 
	da['forecast_q'] = results_q.predict(start = 20449, end= 20500, dynamic= True)
	da['forecast_r'] = results_r.predict(start = 20449, end= 20500, dynamic= True)
	da['forecast_s'] = results_s.predict(start = 20449, end= 20500, dynamic= True)
	da['forecast_t'] = results_t.predict(start = 20449, end= 20500, dynamic= True)
	da['forecast_u'] = results_u.predict(start = 20449, end= 20500, dynamic= True)
	da['forecast_v'] = results_v.predict(start = 20449, end= 20500, dynamic= True)
	da['forecast_w'] = results_w.predict(start = 20449, end= 20500, dynamic= True)
	da['forecast_x'] = results_x.predict(start = 20449, end= 20500, dynamic= True)
	da['forecast_y'] = results_y.predict(start = 20449, end= 20500, dynamic= True)
	da['forecast_z'] = results_z.predict(start = 20449, end= 20500, dynamic= True)
	
	# plotting
	# df[[
	# 'forecast_a',
	# 'forecast_b',
	# 'forecast_c',
	# 'forecast_d',
	# 'forecast_e',
	# 'forecast_f',
	# 'forecast_g',
	# 'forecast_h',
	# 'forecast_i',
	# 'forecast_j',
	# 'forecast_k',
	# 'forecast_l',
	# 'forecast_m',
	# 'forecast_n',
	# 'forecast_o',
	# 'forecast_p',
	# 'forecast_q',
	# 'forecast_r',
	# 'forecast_s',
	# 'forecast_t',
	# 'forecast_u',
	# 'forecast_v',
	# 'forecast_w',
	# 'forecast_x',
	# 'forecast_y',
	# 'forecast_z'
	# ]].plot(figsize=(12, 8), colormap='gist_rainbow')

	# plt.show()
arima()


		
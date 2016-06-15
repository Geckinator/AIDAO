import numpy as np
import pandas as pd




def frequence():

	dfreq = pd.DataFrame(columns = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s',
		't','u','v','w','x','y','z'])
	dprod = pd.DataFrame(columns = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s',
		't','u','v','w','x','y','z'])

	'''list with average occurence of the letters (from book alice)'''
	dmean =[]
	for c in df.columns:
		dmean.append(df[c].mean())
	time = 1

	''' dfreq for alice-train'''
	freq = [3.0, 19.0, 11.0, 5.0, 2.0, 13.0, 10.0, 4.0, 4.0, 262.0, 23.0, 6.0, 12.0, 4.0, 3.0, 18.0, 123.0, 5.0,
	  4.0, 3.0, 8.0, 33.0, 10.0, 193.0, 12.0, 353.0]
	
	'''creating data frame to predicit occurence of each letter'''
	# maybe index problems since it starts with time step 1 not 0
	dfreq.loc[len(dfreq)] = freq
	for i in range(354):
		dprod.loc[len(dprod)] = 0

		for l in dfreq.columns:
			for c in dprod.columns:
				for v in dfreq[l].values:
					if l == c and i % v == 0:
						dprod[c][i] += 1
	dprod.drop(dprod.index[0], inplace=True)
	return dprod

#TODO: implement optimization

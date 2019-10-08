# R

The most important question - why learn R when you already know Python? These are some reasons that I could think of. But still I would use Python everywhere, because it is better to be an expert in one language.



### Ease of version control

This is what one cell look like on Jupyter notebook
```
  {
   "cell_type": "code",
   "execution_count": 6,
   "metadata": {},
   "outputs": [],
   "source": [
    "nrr = np.array(df[\"count\"]).reshape(26,38,4060, order=\"F\")\n",
    "nrr = np.swapaxes(nrr, 0, 1)[::-1,:,:]"
   ]
  },
```

This is what one cell look like on R notebook

```
For example, does the winner of the Best Picture have more nomination in Oscar categories as compared to the losing nominees?

​```{r}
tapply(oscars$Nom[oscars$PP==1],
       oscars$Ch[oscars$PP==1],
       mean)
​```
In the data set, the winning movies on average have 9.526 nominations compared to the 6.78 for losing nominees.
```



### Concise instructions

To obtain a column from pandas dataframe in Python
```
df_streetmap["counts"]
```

To obtain a column from a dataframe in R
```
streetmap$counts
```



### Comprehensive analysis

This is the result a T-test for the means of two independent equal-variance samples of scores on Python with `stats.ttest_ind(y1, y2, equal_var = False)`

```
(0.26833823296239279, 0.78849443369564776)
```

This is the result a T-test for the means of two independent equal-variance samples of scores on R with `t.test(y1,y2, var.equal = TRUE)`

```
	Two Sample t-test

data:  y1 and y2
t = 8.1095, df = 283, p-value = 1.553e-14
alternative hypothesis: true difference in means is not equal to 0
95 percent confidence interval:
 2.079185 3.412043
sample estimates
mean of x mean of y 
 9.526316  6.780702 
```






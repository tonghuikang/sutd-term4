# R cheatsheet

(Please refer to DBA on the reasons to use R)

This is a one-document reference of the use of R commands.

## Basics

Please refer to [R-basics](./R-basics.pdf) for the very basic operations on R.

**Matrices**
The matrix operations may require some explanation.
- definition `x<-matrix(c(3,-1,2,-1),nrow=2, ncol=2)`
- e-wise multiplication `x*x`, `x*2`
- matrix multiplication `x%*%x`
- transpose `t(x)`
- ??? `solve(x)`

## Pre-flight checklist
Make sure you can import these libraries. If you cannot, please panic.

```r
library(ggplot2)
library(leaps)
```

## Data management basics

Obtained from R-basics.

**Data preliminary analysis**
```r
poll <- read.csv("AnonymityPoll.csv")
summary(poll)  # 7-figure summary of every line
str(poll)  # see some data

table(poll$Smartphone)  # freqency in a column
summary(poll$Smartphone)  # 7-figure summary of a column

# freqency matrix of two columns
table(poll$Internet.Use, poll$Smartphone)

# find the mean of the first value depending on second
tapply(limited$Info.On.Internet, 
       limited$Smartphone, 
       mean)

# count number of NA in a column
sum(is.na(poll$Internet.Use))
```

**Data manipulation**
```r
# remove rows with any (?) NA variables
hitters = na.omit(hitters)


# obtain a subset
limited <- subset(poll, poll$Internet.Use == 1)

# obtain a subset with 'or' logic operator
limited <- subset(poll, poll$Internet.Use == 1|
                        poll$Smartphone == 1)
```

**Data plotting**
```r
# plot a histogram
hist(limited$Age)

# scatter plot
plot(limited$Age, limited$Info.On.Internet)

# scatter plot with jitter
plot(jitter(limited$Age),
     jitter(limited$Info.On.Internet))

# star plot
stars(swiss, key.loc = c(18,2))

# star scatter plot
stars(as.matrix(swiss[,c(2,3,5,6)]), 
      location = as.matrix(swiss[,c(4,1)]), 
      axes = T)
```


**Plotting with ggplot**
```
library(ggplot2)

# plot histogram
ggplot(data = Parole, aes(x = Age)) + 
  geom_histogram()
  
# plot histogram with specified bin width and start point
# closed refer to whether the interval is closed
ggplot(data = Parole, aes(x = Age)) +
  geom_histogram(binwidth=5,
                 closed=c("left"),
                 center=17.5)
```
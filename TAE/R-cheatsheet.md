# R cheatsheet

(Please refer to DBA on the reasons to use R)

This is a one-document reference of the use of R commands.

## Pre-flight checklist
Make sure you can import these libraries in R notebook. 

```r
library("ggplot2")
library("psych")
library("ggfortify")
library("leaps")
library("caTools")
library("mlogit")
library("zoo")
library("conflicted")
```

If you cannot, please panic.

## Helper functions

To understand a function, use `?` to read the offline documentation.
To understand an object, use `attributes(x)` to see the attributes.

**For MacOS**
Refer to the the 'Run' option on the top right of this window to see the shortcut related to running and restarting the cell.

- Run line `Cmd + Enter`
- Run chunk `Shift + Cmd + Enter`
- Run all `Opt + Cmd + R`
- New R Cell `Cmd + Opt + I`


## Basics

Please refer to [R-basics](./R-basics.pdf) for the very basic operations on R. 

These are some commands not covered in the document
```r
sum(arr)
prod(arr)
exp(arr)
var(arr)
sd(arr)
summary(arr)
pmax(arr,arz)  # take maximum element-wise
arr > 1  # element-wise logical check
```

**Type casting**
```r
z <- c(0:9)
class(z)  # prints class
as.numeric(z)  # casts into float?

z1 <- c("a","b","d")
w <- as.character(z1)
as.integer(w)  # returns array of NA
```

**Matrices**
The matrix operations may require some explanation.
- definition `x<-matrix(c(3,-1,2,-1),nrow=2, ncol=2)`
- e-wise multiplication `x*x`, `x*2`
- matrix multiplication `x%*%x`
- transpose `t(x)`
- read element `r[2,2]`, `r[3]`, starts counting from one
- inverse of a matrix (?) `solve(x)`
- solving system of linear equations `a%*%solve(a)`
- get eigenvectors `eigen(a)$vectors`

**Dataframe**
You are unlikely to do this, you are likely to load csv files.
```r
CELG <- data.frame(names=c("barack","serena"),
                   ages=c(58,38),
                   children=c(2,1))
# append to dataframe
CELG$spouse <- c("michelle","alexis")
```

**Miscellaneous**

```r
# date configuration
base::as.Date(32768, origin = "1900-01-01")

# to remove intercept, fit to -1
MPP2 <- mlogit(Ch~Nom+Dir+GG+PGA-1, data=D1)
```



## Data management basics

Obtained from R-basics.

**Data preliminary analysis**
```r
poll <- read.csv("AnonymityPoll.csv")
summary(poll)  # 7-figure summary of every column
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

# train-test split, stratified
split <- sample.split(framing1$TENCHD,SplitRatio=0.65)
training <- subset(framing1,split==TRUE)
test <- subset(framing1,split==FALSE)
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
```r
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
                 
# bar plot
bar <- ggplot(WHO) + 
  geom_bar(mapping = aes(x = Region, fill = Region), 
           show.legend = FALSE, width = 1) + 
  theme(aspect.ratio = 1) + 
  labs(x = NULL, y = NULL)
bar  # to show plot

# plot with flipped coordinates, and polar plot
bar + coord_flip()
bar + coord_polar()

# many scatter plot
a <- ggplot(WHO, aes(x=GNI, y=FertilityRate))
a + geom_point(na.rm=T) + facet_wrap(.~Region)

# loess interpolation with confidence
a + geom_point(na.rm=T) + geom_smooth(na.rm=T)

# loess interpolation, continent represented with color
acol <- ggplot(WHO,
               aes(x=GNI, 
                   y=FertilityRate, 
                   color=Region))
acol + geom_point(na.rm=T)
acol + geom_point(na.rm=T) + geom_smooth(na.rm=T)

# scatter plot with attributed represented with size
ggplot(mtcars,aes(x=wt, 
                  y=mpg, 
                  color=cyl, 
                  cex=disp))

# plot scatterplot matrix
ggplot(wine, aes(VINT,LPRICE)) + 
  pairs.panels(wine, 
               ellipses=F, 
               lm =T, 
               breaks=10, 
               hist.col="blue")


# scatterplot with hvlines demarcating means
br<-mean(winetrain$LPRICE)
ggplot(winetrain,
       aes(DEGREES,
           HRAIN,
           color=cut(LPRICE,c(-Inf,-1.42,Inf)))) + 
  geom_point(na.rm=T) + 
  scale_color_discrete(name = "LPRICE",
                       labels = c("< mean(LPRICE)",
                                  "> mean(LPRICE)")) +
  geom_vline(xintercept=mean(winetrain$DEGREES),
             color="blue",lwd=1) +
  geom_hline(yintercept=mean(winetrain$HRAIN),
             color="blue",lwd=1)

# scatterplot with jitter
ggplot(orings[orings$Field>=0,],aes(Temp,Field)) + 
  geom_point(na.rm=T) +
  geom_jitter(na.rm=T,width=1,height=0.1) 
```

**Statisitical testing**
```r
t.test(oscars$Nom[oscars$PP==1 & oscars$Ch==1],
       oscars$Nom[oscars$PP==1 & oscars$Ch==0],
       alternative = c("greater"))
```
# Linear regression

**Week 2**

| Method         | Linear Regression                                            |
| -------------- | ------------------------------------------------------------ |
| Target         | Number                                                       |
| Model          | $$y_i = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + ... + \epsilon_i $$ |
| Loss           | Mean square error                                            |
| Quality of fit | R-square<br />Adjusted R-square<br />AIC                     |
| Prediction     | Wine prices and quality<br />Baseball batting average        |
| Comments       | Choose only the statistically significant variables<br />This cannot predict binary objectives. |

```r
# fitting linear model
model1  <- lm(LPRICE~VINT+HRAIN,
              data=winetrain)
summary(model1)
confint(model7, level=0.99)  # see confidence interval

# predicting values with model
pred <- predict(model1,
                newdata=winetest,
                type="response")  # not sure if correct
```



**Week 3**

| Method         | Logistic Regression                                          |
| -------------- | ------------------------------------------------------------ |
| Target         | Binary, probability                                          |
| Model          | $$P(y_i = 1) = \dfrac{1}{1+e^{-(\beta_0 + \beta_1 x_1 + \beta_2 x_2 + ...+ \epsilon_i )}}$$ |
| Loss           | $$LL(\beta) \\ = \displaystyle \sum_{i=1}^n \sum_{k=1}^2 y_{ik} \log \left( P(y_{ik} = 1) \right)\\= \displaystyle \sum_{i=1}^n \sum_{k=1}^2 y_{ik} \log \left( \frac{e^{\beta' x_i}} {e^{1+\beta' x_i}} \right) $$ |
| Explanation    | x log x', sum for x=1 and x=0 (elaborate)                    |
| Quality of fit | $$AIC = -2LL(\hat{\beta}) + 2(p+1)$$<br />Confusion matrix<br />AUC-ROC |
| Prediction     | Space shuttle failures<br />Risk of heart disease            |
| Comment        |                                                              |

```r
# fitting logisitic model (family = binomial)
model3 <- glm(Field~Temp+Pres,
              data=orings,
              family=binomial)
summary(model3)

# predicting probabilities with model
Pred <- predict(model4,
                newdata=orings,
                type="response")

library(ROCR)
# ROCR method to obtain predicted probs and actual labels
ROCRpred <- prediction(Pred[1:138],orings$Field[1:138])
# ROCR method to plot ROC curve
ROCRperf <- performance(ROCRpred,x.measure="fpr",measure="tpr")
plot(ROCRperf)  # simple plot
plot(ROCRperf,
     colorize=T,
     print.cutoffs.at=c(0,0.1,0.2,0.3,0.5,1),
     text.adj=c(-0.2,1.7))

# Calculate area under curve (AUC)
as.numeric(performance(ROCRpred,measure="auc")@y.values)
```



**Week 4a**

| Method         | Multinomial Logit                                            |
| -------------- | ------------------------------------------------------------ |
| Target         | n-choose-1, probabilities that sum to one                    |
| Model          | $$P(y_{ik} = 1 | \{ \text{options} \}) = \dfrac{e^{\beta' x_{ik}}} {\sum_{l=1}^k e^{\beta' x_{il}}}$$ |
| Loss           | $$LL(\beta) \\ = \displaystyle \sum_{i=1}^n \sum_{k=1}^K z_{ik} \log(P(y_{ik} = 1)) \\ = \displaystyle \sum_{i=1}^n \sum_{k=1}^K z_{ik} \log \dfrac{e^{\beta' x_{ik}}} {\sum_{l=1}^k e^{\beta' x_{il}}}$$ |
| Explanation    | $z_{ik}$ is the training option from the dataset which is binary.<br />$x_{ik}$ is the characteristic of one training option considered. ($x_{il}$ is similar, but it includes the rest of the training option included in the choice).<br />You are tasked to provide $\beta'$ that maximises the log-likelihood.<br />The probability that option $k$ is chosen from a set of choices is $P(y_{ik} = 1)$, and this is a real number. |
| Quality of fit | Log-likelihood<br />Confusion matrix<br />Likelihood ratio index $$=1-\frac{LL(\beta)}{LL(0)}$$<br />AIC $=-2LL(\beta) + 2p$ |
| Prediction     | Academy Award winners                                        |
| Comment        | **Independence of Irrelevant Alternatives** - adding in a third alternative does not change the ratio of probabilities of two existing choxwices. (Probably it still does affect the training process?) |

```r
# (on data with the multiple choices over different rows)
library("mlogit")
# extracting data
D1 <- mlogit.data(subset(oscarsPP, Year <=2006), 
                  choice="Ch", 
                  shape="long", 
                  alt.var = "Mode")

# fitting multinomial logistic model
MPP2 <- mlogit(Ch~Nom+Dir+GG+PGA-1, data=D1)

# predicting probabilities with model
D1_new <- mlogit.data(subset(oscarsPP, Year==2007), 
                      choice="Ch", 
                      shape="long", 
                      alt.var="Mode")
Predict2 <- predict(MPP2, newdata=D1_new)
```

```r
# (on data with the multiple choices on one row)
library(mlogit)
# extracting data
S <- mlogit.data(subset(safety, Task<=12), 
                 shape="wide",  
                 # this is "wide"-form data, unlike Oscars
                 choice="Choice", 
                 varying=c(4:83), 
                 sep="", 
                 alt.levels=c("Ch1", "Ch2", "Ch3", "Ch4"),
                 id.var="Case")

# fitting multinomial logistic model
M <- mlogit(Choice~CC+GN+NS+BU+FA+LD+
            BZ+FC+FP+RP+PP+KA+SC+TS+NV+
            MA+LB+AF+HU+Price-1, 
            data=S)

# predicting probabilities with model 
# this is done on training data
# for test data, create a new mlogit.data with Task>12
P <- predict(M, newdata=S)

# constructing confusion matrix with predictions
ActualChoice <- subset(safety, Task<=12)[,"Choice"]
PredictedChoice <- apply(P,1,which.max)
Tabtrain=table(PredictedChoice, ActualChoice)
Tabtrain
```

The willingness to pay can be observed from the survey, even though we do not directly ask the customers' valuation. When the model is fitted, the price has a negative coefficient while the safety features usually have a positive coefficient. The ratio of the coefficients is the price that customers on the average is willing the pay. The deviation can be observed the from standard error.



**Week 4b**

| Method         | Mixed Logit                                                  |
| -------------- | ------------------------------------------------------------ |
| Target         | n-choose-1, probabilities that sum to one                    |
| Model          | $$P(y_{ik} = 1 | \{ \text{options} \}) = ???$$               |
| Loss           | `???`                                                        |
| Quality of fit | Log-likelihood<br />Confusion matrix<br />Likelihood ratio index $$=1-\frac{LL(\beta)}{LL(0)}$$<br />AIC $=-2LL(\beta) + 2p$ (number of paramters is now double) |
| Prediction     | Preference of safety features                                |
| Comment        | The data structure of the Academy Award is different from the safety feature options. (elaborate)<br />You can also evaluate how much people will pay for a certain extra feature, without directly getting their evaluation. (explore) |

![Screen Shot 2019-10-14 at 03.23.48 AM](assets/Screen Shot 2019-10-14 at 03.23.48 AM.png)

```r
#(please prepare S, the mlogit.data)

# fitting mixed logistic model
M1 <- mlogit(Choice~CC+GN+NS+BU+FA+LD+
             BZ+FC+FP+RP+PP+KA+SC+TS+NV+
             MA+LB+AF+HU+Price-1, 
             data=S,
             rpar=c(CC='n',GN='n',NS='n',BU='n',FA='n',
                    LD='n',BZ='n',FC='n',FP='n',RP='n',
                    PP='n',KA='n',SC='n',TS='n',NV='n',
                    MA='n',LB='n',AF='n',HU='n',Price='n'),
             panel = TRUE, 
             print.level=TRUE)
summary(M1)

# predicting probabilities with model (with training data)
P1 <- predict(M1, newdata=S)

# constructing confusion matrix with predictions
PredictedChoice1 <- apply(P1, 1, which.max)
ActualChoice <- subset(safety, Task<=12)[,"Choice"]
Tabtrainmixed = table(PredictedChoice1, ActualChoice)
Tabtrainmixed
```

"The mixed logit model does a better job of predicting customers who are not interested in choosing any of the offered options compared to MNL."




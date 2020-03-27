<div style="page-break-after: always;"></div> 
# Predictive Models I

[TOC]

You will train a predictive model on training data, use the model to generate predictions on the test data (and check for accuracy if possible).

These model should have already been tested in the midterms and will not be tested in the finals.

## Linear regression

**Week 2**

| Method         | Linear Regression                                            |
| -------------- | ------------------------------------------------------------ |
| Target         | Number                                                       |
| Model          | $$y_i = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + ... + \epsilon_i $$ |
| Loss           | Mean square error                                            |
| Quality of fit | R-square<br />Adjusted R-square<br />AIC                     |
| Examples       | Wine prices and quality<br />Baseball batting average        |
| Comments       | Choose only the statistically significant variables<br />This cannot predict binary objectives./ |

```R
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

<div style="page-break-after: always;"></div> 
## Logistic Regression

**Week 3**

| Method         | Logistic Regression                                          |
| -------------- | ------------------------------------------------------------ |
| Target         | Binary                                                       |
| Model          | $$P(y_i = 1) = \dfrac{1}{1+e^{-(\beta_0 + \beta_1 x_1 + \beta_2 x_2 + ...+ \epsilon_i )}}$$ |
| Loss           | $$LL(\beta) \\ = \displaystyle \sum_{i=1}^n \sum_{k=1}^2 y_{ik} \log \left( P(y_{ik} = 1) \right)\\= \displaystyle \sum_{i=1}^n \sum_{k=1}^2 y_{ik} \log \left( \dfrac{e^{\beta' x_{ik}}} {\sum_{l=1}^k e^{\beta' x_{il}}} \right) $$ |
| Explanation    | $x \log (x')$, sum over $x=1$ and $x=0$ (elaborate)          |
| Quality of fit | $$AIC = -2LL(\hat{\beta}) + 2(p+1)$$<br />Confusion matrix<br />AUC-ROC |
| Examples       | Space shuttle failures<br />Risk of heart disease            |
| Comment        |                                                              |

```R
# fitting logisitic model (family = binomial)
model3 <- glm(Field~Temp+Pres,
              data=orings,
              family=binomial)
summary(model3)

# predicting probabilities with model
Pred <- predict(model4,
                newdata=orings,
                type="response")
```

<div style="page-break-after: always;"></div>
## Multinomial Logit

**Week 4a**

| Method         | Multinomial Logit                                            |
| -------------- | ------------------------------------------------------------ |
| Target         | n-choose-1                                                   |
| Model          | $$P(y_{ik} = 1 | \{ \text{options} \}) = \dfrac{e^{\beta' x_{ik}}} {\sum_{l=1}^k e^{\beta' x_{il}}}$$ |
| Loss           | $$LL(\beta) \\ = \displaystyle \sum_{i=1}^n \sum_{k=1}^K z_{ik} \log(P(y_{ik} = 1)) \\ = \displaystyle \sum_{i=1}^n \sum_{k=1}^K z_{ik} \log \dfrac{e^{\beta' x_{ik}}} {\sum_{l=1}^k e^{\beta' x_{il}}}$$ |
| Explanation    | $z_{ik}$ is the training option from the dataset which is binary.<br />$x_{ik}$ is the characteristic of one training option considered. ($x_{il}$ is similar, but it includes the rest of the training option included in the choice).<br />You are tasked to provide $\beta'$ that maximises the log-likelihood.<br />The probability that option $k$ is chosen from a set of choices is $P(y_{ik} = 1)$, and this is a real number. |
| Quality of fit | Log-likelihood<br />Confusion matrix<br />Likelihood ratio index $$=1-\frac{LL(\beta)}{LL(0)}$$<br />AIC $=-2LL(\beta) + 2p$ |
| Examples       | Academy Award winners                                        |
| Comment        | **Independence of Irrelevant Alternatives** - adding in a third alternative does not change the ratio of probabilities of two existing choxwices. (Probably it still does affect the training process?) |

<div style="page-break-after: always;"></div>
```R
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

<div style="page-break-after: always;"></div>
```R
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

The willingness to pay can be observed from the survey, even though we do not directly ask the customers' valuation. 

- When the model is fitted, the price has a negative coefficient while the safety features usually have a positive coefficient. 
- The ratio of the coefficients is the price that customers on the average is willing the pay. 
- The deviation can be observed the from standard error.

<div style="page-break-after: always;"></div>
## Mixed Logit

**Week 4b**

| Method         | Mixed Logit                                                  |
| -------------- | ------------------------------------------------------------ |
| Target         | n-choose-1                                                   |
| Model          | $$P(y_{ik} = 1 | \{ \text{options} \}) = ???$$               |
| Loss           | `???`                                                        |
| Quality of fit | Log-likelihood<br />Confusion matrix<br />Likelihood ratio index $$=1-\frac{LL(\beta)}{LL(0)}$$<br />AIC $=-2LL(\beta) + 2p$ (number of paramters is now double) |
| Prediction     | Preference of safety features                                |
| Comment        | The data structure of safety feature options is different from the Academy Award. (elaborate)<br />You can also evaluate how much people will pay for a certain extra feature, without directly getting their evaluation. (explore) |

![Screen Shot 2019-10-14 at 03.23.48 AM](assets/Screen Shot 2019-10-14 at 03.23.48 AM.png)

<div style="page-break-after: always;"></div>
```R
#(please prepare S, the mlogit.data as per 4a second part)

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

<div style="page-break-after: always;"></div>
## Regsubset

**Week 5a**

| Method         | Linear Regression with Subset Selection                      |
| -------------- | ------------------------------------------------------------ |
| Target         | Number                                                       |
| Model          | $$y_i = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + ... + \epsilon_i $$ |
| Loss           | Mean square error                                            |
| Quality of fit | R-square<br />Adjusted R-square<br />AIC                     |
| Examples       | Wine prices and quality<br />Baseball batting average        |
| Comments       | Choose only the statistically significant variables<br />This cannot predict binary objectives. |

Feature selection, based on the adjusted R-value from linear regression.

```R
# fitting linear model, exhaustive feature selection
model2 <- regsubsets(Salary~.,
                     hitters,
                     nvmax=19)

# fitting linear model, exhaustive feature selection
model3 <- regsubsets(Salary~.,
                     data=hitters,
                     nvmax=19,
                     method="forward")

# fitting linear model, exhaustive feature selection
model4 <- regsubsets(Salary~.,
                     data=hitters,
                     nvmax=19,
                     method="backward")

# getting the coefficient of the best model with n params 
which.max(summary(model3)$adjr2)
coef(model3,3)

# heat map showing the best-n selected variables
plot(model1,scale=c("adjr2"))
```

<div style="page-break-after: always;"></div>
## LASSO

**Week 5b**

Balance data fit (first term) with model complexity (second term)
$$
\underset{\beta}{min} 
  \sum_{i=1}^{n} (y_i - \beta_0 - \beta_1 x_{î} - ... - 
                  \beta_p + x_{ip})^2 +
                  \lambda \sum_{j=1}^p |\beta_j|
$$
The objective coefficient in LASSO is convex and tries to roughly promote sparsity.

Advantage of LASSO is that since it is convex, the local optimum is the global optimum.

Unfortunately, objective function is not differentiable unlike standard linear regression. But there are efficient ways to solve the problem to optimality.


Following is ridge regression. The issue with ridge regression is that it does not promote sparsity (i.e. reduce the number of variables in the model).

$$
\underset{\beta}{min} 
  \sum_{i=1}^{n} (y_i - \beta_0 - \beta_1 x_{î} - ... - 
                  \beta_p + x_{ip})^2 +
                  \lambda \sum_{j=1}^p \beta_j^2
$$

Elastic Net combines both penalities.

| Method         | LASSO                                                        |
| -------------- | ------------------------------------------------------------ |
| Target         | Number                                                       |
| Model          | $$y_i = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + ... + \epsilon_i $$ |
| Loss           | $$ \underset{\beta}{min} \sum_{i=1}^{n} (y_i - \beta_0 - \beta_1 x_{î} - ... - \beta_p + x_{ip})^2 + \lambda \sum_{j=1}^p$$ |
| Quality of fit | According to loss                                            |
| Prediction     | Hitters                                                      |
| Comments       | Choose only the statistically significant variables<br />This cannot predict binary objectives. |

<div style="page-break-after: always;"></div>
```R
# loading the dataset
library(glmnet)
X <- model.matrix(Salary~.,hitters)
y <- hitters$Salary

# train-test split
train <- sample(1:nrow(X),nrow(X)/2)
test <- -train

# fitting the lasso model with a specified schedule
modellasso <- glmnet(X[train,],y[train],lambda=grid)

# fitting the lasso model with a automatic grid
modellasso <- glmnet(X[train,],y[train],lambda=grid)

# show the plot of model lasso (please interpret)
# shows the value of the coefficient against L1 norm
plot(modellasso)           # plot against L1 Norm
plot(model4,xvar="lambda") # plot against lambda
model4$beta !=0            # plot with characters

# prediction (what is the difference?)
predictlasso1 <- predict(modellasso,
                         newx=X[test,],
                         s=100) 
predictlasso1a <- predict(modellasso,
                          newx=X[test,],
                          s=100,
                          exact=T,
                          x=X[train,],
                          y=y[train])

# calculation of mean square error
mean((predictlasso1-y[test])^2)

# does k-fold cross-validation for glmnet, 
# produces a plot
# returns a value for lambda
cvlasso <- cv.glmnet(X[train,],y[train])
```
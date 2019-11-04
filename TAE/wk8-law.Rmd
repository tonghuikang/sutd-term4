
# Script for Week 8 -- session 1 (in-class activity)


######## Set the working environemnt

# Remove all variables from the R environment to create a fresh start
rm(list=ls())

# Set the working folder
# getwd()
# setwd("...")


######## Data Preparation

# Load the data on the supreme court
supreme <- read.csv("supreme.csv") # We have 623 observations and 20 variables
head(supreme) # First part of the dataframe
# str(supreme) # Internal structure of the dataframe 
# summary(supreme) # Summary of the data

# A few comments on the data:
# docket: case number
# term: year the case was discussed
# party_1 and party_2: parties involved in the case
# rehndir stevdir ocondir scaldir kendir soutdir thomdir gindir brydir: direction of the judgement of the 9 judges
# (i.e., Rehquist, Stevens, O'Connor, Scalia, Kennedy, Souter, Thomor, Ginsburg, Breyen). 0 means liberal, 1 conservative. 
# 9 indicates that the vote is not available for the case.
# petit: petitioner type
# respon: respondant type
# circuit: circuit of origin
# uncost: binary number indicating if the petitioner argued constitutionality of a law or practice
# lctdir: lower court direction of results (liberal or conservative)
# issue: area of issue
# result: 0 means liberal, 1 conservative.

# Let's now focus on a specific judge, say Stevens (we remove data with no entry from Stevens--Stevens was present)
stevens <- subset(supreme[,c("docket","term","stevdir","petit","respon","circuit","unconst","lctdir","issue","result")],supreme$stevdir!=9)

# Processing the output result to affirm or reverse for judge Stevens
stevens$rev <- as.integer((stevens$lctdir=="conser" & stevens$stevdir==0) | (stevens$lctdir=="liberal" & stevens$stevdir==1))
# This creates a new variable ($rev) in the dataframe that takes a value of 1 if Stevens decision reverses the lower court decision
# and 0 if the judge affirms the lower court decision. Note that a similar analysis can be done for the other judges or for the overall case result.
table(stevens$rev)


######## Modelling exercise: logistic regression

# Let's prepare the data for our modelling exercise
# Load the caTools package (basic utility functions)
if(!require(caTools)){
  install.packages("caTools")
  library(caTools)
}
# Set the seed
set.seed(1)
# Create train and test sets (with balanced response from the judge Stevens)
spl <- sample.split(stevens$rev,SplitRatio=0.7) # We use 70% of the data for training
train <- subset(stevens,spl==TRUE); # table(train$rev)
test <- subset(stevens,spl==FALSE); # table(test$rev)
# There is only one realization of the IR value (Interstate Relations), which does not
# appear in the training dataset. Let's thus modify the test dataset as follows:
test <- subset(test,test$issue!="IR")

# Logistic regression
# We predict judge Stevens' decision 
m1 <- ...
summary(m1)
# let's now try to make a prediction on the test data
p1 <- ...

# How does the model perform?
table(p1>=0.5,test$rev)
# Confusion matrix
#        0  1
# FALSE ...
# TRUE  ...
# The accuracy is about ... 

# Area Under the Curve
if(!require(ROCR)){
  install.packages("ROCR")
  library(ROCR)
}
pred <- ...
perf <- ...
plot(perf) 
performance(pred,measure="auc")


######## Classification And Regression Trees (CARTs)

# rpart is for CART
if(!require(rpart)){
  install.packages("rpart")
  library(rpart)
}
# rpart.plot extend some functionalities of rpart
if(!require(rpart.plot)){
  install.packages("rpart.plot")
  library(rpart.plot)
}

# # This will not work, because rpart will build a regression tree by default
# cart1 <- rpart(rev~petit+respon+circuit+lctdir+issue+unconst,data=train)
# summary(cart1)
 


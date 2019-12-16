
rm(list=ls())

DTM_SPARSITY <- 0.99985

ACTIVATE_CHAR_STRING <- TRUE
CHAR_STRING <- "\"!#$%&',./|~(){}[]*?+-:;<=>^_`"
# CHAR_STRING <- "\"!#$%&',./0123456789:;<=>@ABCDEFGHIJKLMNOPQRSTUVWXYZ^_`abcdefghijklmnopqrstuvwxyz|~(){}[]*?+-"

ACTIVATE_PHARSE_LIST <- TRUE
PHARSE_LIST <- c(
     "{link}", ":)","&lt;3", "@mention", ":D", ":("
)

# random forest
RF_NODESIZE <- 1
RF_NTREE    <- 500

library(tictoc) # to measure time taken to execute

train <- read.csv("train.csv")
test <- read.csv("test.csv")
train <- train[sample(nrow(train)),]  # shuffle training set for good measure

library(plyr)
combined <- rbind.fill(train, test)
combined[22495:22505,]

combined[sample(nrow(combined), 20),]

library(stringr)

if (!ACTIVATE_CHAR_STRING){CHAR_STRING <- "!"}
charString_split <- strsplit(CHAR_STRING, "")[[1]]

for (i in 1:length(charString_split)) {
    combined$placeholder_name <- str_count(combined$tweet, fixed(charString_split[[i]]))
    names(combined)[names(combined) == "placeholder_name"] <- paste("char_", i, sep="")
}

if (!ACTIVATE_PHARSE_LIST){PHARSE_LIST <- c("@mention", "{link}")}

for (i in 1:length(PHARSE_LIST)) {
    combined$placeholder_name <- str_count(combined$tweet, fixed(PHARSE_LIST[[i]]))
    names(combined)[names(combined) == "placeholder_name"] <- paste("phrase_", i, sep="")
}

combined$alphacount  <- as.numeric(ldply(str_match_all(combined$tweet,"[A-Za-z]"),length)$V1)
combined$uppercount  <- as.numeric(ldply(str_match_all(combined$tweet,"[A-Z]"),length)$V1)
combined$lowercount  <- as.numeric(ldply(str_match_all(combined$tweet,"[a-z]"),length)$V1)
combined$numbercount <- as.numeric(ldply(str_match_all(combined$tweet,"[0-9]"),length)$V1)
combined$propercount <- as.numeric(ldply(str_match_all(combined$tweet," [A-Z]"),length)$V1)
combined$length      <- as.numeric(ldply(str_match_all(combined$tweet,"(.*?)"),length)$V1)

combined$aftercaps   <- combined$uppercount - combined$propercount
combined$updowndiff  <- combined$uppercount - combined$lowercount

combined$alpharatio  <- combined$alphacount/combined$length
combined$numsratio   <- combined$numbercount/combined$length
combined$capsratio   <- combined$uppercount/combined$alphacount
combined$aftcp_ratio <- combined$aftercaps/combined$length

library(rebus.base)
vowels <- char_class("aeiouAEIOU")
not_vowels <- negated_char_class("aeiouAEIOU")
combined$repeatvowels <-as.numeric(ldply(str_match_all(combined$tweet,pattern= one_or_more(vowels)),length)$V1)
combined$repeatnonvowels <-as.numeric(ldply(str_match_all(combined$tweet,pattern= one_or_more(not_vowels)),length)$V1)

combined <- within(combined, rm(alphacount, uppercount, lowercount, 
                                numbercount, propercount, aftercaps))

combined[sample(nrow(combined), 5),]

library(tm)
corpus <- Corpus(VectorSource(combined$tweet))
getTransformations()

tic()
corpus <- tm_map(corpus, function(x) iconv(enc2utf8(x), sub = "byte"))
corpus <- tm_map(corpus, content_transformer(function(x) iconv(enc2utf8(x), sub = "bytes")))
corpus <- tm_map(corpus,content_transformer(tolower))
corpus <- tm_map(corpus,removeWords,stopwords("english"))
corpus <- tm_map(corpus,removeWords,c("xkcd, make, get, well, goodbye"))
corpus <- tm_map(corpus,removePunctuation)
toc()

library(SnowballC)
corpus <- tm_map(corpus,stemDocument)

dtm <- DocumentTermMatrix(corpus)

dtm <- removeSparseTerms(dtm, DTM_SPARSITY)
sparse <- as.data.frame(as.matrix(dtm))
colnames(sparse) <- make.names(colnames(sparse))

library(dplyr)
combined_features <- within(combined, rm(tweet, Id))
sparse <- bind_cols(combined_features, sparse)

# write.csv(sparse, "the_dataset.csv", row.names=FALSE)
# sparse[1:10,]

tic()
library(randomForest)
model <- randomForest(as.factor(sentiment)~.,data=sparse[1:22500,], 
                      ntree=RF_NTREE, nodesize=RF_NODESIZE)
summary(model)
toc()

model$confusion
training_accuracy = sum(diag(model$confusion))/length(trn_idx)
training_accuracy

varImpPlot(model)

pred_test <- predict(model,newdata=sparse[22501:30000,],type="prob")
pred_test_matrix <- pred_test

pred_test_class <- c()

for (i in 1:nrow(pred_test_matrix)){
    class_with_max_prob <- names(pred_test_matrix[i,][pred_test_matrix[i,] == max(pred_test_matrix[i,])])[[1]]
    pred_test_class <- append(pred_test_class, class_with_max_prob)
    if (length(pred_test_class) != i){print(i)}
}

test$sentiment <- pred_test_class
test[sample(nrow(test), 20), ]

test <- subset(test, select=c("Id", "sentiment"))
write.csv(test, "submission.csv", row.names=FALSE)

table(test$sentiment)



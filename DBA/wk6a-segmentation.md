# Data Segmentation

- Need to summarize data to understand it 
- Percentages, Pareto sorts, and A-B-C classifications are useful with nominal categorical data (+bar charts and pie charts) 
- Mean and standard deviations are useful to summarize continuous data 
  - You can expect to find most of the observations lying within 2 standard deviations of the mean
  - 95% confidence interval, based on normal distribution, is 1.96 standard deviations above and below the mean 
- Five number summaries can also be used (box and whisker plots) 
- Try a log transformation if the data has a long tail 
- Bivariate relationships are summarized by the correlation coefficient



Motivation: Too many subjects in your data (i.e. customers, products) 

ABC analysis: a method of analysis that divides the subject up into three categories: A, B and C. 
- A: The top categories which together account for 80% of the data 
- B: The next 15% 
- C: The bottom 5% (there can be a lot of these) 
- Example: A-products are your fastest selling, C-products move the slowest.



**Correlation**

Pearson’s Correlation Coefficient 
$$
r = \frac{
\sum_{i=1}^n (x_i-\bar{x})(y_i-\bar{y})
}{
\sqrt{\sum_{i=1}^n (x_i-\bar{x})^2}
\sqrt{\sum_{i=1}^n (y_i-\bar{y})^2}
} \qquad
-1 \leq r \leq 1
$$

**Decision Tree**

Which tree to select - one that classifies at least one category perfectly.
```r
credit_data <- read.csv("wk6a-credit.csv")
plot(creditdata[,c(5,9:14)])  # scatterplot matrix
library(tree)
tree.credit = tree(Status~., data = credit_data)
plot(tree.credit); text(tree.credit, pretty=0);
```

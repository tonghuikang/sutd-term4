## Introduction

Data, Models, Decisions

Statistics, Optimisation, Simulation

Descriptive - What happened?
Predictive - What would happen?
Prescriptive - What should we do?

Interpretability of the model is sometimes important. Trade-off between interpretability and performance.

Precision and accuracy



**Example given**. Watson in Jeopardy

- Pipeline to answer the question. 
  - Processing of the question
  - Searching the database
  - Formulating an answer

- Strategy involved in the game
  - Whether to buzz in
  - How much to wager (depends on opponents' pool)



Initial comments on the course

- Feels a bit confused. Added too many things together.
  - NLP, Kaggle
  - R and Julia


## Installation of R packages

How to install R packages on MacOS with Xcode installed. Assume that you have R install, probably with `brew install R`

```bash
xcode-select --install
```

Do some magic https://github.com/frida/frida/issues/338

```bash
cd /Library/Developer/CommandLineTools/Packages/
open macOS_SDK_headers_for_macOS_10.14.pkg
```

Open the R code with root permissions

```bash
sudo R
```

(to confirm, do you need sudo R?)

Then on R console install the packages.

```R
install.packages("ggplot2")
install.packages("psych")
install.packages("ggfortify")
```





# Confusion matrices



$\enspace$  | Predict = 0 | Predict = 1 
--------------- | ------------------- | ------------------- 
**Actual = 1** | False Negative (FN) | True Positive (TP)  
**Actual = 0** | True Negative (TN)  | False Positive (FP) 


![confusion_on_logistic](assets/confusion_on_logistic.png)


 Name                  | Alt Name             | Formula                           
 --------------------- | -------------------- | --------------------------------- 
 False Positive Rate   | Specificity          | $\frac{FP}{FP+TN}$                
 True Negative Rate    | Type I error         | $\frac{TN}{FP+TN}$                
 True Positive Rate    | Sensitivity, Recall  | $\frac{TP}{TP+FN}$                
 False Negative Rate   | Type II error        | $\frac{FN}{TP+FN}$                
 Precision             |                      | $\frac{TP}{TP + FP}$              
 **Compiled measures** |                      |                                   
 Overall Accuracy      |                      | $\frac{TP+TN}{FP + FN + TP + TN}$ 
 F1 Score              |                      |                                   
 ROC Curve             | Plot TPR against FPR |                                   



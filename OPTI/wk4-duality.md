# Duality

A very important topic in Optimization is being able to tell thedistance from the optimum: if we have a feasible but not optimal solution of an LP, how does the value of this (suboptimal) solution compare to the optimum?



**Motivation**

- To obtain a value 90% of optimal you need 1 minute of computation time
- To obtain a value 99% of optimal you need 1 hour of computation time
- To obtain the optimal you need 1 day of computation, or never.



**Definitions**

Given an LP (expressed in the primal form), we can form another LP called the dual.

Primal LP

$$
\begin{align}
max \enspace c^T x& \\
Ax& \leqslant b \\
x& \geqslant 0
\end{align}
$$

Dual LP

$$
\begin{align}
min \enspace b^T y& \\
A^{T} y& \geqslant c \\
y& \geqslant 0
\end{align}
$$

By the way, the dual of the dual is the primal. (Does the primal need to have a maximising objective function?)



**Weak Duality Theorem**
Condition

- $\bar{x}$ is a feasible solution to the primal 
- $\bar{y}$ is a feasible solution to the dual

Result
- $c^{T} \bar{x} \leq b^{T} \bar{y}$.

**Proof**

![Screenshot 2019-10-07 at 12.48.11 PM](assets/Screenshot 2019-10-07 at 12.48.11 PM.png)

One of the intuitions - Suppose that $x^{*}$ is optrimal to the primal, then $x^{*}$ is feasible to the relaxiation.



**Rules for forming the dual of a general LP**
![image-20191007125220976](assets/image-20191007125220976.png)
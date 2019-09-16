# Introduction to Optimisation

### Optimisation Paradigm

1) **Decision Variables.** The elements under the control of the decision maker.

2) **A (single) objective function.** A function of the decision variables that we want to maximize or minimize, corresponding to a measure of performance.

3) **Constraints.** Restrictions that define which values of the decision variables are allowed.

4) **Paramters.** The data of the problem.

Example: Please review a 2D linear programming problem covered in freshmore classes. In this course we will learn how the linear programming problem is solved.




### Taxonomy of Optimization Problems

Grouping | Example
-|-
Number of objectives | **Single objective**, Multiple objectives 
Type of the objective function | **Linear**, Quadratic, Convex, Nonlinear 
Type of constraints | **Linear**, Quadratic, Convex, Nonlinear (Advanced: Conic, Semidefinite, Semi-infinite, etc.) 
Type of variables | **Continuous**, **Discrete (Integer)**, Mixed (Special case: **Network models**) 
Uncertainty in data | **Deterministic**, Stochastic, Robust, Parametric, Black-box/simulation 

In bold is the optimisation problems covered in the syallabus.



### Some definitions

The hyperplane splits another different hyperplane into half-space.


<details>
<summary>Definition</summary>
  <img src="assets/Screenshot 2019-09-16 at 11.43.50 AM.png" alt="img">
  <img src="assets/image-20190916114405507.png" alt="img">
</details>


Types of optimisation problem based on solution types

- Infeasible
- Feasible and bounded
- Feasible and unbounded

<details>
<summary>Definitions</summary>
  <img src="assets/Screenshot 2019-09-16 at 12.00.26 PM.png" alt="img">
  <img src="assets/image-20190916120727438.png" alt="img">
</details>



### Linear program

Please understand the canonical form, and how to transform a problem to this way.

$$
\begin{align*}
max \quad c^T &= x \\
s.t. \quad Ax &= b \\
x &\geq 0
\end{align*}
$$

- If the given problem is a minisation, please flip the coefficient of the objective function.
- (didn't understand, please revise)

<details>
<summary>Definition</summary>
  <img src="assets/Screenshot 2019-09-16 at 12.00.34 PM.png" alt="img">
</details>




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
- (TODO didn't understand, please revise, what is the canonical form)

<details>
<summary>Definition</summary>
  <img src="assets/Screenshot 2019-09-16 at 12.00.34 PM.png" alt="img">
</details>



### Nurse scheduling problem

Basic

- There is a require number of nurses for every day in a week.
- Each nurse works for five consecutive days with two rest days.

Minimise the number of nurses that needs to be employed, different versions of the problem
- Each day require a certain minimum number of nurses
- Each day require a certain minimum number of nurses, and wages for different schedules is different
- Each day require a certain minimum number of nurses, and constraint on how two adjacent schedule differ (you need to split the inequality into two)

Minimise overstaffing and understaffing

- Allows overstaffing and understaffing, with a quadratic penalty (greater for overstaffing) to be minimised - this program is no longer linear

On overstaffing and understaffing penalties. 
$$x_1 + x_4 + x_5 + x_6 + x_7 + d + e = 17$$ where $d$ and $e$ is deficit and excess. Do we need to write a constraint that either $d$ or $e$ is zero? Not actually, because as the objective function minimise the sum of squares of $d$ and $e$, we do not need such a constaint as the result will fulfil the constraint. Moreover, writing a constraint like $d \cdot e = 0$ makes the program complicated. You cannot use if-else in a linear program like what you do in Excel.



**Least squares - cannot be converted into a linear program.**

This includes the least squares best-fit line.



**Converting linear absolute residuals into a linear program.** 

The problem: minimize $\Sigma_{i=1}^6 |\epsilon_i|$

**One way**
minimise $\Sigma_{i=1}^6 z_i$
with 
$\epsilon_i \leq z_i$ 
$-\epsilon_i \leq z_i$

**The other way**
mimmise $\Sigma_{i=1}^6 r_i^-, + r_i^+$

where $|\epsilon| = r_i^- - r_i^+ $ 
with $ r_i^-, r_i^+ \geq 0$



**Converting maximum absolute residual into a linear program**.

The problem: minimise $max(|\epsilon_i|)$

Minimise $r$, for all $i$.
$$r \geq \epsilon_i$$
$$r \geq -\epsilon_i$$



### Transforming a linear program into a standard form











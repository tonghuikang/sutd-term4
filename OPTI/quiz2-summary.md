# Quiz 2 summary

**Taxonomy** of network problems (and methods)

- **Linear programming (Simplex)**

  - **Min-cost flow problem (Network Simplex)**
    
    For our course we will assume all edges have infinite capacity.
    
    - **Max-flow problem (Ford-Fulkerson) **
    
      This can be formulated into a min-cost flow problem by connecting an arc from the tap of the source, with infinite capacity and negative one cost.
    
      (The dual problem is the **min-cut problem**.)
    
      - Baseball elimination (example)
    
        (Only have four layers, attempts to exhaust all supply)
    
    - Maximum cardinality matching
    
    - Transhipment problem
    
      How to meet the demand while minimising delivery costs?
    
      Can be formulated into a min-cost flow problem by adding dummy sources or taps with zero cost arcs. This makes the total demand equals to the total supply.
      
     - **Shortest path problem (Dijkstra)**
      
         You are transporting a unit supply from the source to the tap, at minimum cost
         
      - Transportation problem
    
        Transhipment problem without intermediate nodes.
    
          - Assignment problem
        
            Transhipment problem but the total demand is equal to the total supply.

<div style="page-break-after: always;"></div>
## The max-flow problem

Given a directed network $G = (V,E)$ and a source node $s$, a sink node $t$, and a possibly infinite capacity $u_{ij}$ for each arc $(i,j)$

The max-flow problem is the problem of finding a value of flow for every arc in such a way that

- Flows are nonnegative and arc capacities are satisified
- For every node that is not $s$ or $t$, the incoming flow is equal to the outgoing flow
- The flow entering the sink $t$ is maximum



Formulation of the Linear Program
$$
\begin{align}

\text{Objective function}\\

\max& \ q \\

\text{The inflow of the source}\\

  & \qquad \sum_{(s,j) \in E} x_{sj} &=& \ q\\

\text{The outflow of the tap}\\

  & \qquad \sum_{(i,t) \in E} x_{it} &=& \ q\\

\text{For all other nodes, inflow equals outflow}\\

\forall v \in V, v \neq s, t &
  \qquad \sum_{(v,j) \in E} x_{vj} 
       - \sum_{(i,v) \in E} x_{iv} &=& \ 0\\

\text{Capacity constraint}\\

\forall (i,j) \in E&
  \qquad x_{ij} &\leq& \ u_{ij}\\

\text{Nonnegativity constraint}\\

\forall (i,j) \in E&
  \qquad x_{ij} &\geq& \ 0
\end{align}
$$



**Transforming into a max-flow problem**

- Edge with infinite flow - use a very large number as capacity for computation.
- Multiple source - create a single dummy source that has a directed edge to each of the original source. The capacity of the edge is the capacity of the original source. The original source is now like any other node.
- Multiple taps - create a single dummy tap that has a directed node from each of the original tap. The capacity of the edge is the capacity of the original tap. The original tap is now like any other node.

<div style="page-break-after: always;"></div>
## Ford-Fulkerson algorithm for max-flow

**Problem parameters**

These are the numbers that you need to keep track of

- **Nodes**
  - Provided by the problem
    - **Label**. This is how the node is referred to. Be If this is also a number it can be quite confusing.
    - (There are no require demand or supply)
- **Edges** (directed)
  - Provided by the problem
    - Capacity of the edge
      - You can consider that between every pair of node there is an edge, we do not show one with zero capacity.
  - Calculated for each iterations
    - Modified capacity
      - If the capacity is initially zero, we augment the arc.



**Initialise** the **current flow value** as zero

**Iterate** with the following steps

- Find any **directed path** $P$ from the source to the tap. 
- Send the **maximum possible flow** $f$ along $P$.
- **Add** $f$ to the current flow value.
- **Update the path** $P$.
  - Decrease the forward capacity by $f$.
  - Increase the backward capacity by $f$
    - You may need to create an (augmenting) path.
  - If a directed edge from the source is zero, remove.
  - If a directed edge to the tap is zero, remove.

**Terminate** the algorithm when there are no more directed paths from the source to the tap. The complexity of the algorithm depends on the choice of augmenting paths.

<div style="page-break-after: always;"></div>
The backflow capacity needs to be decreased if used (from 10 to 9 in the example below). 

<img src="assets/Screenshot 2019-11-04 at 12.52.50 PM.png" alt="Screenshot 2019-11-04 at 12.52.50 PM" style="zoom:30%;" />

My understanding of the intuition
- when you assign the flow you also assign **flexibility** with the backflow values
- **progress** is made when the edges from the source and tap is removed, eventually leaving no directed node from the source to the tap

<div style="page-break-after: always;"></div>
<img src="assets/Screenshot 2019-11-17 at 9.57.46 PM.png" alt="Screenshot 2019-11-17 at 9.57.46 PM" style="zoom:33%;" />

**The backflow is ignored** in the calculation of the value of the min-cut. 

Each feasible solution of the dual problem provides an upper bound to the primal problem.

Natuaral bounds - if you partition right outside the source and the tap, you get trivial upper bounds. It is not possible to send any more than the source can send, or any more than the sink can take.

The optimal solutions for the primal and dual problems is the same.

<div style="page-break-after: always;"></div>
### **Primal-dual pair for max-flow problem**

The dual of max-flow problem is the min cut problem. Assigning the $d$-values provides a partition.

<img src="assets/Screen Shot 2019-11-04 at 14.48.15 PM.png" alt="Screen Shot 2019-11-04 at 14.48.15 PM" style="zoom: 33%;" />

<img src="assets/Screen Shot 2019-11-04 at 14.48.03 PM.png" alt="Screen Shot 2019-11-04 at 14.48.03 PM" style="zoom:33%;" />

Wikipedia offers good explanation https://en.wikipedia.org/wiki/Max-flow_min-cut_theorem
Symbols differ.

<img src="assets/Screen Shot 2019-11-04 at 14.48.06 PM.png" alt="Screen Shot 2019-11-04 at 14.48.06 PM" style="zoom:33%;" />

![Screenshot 2019-11-22 at 1.52.36 PM](assets/Screenshot 2019-11-22 at 1.52.36 PM.png)

<div style="page-break-after: always;"></div>
#Min-cost flow problem

This is a more general form of a max-flow problem, but still a specific class of linear programming problem (refer to taxonomy)

![Screenshot 2019-11-06 at 11.42.14 AM](assets/Screenshot 2019-11-06 at 11.42.14 AM.png)

For each node the outflow minus inflow equal $b_i$. If $b_i > 0$, node $i$ is a supply node, if $b_i$ is a demand node, node $i$ is a demand node.

<img src="assets/Screenshot 2019-11-06 at 11.53.33 AM.png" alt="Screenshot 2019-11-06 at 11.53.33 AM" style="zoom:50%;" />

<img src="assets/Screenshot 2019-11-06 at 11.53.48 AM.png" alt="Screenshot 2019-11-06 at 11.53.48 AM" style="zoom:33%;" />



**Properties**

- Feasible solution is not guaranteed - it is possible that the supply do not reach the demand.
- Redundancy - the last flow node is a linear combination of rest of the flow nodes.

**Transforming into a min-cost problem**
In the min-cost problem total demand should be equal to the total supply $\sum_i b_i = 0$, or else there this is not a min-cost problem (or no feasible solution). Therefore

- If the supply exceeds the demand, create a dummy sink connected to each source, each with **zero cost**.
- If the demand exceeds the supply, create a dummy source connected to each source, each with **very high cost**.

**Converting a max-flow problem into a min-cost problem**

Every max-flow problem can be converted into a min-cost problem (refer to taxonomy of linear programming problems).

Add an arc from the sink to the source with infinite capacity. The objective function is to minimise the negative of the flow of the new sink-source arc. The cost of the rest of the arcs are zero.

<div style="page-break-after: always;"></div>
## Network simplex algorithm

A tree is a graph **with no cycles**. It can be directed or undirected, but we consider undirected trees.

A spanning tree of a connected graph is a subset of its arcs that forms an undirected tree touching every node. (Directions does not matter here)

The basic feasible solution of the LP formulation of a min-cost flow problem correspond to a spanning tree.

The **basic feasible solution** is a spanning tree that allows all supplies or demands to be satisfied.

<img src="assets/Screenshot 2019-11-13 at 11.31.07 AM.png" alt="Screenshot 2019-11-13 at 11.31.07 AM" style="zoom:50%;" />



<img src="assets/Screenshot 2019-11-13 at 11.36.09 AM.png" alt="Screenshot 2019-11-13 at 11.36.09 AM" style="zoom: 50%;" />

The capacity limits $u_{ij}$ will not be considered in this course.

<div style="page-break-after: always;"></div>
## Network simplex algorithm

**Problem parameters**

These are the numbers that you need to keep track of

- **Nodes**
  - Provided by the problem
    - **Label**. This is how the node is referred to. If this is also a number it can be quite confusing.
    - **Supply** (positive) or **demand** (negative)
      - The total demand must be equal to the total supply.
  - Calcuated for each BFS
    - **Simplex multiplier** $y_i$
      - Down the directed edge of the basic arc, the simplex multiplier decreases by the initial cost of the edge.
- **Edges** (directed)
  - Provided by the problem
    - Capacity (ignored, this course assumes infinite capacity)
    - **Initial cost** $c_{ij}$
  - Calculated for each BFS
    - **Assigned flow**
      - If the current flow is zero, it is a nonbasic arc
      - If the current flow is **positive**, it is a **basic** arc
      - Flow cannot be negative
    - **Reduced cost** $\bar{c}_{ij}$
      - The reduced cost of every nonbasic arc is calculated
        - (The reduced cost of every basic arc is zero)
      - $\bar{c}_{ij} = c_{ij}- y_i + y_j$
      - Initial cost minus decrease in simplex multiplier down the direction of the edge

<div style="page-break-after: always;"></div>
**Initialising the network simplex**

You start with a **basic feasible solution** a minimum spanning tree that allows all supplies and demands to be satisfied.

Compute the **simplex multipliers** starting from a leaf (chosen at random or instructed). The leaf (which is a node) is set to zero. 



**Recurse until solution is optimal**

Compute the **reduced costs**. If all reduced cost are **nonnegative**, the solution is optimal.

**Pivot** to improve the BFS. "We try to send as much flow as possible along that arc, while staying feasible". In other words, you **redirect** the flow to the nonbasic arc, from the (series of) basic arcs, until one of the flow of the basic arc is zero.

**Update the simplex multipliers.** You can repeat the same process, or use the following faster procedure. Then, repeat the cycle.



![Screen Shot 2019-11-17 at 23.35.10 PM](assets/Screen Shot 2019-11-17 at 23.35.10 PM.png)

<div style="page-break-after: always;"></div>
**Assumptions**

- No capacity constraints for the edges
  (the exam will not have constrains for edge capacity)
  How it is modified - set the nonbasic variables to either the upper or lower bound. Pivot on this edge only if the reduced cost is negative and if the nonbasic variable is at the lower bound, or the reduced cost is positive if the nonbasic variable is at the upper bound.
- The problem is feasible - it is already if you can find a basic feasible solution.
- The problem is not unbounded. If you find a cycle that has a negative total cost along the path, the cost can be minimised indefinitely.

![Screenshot 2019-11-18 at 12.43.51 AM](assets/Screenshot 2019-11-18 at 12.43.51 AM.png)



<div style="page-break-after: always;"></div>
**Phase I of network simplex**

Do this to obtain a basic feasible solution for the network simplex.

![Screen Shot 2019-11-17 at 23.32.50 PM](assets/Screen Shot 2019-11-17 at 23.32.50 PM.png)



<div style="page-break-after: always;"></div>
**Comparison between simplex and network simplex**

![Screenshot 2019-11-13 at 12.07.24 PM](assets/Screenshot 2019-11-13 at 12.07.24 PM.png)

![Screenshot 2019-11-13 at 12.07.29 PM](assets/Screenshot 2019-11-13 at 12.07.29 PM.png)


<div style="page-break-after: always;"></div>
# Integer programming

Memorising the solutions to each problem does not scale. You need to understand the design priniciple behind every solution.



Example - flipping the board of five. Takeaways

- How to constrain a linear expression to **odd and even** (use $2k + 1$, $k$ integer)
- Use of dummy variables outside the grid to **simplify expressions**
- **Minimising an integer variable** also constrains the variable to take only **binary** values.

Example - IKEA with setup costs. Takeaways

- Use of a **big-M** constraints to add "**setup cost**" variable and constraint.

  $x \leq My$ 
  - when $y$ is zero, $x$ is constrained to be **zero** 
  - when $y$ is one, no constraints is placed on $x$





<div style="page-break-after: always;"></div>
## Modelling ILP problem

Linear programming can only solve convex problems, with inclusive boundaries, and you cannot multiply variables.

Strategy - transform the problem into ORs and ANDs.



**Modelling less-than-or-greater-than (non-convex) inequality**
$$
x\leq2 
\quad \text{or} \quad 
x \geq 6
$$
You can turn off either constraint by adding a binary variable $w_i$ with a big $M$.
$$
x \leq 2 + M w 
\quad \text{and} \quad 
x \geq 6 - M (1-w)
\quad \text{and} \quad 
w \text{ binary}
$$

Consider the geometry of the formulation.

![Screenshot 2019-11-20 at 12.08.07 PM](assets/Screenshot 2019-11-20 at 12.08.07 PM.png)

The yellow region is convex.

<div style="page-break-after: always;"></div>
**Modelling with complement constraint**

One and only one of the constraint and its complement can be fulfilled. 

If the variables and coefficient are integers, we can formulate a complement. For the constraint $x_1 + 2x_2 \leq 10$, the violation is $x_1 + 2x_2 \geq 11$. (We cannot use strict inequalities for linear programming).

![Screenshot 2019-11-20 at 12.13.24 PM](assets/Screenshot 2019-11-20 at 12.13.24 PM.png)





**Implication statement into logical constraint**

If $P \implies Q$,  $\overline{P} \or Q$ must be true. $\overline{P}$ is the complement of $P$.

![Screenshot 2019-11-20 at 12.22.56 PM](assets/Screenshot 2019-11-20 at 12.22.56 PM.png)





<div style="page-break-after: always;"></div>
**Piecewise linear functions**

This is more for objective function, though it is possible for the constraint.

<img src="assets/Screenshot 2019-11-20 at 12.43.46 PM.png" alt="Screenshot 2019-11-20 at 12.43.46 PM" style="zoom:50%;" />

![Screenshot 2019-11-20 at 12.43.34 PM](assets/Screenshot 2019-11-20 at 12.43.34 PM.png)

$x$ is replicated into three parts.
$x_i$ will be set to zero if we are not using the i-th piece. 
$w_i$ indicates whether are we using the i-th piece.
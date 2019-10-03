# Process analysis

A process is a collection of operations connected by a flow of transactions and information that transforms various inputs into outputs using resources.



Deterministic VS Stochastic processes

- Deterministic process: given input results in given output (within fixed amount of time).
  - Examples: Chemical reactions, deliver parcels by drones (mostly)
- Stochastic process: given input might lead to different output due to inherent randomness
  - Examples: Seeing doctors, deliver parcels by cars



Purpose of analysing the process flow - to increase throughput, by
- To identify inefficient tasks 
- To spot tasks to improve effectiveness 
- To understand where value can be added and how much


## Performance measures

**Throughput**

- Output **rate** of a process or a stage of a process
- Example: average number of patients served per day = 60

**Flow time**

- Average **time spent in system** by unit single output
- Often includes waiting time.
- Example: average time spent in clinic = 2 days

**Work-in-process (WIP)**

- Average number of units in systems over a time interval. 
- Example: average number of patients in a clinic over time = 120



#### Little's Law

Work-in-process = Throughput * Flow Time 




## Calculation of throughput

**Single-stage Process**

- Throughput = Output / Time

**Multi-stage Process** (simple)

- Throughput of a multi-stage process (sometimes called “Capacity”) is the lowest throughput (rate) among all the stages

**Stage with Parallel Activities**

- The overall throughput is the **minimum** throughput among all the parallel activities. 
  - Example: In preparation of a team presentation, different sections might be drafted by different members simultaneously - you need to **wait** for the slowest person to complete his/her part.

**Stage with Multiple Paths**

- The overall throughput is the harmonic weighted sum.
  - $$1\left/\Sigma_i^m{\frac{p_i}{Th_i}}\right.$$ 



## Throughout analysis

The **bottleneck** is the process stage with the lowest throughput rate. 
- Downstream operations will be starved
- Upstream operations will be blocked

**Consequence** of bottleneck

- It slows down the whole process
- It limits the process capacity
- It leads to low utilization at other stages
- It lead to job waiting
- It requires extra inventory/buffer/stock to place waiting jobs


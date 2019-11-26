# Solving integer programs

If $z_{IP}$ is the optimal value of the maximising IP, and the $z_{LP}$ is the optimal value of its LP **relaxation**. Then $z_{IP} \leq z_{LP}$. If the optimal solution to the LP relaxation has integer variables, it is also the optimal solution to the IP.

Strategy - make all corner points integers.

You find valid inequalities to make the corner points integer.

You do not need to make all corners integer, as long as the optimal solution is all integers you can stop.



![Screenshot 2019-11-25 at 12.46.46 PM](assets/Screenshot 2019-11-25 at 12.46.46 PM.png)



Knapsack example - there are subset that definitely will not be in the solution because it will exceed the limit.



### Gomory cuts

![Screenshot 2019-11-25 at 3.09.10 PM](assets/Screenshot 2019-11-25 at 3.09.10 PM.png)



![Screenshot 2019-11-25 at 3.08.38 PM](assets/Screenshot 2019-11-25 at 3.08.38 PM.png)

Use revised simplex to solve this.



![Screenshot 2019-11-25 at 3.08.52 PM](assets/Screenshot 2019-11-25 at 3.08.52 PM.png)
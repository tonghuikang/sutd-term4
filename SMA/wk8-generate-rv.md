#  Simuation Analysis

A careful simulation model will have to consider many **uncertain** variables 
- such as future demand, labour force available, effect of competition, wages, prices, etc. 



Question 1: How do you simulate realizations of various random variables which model uncertainty (specifically and realistically)?

Question 2: How do you "make sense" of the simulation output affected by randomness?
- How do you remove initialization bias (eg: bias due to starting factory "empty and idle")
- How long do you run simulation to get desired accuracy?
- How long do you run simulation to firmly establish that one system configuration is better than other?





Given the probability distribution (PDF, PMF, **CDF**) of a random variable $X$, how to do you generate samples of $X$ with random uniform variable $U$?

$U \sim \text{Uniform}[0,1] $ 

**(Inverse transform method)** Take the inverse function of CDF (i.e. express the variable $x$ in terms of the CDF). You can generate samples of $X$ with the required probability distribution with the inverse CDF function $F^{-1}(x)$, with the random uniform variable as an input.
$$
\begin{align}
u = F(x)      &= 1 - exp(-x/\mu)\\
F^{-1}(x) &= -\mu \ln(1-u)
\end{align}
$$

Therefore $X = F^{-1}(x) = -\mu \ln(1-U)$  is exponentially distributed with mean $\mu$.

If the CDF is defined piecewise, the inverse function is defined piecewise too (the range is now the domain).
# Quiz cheatsheet

Table of random variable and its describing functions

**Range of the functions.** For PMF/PDF, values outside the range shown is zero. For CDF values outside the range showns its the values of the limits of the range shown. For CDF_inv, the range is 0 to 1.

| Distribution | PMF/PDF $f(x)$                                               | CDF $F(x)$                                                   | CDF_inv $F^{-1}(x)$                                          |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Uniform      | $1 \text{ for } 0 \leq x \leq 1$                             | $x \text{ for } 0 < x < 1$                                   | $U$                                                          |
| Exponential  | $\lambda e^{-\lambda x} \text{ for } x \geq 0$               | $1-e^{-\lambda x} \text{ for } x \geq 0$                     | $-\frac{1}{\lambda}\log(1-U)$                                |
| Laplace      | $\dfrac{\lambda}{2} e^{-\lambda|x|}$                         | $\frac{1}{2}e^{\lambda x} \text{ for } x \leq 0$<br><br/>$1-\frac{1}{2}e^{-\lambda x} \text{ for } x \geq 0$ | $-\frac{1}{\lambda}\log(2U) \text{ if } U \leq 0.5$<br/><br/>$-\frac{1}{\lambda}\log(1-2U) \text{ if } U \geq 0.5$ |
| Poisson      | $\dfrac{\lambda^k e^{-\lambda}}{k!} \text{ for } x \geq 0, x \in \Z$ | $e^{-\lambda} \sum_{i=0}^{\lfloor k \rfloor} \dfrac{\lambda^i}{i!}$ | Use exponential                                              |
| Binomial     | ${n \choose k}p^k q^{n-k} \text{ for } x \geq 0, x \in \Z$   | Refer to HW1Q1                                               | N.A.                                                         |
| Geometric    | $(1-p)^{k-1} p$                                              | $1 - (1-p)^k$                                                | $\left\lceil \dfrac{\ln(1-U)}{\ln(1-p)} \right\rceil$        |
| Normal       | $\dfrac{1}{\sqrt{2\pi \sigma^2}} \exp\left({-\dfrac{(x-\mu)^2}{2\sigma^2}}\right)$ | Use accept/reject with Laplace                               | N.A.                                                         |
|              |                                                              |                                                              |                                                              |


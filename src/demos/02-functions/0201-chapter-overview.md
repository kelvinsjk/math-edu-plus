# 0201: Functions

# Quick Links

- [2007](#type-1-2007-p1-q2)

# Implemented Questions

## Type 1: 2007 P1 Q2

$$
\begin{align*}
&f:x \mapsto \frac{1}{ax-b} \quad 
&& \textrm{for } x \in \mathbb{R}, x \neq \frac{b}{a} \\
&g:x \mapsto x^2 - c \quad 
&& \textrm{for } x \in \mathbb{R}
\end{align*}
$$

Implemented as `type 1`
where $b \geq 0$ such that $fg$ does not exist but $gf$ does.

- (a) Explain why one of the composite does not exist, and give a definition (including the domain) of the composite that exists.
- (b) Find $f^{-1}(x)$ and state the domain of $f^{-1}$.

## Type 2

$$
\begin{align*}
&f:x \mapsto \frac{1}{ax-b} \quad 
&& \textrm{for } x \in \mathbb{R}, x \neq \frac{b}{a} \\
&g:x \mapsto x^2 \quad 
&& \textrm{for } x \in \mathbb{R}, x > -c
\end{align*}
$$

Implemented as `type 2`
where $b < 0$ such that $gf$ does not exist but $fg$ does.

Both question parts will be the same as `type 1`

# Potential future implementations ideas


# Not implemented yet

## 2008 P2 Q4

Quadratic equation and inverse of it

- Will require the `SquareRoot` class for implementation of the final $f(x) = f^{-1}(x)$ part.

## 2009 P2 Q3, 2012 P1 Q7, 2018 P1 Q5

Self-inverse function $\frac{ax}{bx-a}$.

For 2009, abstract, in terms of $a$ and $b$. May implement a local version of this with specific $a$s and $b$s.

May overlap with 2012 question. 2012 question also includes link to transformations.

May overlap with 2018 question $\frac{x+a}{x+b}$.

## 2010 P2 Q4  

Domain restriction of $\frac{1}{x^2-1}$ for $f^{-1}$ to exist.

Follow-up parts linking composites with inequalities (perfect squares).

## 2011 P2 Q3, 2019 P1 Q5

Require implementation of $\ln x$ and $e^x$, and a numerical solver to handle the final part of the question in 2011. 

The 2019 question may be easier to implement.

## 2013 P2 Q1

$\frac{a+x}{b-x}$ and $c-dx$. Composite and $(gf)^{-1}(k)$. Potential to merge with many other questions.

## 2014 P1 Q1

$\frac{a}{b-x}$ such that $f^n (x) = f^{-1} (x)$.

## 2015 P2 Q3

$\frac{1}{1-x^2}$ and $f^{-1}$. Has potential to merge with many other questions. 

Part (b) of question asks about range, but better implemented under **Chapter 1: Inequalities**.

## 2016 P1 Q10

$1+\sqrt{x}$ and function defined over the integers with a recurring definition. Likely very tough to implement.

## 2017 Specimen P2 Q1

$R$-formula and the range. Requires implementation of trig functions.

## 2017 P2 Q3

(aiv) is a theoretical question about inverse functions (while (ai)-(aiii) are better classified under curve sketching).

(b) $1-\frac{1}{1-x}$ can potentially merge with many other questions.

## 2019 P2 Q2

$$\frac{ax+b}{cx^2 + dx + e} > 0$$

## 2020

No function questions
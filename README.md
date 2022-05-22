# Traveling Salesperson Problem Visualization

View it here: [https://shaurya-sarma.github.io/traveling-sales-man-problem/](https://shaurya-sarma.github.io/traveling-sales-man-problem/)

This project is an interactive visualization of the Traveling Salesperson Problem that attempts to find the most optimized path using a genetic algorithm. Feel free to edit the "cities" and "salespeople" fields. 

## What is the Traveling Salesperson Problem (TSP) ?

It is a famous optimization problem that is designed to solve:

> Given a list of cities and the distances between each pair of cities, what is the shortest possible route that visits each city exactly once?

## Neuroevolution of augmenting topologies (NEAT)

In this project, the genetic algorithm used is called NEAT and allows us to start with a simple aritifical neural network and evolve them into more complex networks. It uses the same principles as Darwin's theory of biological evolution. 

1. Natural Selection
2. Inheritence 
3. Mutations 

Our population is represented by "traveling salespeople" who start off by calculating a randomized route from the starting point to all the other points (representing cities). 

The same idea illustrated in the survival of the "fittest" is applied to evolve our solving algorithm. Using natural selection as a driving force, the population is expected to become better as the number of generations increase. 

Inheritence is simplified since crossing over of parents is unnecessarily complex for this application. However, the population of the next generation is created through the duplication of "fittest" parents of the previous generation. Higher fitness parents have a higher probability of being selected as templates for the children of the next generation than lower fitness parents. 

Lastly, mutations are conducted through randomization. By mutating the children of the next generation, it allows individuals in the population (salesperson) to find a better, more optimzied path.

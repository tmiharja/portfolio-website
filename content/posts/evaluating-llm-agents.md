---
title: CERS-DR : Cycle-Based ETF Rotation Strategy with Dynamic Rebalancing with The Application of Reinforcement Learning and Neural Network
summary: "Research Paper"
date: 2019-02-10
---

It is widely studied and acknowledged that the economy moves in cycles. The business cycle is defined as the natural fluctuation of the economy between periods of expansion and contraction. Following this business cycle, specific industries can outperform or underperform at different phases. As a leading indicator of business cycles, stock price fluctuates in accordance, leading to the development of investment strategies that aim to leverage on this cycle-based price fluctuation. One such investment strategy is the Exchange Traded Fund (ETF) sector rotation strategy, where an investor keeps an investment portfolio consisting of ETFs from different industries and invests in the industry that outperform the rest at the different phases of business cycle. This strategy is increasing in popularity and reputation, making it a significant topic to explore.

Despite the promise of ETF rotation strategy, implementing it can be challenging. There exist challenges in the difficulty in market cycle identification, difficulty in portfolio construction optimisation, and the difficulty in optimising portfolio rebalancing. Being able to overcome these challenges is key in implementing the strategy successfully.

This paper proposes a novel Cycle-based ETF Sector Rotation Strategy with Dynamic Rebalancing (CERS-DR), which aim to solve the aforementioned challenges by providing an end-to-end scheme from portfolio construction, cycle identification, to dynamic portfolio rebalancing. To construct the optimum portfolio, CERS-DR employs maximum-reward Reinforcement Learning (RL) to study the relationship between asset correlation and portfolio size. To identify cycle effectively, CERS-DR utilises dual RL agent that is able to identify cycles while taking into account the different industry characteristics. To conduct dynamic rebalancing, CERS-DR utilises RL and Convolutional Neural Network (CNN) to summarise the market environment, assess the potential of each portfolio constituent and assign optimal portfolio weights subsequently.

CERS-DR is benchmarked against other rebalancing schemes and S&P 500 index. The results are highly encouraging, consistently outperforming the S&P 500 index.

See full paper here: https://dr.ntu.edu.sg/entities/publication/8cccb3a1-f059-4870-8caf-53767e7df648 

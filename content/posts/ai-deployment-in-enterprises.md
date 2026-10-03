---
title: Deploying AI & LLMs in Large Enterprises - Lessons from the Field
summary: What it actually takes to move AI from a promising pilot to a production system people use - the workflow, the common pitfalls, and a credit risk case study.
date: 2026-05-10
---

Over the past few years, I have led many AI and digital product design, build and deployments in large enterprises across banking, insurance and retail in APAC - from digital lending ventures and insurance platforms to data platforms and credit risk models. Over the course of many projects and deployments, the model is rarely the reason a deployment fails - it is everything around it: the data, the processes, the people and the controls. This post is a reflection of the past few years of work and my attempt to **codify the workflow and lessons I keep coming back to**.

## Typical deployment workflow for AI solutions
![Deployment workflow](/img/posts/ai-delivery-six-steps.PNG)

Every enterprise is different, but most successful deployments follow six broad steps:
1. **Use case identification & prioritisation.** Start from a business problem, not a technology. Size the value (revenue, cost, risk), check feasibility, and agree on one or two use cases worth doing first. This is also where you secure a business owner who will own the outcome after launch.
2. **Feasibility & data validation.** Before committing to a full build, confirm that the data exists, is accessible and is good enough. A short proof of concept on real data can really speed up the process and help bring up potential watch-points and risks early in the project.
3. **Solution design.** Define how the solution fits into the existing process and systems: where it sits in the workflow, which systems it integrates with, and where humans stay in the loop. For agentic AI, this includes what the agent is allowed to do on its own, and what needs approval.
4. **Build & iterate.** Develop in short cycles with frontline users involved early. Agree on evaluation criteria upfront - both technical metrics and business outcomes - so that "good enough" is not debated at the end.
5. **Testing, controls & sign-off.** Run UAT with real users, and bring in risk, compliance and IT security for validation and approvals. In banking and insurance, this step can take as long as the build if left until the end.
6. **Rollout, adoption & monitoring.** Launch in phases, track adoption alongside performance, monitor for drift, and agree who owns the solution once the project team steps away.

## Key pain points & common pitfalls (and how to avoid them)

Across these steps, the same few pitfalls tend to show up regardless of industry:
1. **Pilot purgatory.** The proof of concept works, but there is no path to production - no integration plan, no budget, no owner. How to avoid: plan for production from day one, and treat the pilot as the first release of the real product, not a separate experiment.
2. **Data reality vs. data assumption.** Teams assume the data is clean until they start building. How to avoid: run a data audit during feasibility, and budget more time for data engineering than you think you need.
3. **Measuring the model, not the business.** A model can hit its accuracy target and still not move the business KPI it was built for. How to avoid: define business success metrics with the business owner upfront and track them after launch, not just model metrics during the build.
4. **Bringing in risk & compliance too late.** Controls, model risk reviews and security approvals discovered at the end can delay go-live by months. How to avoid: involve these teams in solution design, so their requirements shape the build instead of blocking it.
5. **Underestimating adoption.** If frontline users do not trust the output, they will work around it. How to avoid: involve users in design and testing, explain how decisions are made, and let them give feedback and override where it makes sense.
6. **Too much autonomy, too early.** This is especially relevant for agentic AI. Giving an agent wide permissions from day one increases the risk of costly errors. How to avoid: start with human-in-the-loop, narrow permissions and strong guardrails, then expand autonomy as performance is proven.

## Example case study: Credit risk model for a leading Indonesian NBFI

One deployment that illustrates this workflow well is a credit risk model I worked on for a financial services client, where I was the delivery lead for a team of 6+ forward deployed engineers and consultants.

### Identifying & validating the use case
We started by working with the business to identify where better credit risk prediction would create the most value in the lending process, and to validate feasibility before committing to the full build. A big part of this was checking that the historical loan and repayment data was complete and reliable enough to train on - this surfaced data gaps early, when they were still cheap to fix.

### Building with the end process in mind
Rather than optimising the model in isolation, we designed it around how credit decisions are actually made and how the workflow actually looks like in reality. The output fit existing workflows and could be explained to its users. We also iterated with the business on the right trade-off between approval rates and risk, instead of chasing a single accuracy number.

### Deploying & iterating
We took the model through to production deployment and continued iterating after launch, with monitoring to track performance over time. Overall, the new model **improved accuracy by up to ~30%** compared to the existing approach.

### What made the difference
1. **Clear business ownership** from the start, so decisions on trade-offs could be made quickly.
2. **Early data validation**, which kept the build from being derailed by surprises halfway through.
3. **Treating go-live as the beginning, not the end** - performance monitoring and iteration were planned as part of the project, not as an afterthought.

## Closing
The fundamentals of deploying solutions in large enterprises stay the same: start from the business problem, validate early, design for the real process, and plan for adoption and ownership from day one. In the next post, I will zoom in to the deployment step of Agentic AI in enterprises, zooming in into evals, guard rails and other critical topics when deploying AI agents.

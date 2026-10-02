---
title: The Last Mile - Taking Enterprise AI from Pilot to Production
summary: A technical deep-dive into the part of AI deployment that decides whether it creates value - integration, evals, rollout and running it in production.
date: 2026-10-02
---

<!--
DRAFT - not published. Lives in content/drafts/, which the site does not read.
Fill in every [DETAIL: ...] / [NUMBER: ...] / [DIAGRAM: ...] placeholder, then move this file to content/posts/ to publish.
Find them all with:  grep -n "\[DETAIL\|\[NUMBER\|\[DIAGRAM" content/drafts/the-last-mile-enterprise-ai.md
-->

In my [previous post](/writing/deploying-agentic-ai-in-enterprises), I walked through the end-to-end workflow for deploying AI in large enterprises. This post zooms into the step that, in my experience, decides whether all the earlier work pays off: **taking the solution into production and keeping it there**.

Most AI programs do not stall because the model is not good enough. They stall in the last mile - between a working pilot and a system the business actually runs on. I have seen this from two vantage points. As deployment lead for a 0-to-1 digital lending venture, I sequenced **5 interdependent squads and 30+ data and software engineers** to a production launch in ~8 months. On a much smaller scale, I designed, built and deployed my own [multi-agent Resume Optimiser](/writing/agentic-resume-optimiser) end to end. Different scale, same lesson: **production-readiness is designed, not discovered at the end**.

## 1. Define "production-ready" before writing code

The most useful document in any deployment is the one written before the build starts: a shared definition of what "ready for production" means. I typically align on it with the business owner, IT and risk in the first weeks:
1. **Performance budgets.** Target latency, throughput and cost per transaction. For the Resume Optimiser, the budget was ~1 minute per analysis at about US$0.05 each - which directly shaped the model choice.
2. **Data and privacy constraints.** Where data can live, what can leave the environment, and what must never be stored.
3. **Quality bar and blocking failures.** Which evaluation results are required to launch, and which failures stop a release.
4. **Ownership after go-live.** Who runs it, who is on call, and who decides on changes.

[DETAIL: an example of a production-readiness criterion you agreed with a client, e.g. a latency or availability target, or a data residency requirement]

## 2. Integration is the real work

In enterprises, the model is usually the easiest part. The heavy lifting is connecting it to everything around it:
1. **Core systems.** Loan origination, policy administration, CRM or data warehouses - often older systems with limited APIs. [DETAIL: systems you integrated with, e.g. core banking / LOS / data platform]
2. **Identity and access.** Single sign-on, role-based access and audit trails, so every action can be traced to a user or a service.
3. **Security and network reviews.** Penetration testing, vendor assessments and network approvals - which can take weeks, so they should start early.
4. **Data pipelines.** Reliable, monitored flows in and out of the solution, with clear handling of missing or late data.

On the lending venture, the hardest part was not any single squad's build but **managing dependencies across origination, loan management, servicing, insurance and reporting** so they converged on one launch. [DETAIL: one concrete integration challenge and how you resolved it]

## 3. Evals, guardrails and controls

AI systems need a different kind of testing from traditional software, because the same input does not always produce the same output.
1. **Evaluation sets from real cases.** Build test sets from real (anonymised) examples, including the hard and unusual ones, and re-run them before every release to catch regressions.
2. **Guardrails in code, not just prompts.** In the Resume Optimiser, input checks strip hidden text before anything reaches a model, and a dedicated verifier agent fact-checks every rewrite against the original resume to stop invented facts.
3. **Human-in-the-loop for high-stakes actions.** Decisions with real consequences - such as credit outcomes - keep a human approval step until performance is proven.
4. **Controls built with risk and compliance.** For the credit risk model, [DETAIL: how model validation / model risk review worked, and when risk was brought in].

## 4. Rollout strategy: never switch everything on at once

How you launch matters as much as what you launch. A typical staged rollout looks like this:

[DIAGRAM: rollout stages - shadow mode → limited pilot → phased rollout → full cutover → hypercare]

1. **Shadow mode.** The new system runs alongside the existing process without acting on its output, so its decisions can be compared with reality at no risk.
2. **Limited pilot.** A small group of users or a small share of traffic, with close monitoring and a fast feedback channel.
3. **Phased rollout.** Expand by segment, product or region, with clear go/no-go criteria at each stage.
4. **Cutover and hypercare.** Switch fully, with the project team on standby for the first weeks to resolve issues quickly.

Two things make this safe: **feature flags** to turn capabilities on and off without redeploying, and a **tested rollback plan**. A rollback plan that has never been tested is only a hope. [DETAIL: the rollout approach used on the lending venture or credit risk model, and the go/no-go criteria]

## 5. Operating in production

Go-live is the beginning, not the end. AI systems can degrade quietly as data and behaviour change, so operating them well is a discipline of its own:
1. **Observability.** Track latency, error rates and cost per transaction alongside model quality. For the Resume Optimiser, anonymous statistics on each run make quality issues visible without storing personal data.
2. **Drift monitoring.** Watch for shifts in input data and output quality, with thresholds that trigger review or retraining. [DETAIL: how drift was monitored for the credit risk model]
3. **Fail safely.** Decide upfront what happens when a dependency fails. The Resume Optimiser closes the service if its rate-limit service is down, rather than risking runaway costs.
4. **Runbooks and handover.** Clear procedures for common incidents, and a structured handover so the client's operations team can run the system without the project team.

[DETAIL: a real incident or near-miss after go-live, and what you changed as a result]

## 6. Close the feedback loop

The best deployments get better after launch. Usage data, failure analysis and user feedback should feed a regular iteration cycle - on the credit risk model, post-launch iteration was part of the plan from the start, contributing to an **accuracy improvement of up to ~30%**. For companies building AI platforms, this loop extends one step further: the deployment team is often the best source of insight on what customers actually need, and carrying that back to product and engineering is part of the job.

## Closing: my deployment principles

1. **Define production-ready on day one.** If it is not written down, it will be argued about at go-live.
2. **Treat integration as the critical path**, not an afterthought.
3. **Put guardrails in code** and test them like any other feature.
4. **Never switch everything on at once** - and test the way back.
5. **Plan for day two.** The system has to run without you.

Let me know if you have any feedback or your own lessons from the last mile! :)

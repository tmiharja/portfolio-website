# Building Agentic Resume Optimiser v1: A Multi-Agent AI Pipeline for Job Seekers

Over the years, I have spoken to many Indonesian professionals who are looking for opportunities overseas - some are friends of friends and others via my [instagram platform](https://www.instagram.com/ton_inmotion). Especially the past 2 years, the interest has risen significantly (see [#KaburAjaDulu](https://www.channelnewsasia.com/cna-insider/indonesian-youth-unemployment-brain-drain-kaburajadulu-run-away-cost-5371406)). 

One of the questions that typically pop up is **how to best highlight past work/ experiences to recruiters of global/ multinational companies**. After screening hundreds of resumes for management consulting recruiting and helping several people last year to enhance their resumes, I noticed several key patterns and common pitfalls. While these may seem obvious to experienced job seekers in global markets like Singapore, Hong Kong, etc., I realize some tips/practices may not as obvious. This becomes my motivation to build the **'Resume Optimiser'** - with the aim of **codifying what I have learned and making it more accessible to Indonesian professionals looking for jobs in global markets** like Singapore, Hong Kong, etc.

## How does it work?

The intention is to make the **workflow as simple as possible**; upload a resume, add relevant job descriptions (optional), wait about a minute, and get back three things:
1. An estimated score
2. A job match - showing which of the role's skills you cover and which are missing
3. Specific actionable fixes (e.g. stronger versions of your weakest bullet points).


### What makes it different from just putting in your resume to ChatGPT/ Claude?

A general chatbot can get you far nowadays, if you prompt it well and ask the right questions. Resume Optimiser gives the user a clear verdict and plan in a one-step process:
1. **Standardized rubric & standard** based on years of experience in reviewing resumes & coaching
2. **Suggested fixes, not vague advice** that you need to prompt several times
3. **Private and free**. Your resume is processed and forgotten and never stored.

## Overall solution architecture & technical design

Exploring the different design options and balancing the trade-offs across the agent pipeline are both exciting and tricky. Putting up necessary guard rails in place also took several iterations.

### Overall workflow
![Overall workflow](https://github.com/tmiharja/portfolio-website/blob/main/src/img/resume-optimiser-overall-workflow.PNG)


### Architecture and tech stack
The overall system is one Next.js app deployed on Vercel, with 3 pay-as-you-go services. 

![Overall workflow](https://github.com/tmiharja/portfolio-website/blob/main/src/img/resume-optimiser-overall-architecture.PNG)

The browser loads the pages and send each resume to a single serverless function (pre-stream check function). The function checks the file, asks Redis whether the visitor is within the limits before then initiating the agentic workflow. The agent workflow runs five agents through the Anthropic API and streams progress back as it goes. 


### Key design decisions and trade-offs
1. **5 specialists agents instead of one big prompt**. Shorter, focused instructions are easier to get right and test with each answer having a fixed shape that can be tested. Trade-off: More AI cals mean longer wait time (~1 min) and more moving parts to keep in sync.
2. **Use most cost effective model (Haiku 4.5) for every agent.** For about US$0.05 per anaysis, this keeps the service free within my own budget of US$20. Trade-off: Not the most updated model mean we need to close the gap in quality with sharper rubric and evals.
3. **Fixed rubric for overall calculation with weigthed average**. High explainability with justification. Trade-off: The weights are based on judgment call and not based on dynamic calculations.
4. **Rewrite only the weakest bullets.** Keeps each run focused on the areas where most improvement can be derived. Trade-off: User do not get a fully rewritten resume.
5. **Nothing stored, no accounts.** This is for privacy purposes. Trade-off: No history or before-after comparisons and anonymous stats make quality issues hrader to investigate.
6. **Close the service if the limit service is down.** This is to avoid cost exceeding budget. Trade-off: When there is Redis outage, the tool is also unavailable.

## Closing
The overall build was realy fun and I got to experiment with new tech stacks and interfaces that I have not yet touched before. Let me know if you have any feedback! :)


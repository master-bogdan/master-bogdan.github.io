---
title: "How I lost interest in coding and found it again in AI agents"
date: "2026-11-17"
slug: "lost-interest-found-again"
---

# How I lost interest in coding and found it again in AI agents

![Terminal-style article header with an ASCII octopus](/blog/lost-interest-found-again-header.png)

By **Bogdan Shchavinskyi**

Last year I wrote maybe 1% of all the code I delivered. The rest was written by AI.

For a long time this number made me really unhappy. This is my honest story, how I went from fear that AI will replace me to building AI workflows for my team.

## My fun part was gone

For me technical leadership was always about hard things. Difficult technical tasks, architecture direction, optimizations, code standards and team conventions, and gatekeeping all of it in PR reviews.

Then AI took a big place in our work, and hard tasks became much easier and much more boring. You don't need to write elegant code anymore. AI generates a lot of code much faster than you. Not great quality, but anyway.

Recently I met a lot of engineers (me included) who lost any interest in coding because of this. My fun part was just gone.

I also met engineers who became even more excited and obsessed with vibe coding. They never liked technical puzzles, they just liked to build things. So now they ship and ship like hell. And to be honest, I was jealous of them.

I am different. I like tech challenges more than product development. So if solving a challenge now is mostly a prompt to AI, where is my place? For a long time I didn't know. I was frustrated and scared with the same thought many engineers have: AI will replace me.

## Babysitting until burnout

Because of this fear I tried to control everything even more. AI still generates medium or low-medium quality code. Mostly because of limited context, it can't ingest medium and big codebases. Good repo documentation helps, but it's still not there.

Also it usually invents new functions instead of reusing existing ones. This creates a lot of mess and duplicates in the code.

So I was fighting with it. I was babysitting every change and checking tons of PRs with tons of changes myself. Until I started to feel cognitive overload, and then burnout. I don't think we as humans can ingest so many checks. At least I can't.

## Vacation came just in time

Two weeks I spent training Muay Thai, being outside and sleeping. 0 AI, 0 coding, 0 vibe coding. Just rest.

And at the end of vacation things clicked. I found a lot of interest in things everybody talks about now in AI era: how custom AI agents work, agentic workflows, MCP servers. I changed my mind from "AI will replace me" to "what possibilities it can bring and where is my place there".

The example which helped me is early 1900s. Cars appeared and people started to use cars instead of horses. I bet a lot of people who worked with horses lost their jobs. But cars opened big factories, repair shops, parts production, and created much more jobs than horse industry ever could.

I think now we are in the same transition period with AI. Demand and direction are not clear yet, and a lot of people will lose their jobs or interest. But at the end of the day AI will bring more interesting jobs and roles.

So I came back to work with a new plan.

## What I changed

### 1. Accept that AI writes all your code

I mean it. You can complain that AI generates "garbage code", but it generates it. Your task now is to define module rules and code standards, and validate them.

It's a tradeoff. You move with light speed and you get average, sometimes low-average quality code. Let's be honest, we are accepting it now, also because business doesn't care much about code and wants more speed. In the short run it makes sense. In the long run, maybe not.

But if code is messy and it works, it's fine. We trade code quality for business value here. If code doesn't make money, it doesn't matter what quality it has. Tech debt, bugs? Mostly AI agent will read this code later, fix it and refactor it. What really matters is clear structure: module boundaries, folder conventions, code standards, so the agent knows where things belong. So better spend your time on good AI documentation for your repo and on automated checks than worry about every line. More about it in the next point.

### 2. Stop babysitting, build workflows

Instead of checking everything myself, I built a PR review workflow and validation hooks. Now the AI agent checks its own changes with a defined hook, and it can't skip it. For this I created a skill with a script which validates Clean Code rules after each AI change. The most important rule for me: don't invent, reuse what already exists where it's possible. This one is my answer to the duplicates problem which I described before.

After implementation another AI agent reviews the PR with defined skills and guardrails. It also checks the task description, is it really what it should be.

This gave big improvements for me and my team. I am not cognitively overloaded anymore, the quality of PR checks became better, and it even improved the quality of the product. We have less bugs now.

### 3. My job now is building AI workflows

After that I decided that my task is to build AI agentic workflows, so my team can use AI development with maximum efficiency.

All software engineering roles are shifting now. From my perspective, tech lead job now is AI adoption for the whole team. You need to prepare your repo for AI agents and build tools which multiply your team output: MCP servers, shared skills, guardrails. Then teach your team to use them, get feedback and improve on every iteration.

## Where is it all going

So where are humans in the loop now? Our job is moving to creating workflows, validating results, making decisions and checking summaries. You can create whole armies of AI agents to help you.

With such delivery speed I think the ball is moving to the business side. They will be the bottleneck, to find enough ideas.

I also see new roles coming, and some of them are already here:

- Product Engineer - person who builds a feature from idea to production. Perfect for people who just love to ship.
- AI Integrator - person who brings AI into existing systems, teams and processes, and makes it really work there.
- AI Platform or Tooling Engineer - person who builds internal tools for AI agents: MCP servers, custom agents, shared skills, guardrails for other engineers. This one is for people like me, who like tech challenges.

And when building is so cheap, I think enterprises will build a lot of their own apps, also internal clones of tools they pay for today. Somebody needs to build and support all of this.

Will it bring layoffs? Who knows. But if you are a tech lead who can build a swarm of AI agents, most likely you will be employed.

## Choosing to adapt

So what about my question from the beginning, where is my place? Now I know. Hard technical challenges are still here, they are just different now. My puzzles today are how to make AI agents reliable, how to give them the right context in a big codebase, how to build guardrails which they can't skip, and how to check their work without reading every line. For me it's as interesting as architecture and optimizations were before.

Understanding and accepting these things gave me energy and satisfaction with AI assisted development again. Now I see new horizons instead of fear to be replaced.

My favorite animal is octopus, cause it can adapt to any shape, color and space. So I am choosing to adapt. It's already clear that it's time to let go old things and accept that everything in this world is constantly changing. That's how this world works.

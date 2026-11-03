---
title: "The AI Slop Era: Why Your Project Needs a Concrete Wall of Linters, Tests, and Strict CI/CD"
date: "2026-06-04"
slug: "ai-slop-era"
---

# The AI Slop Era: Why Your Project Needs a Concrete Wall of Linters, Tests, and Strict CI/CD

By **Bogdan Shchavinskyi**

Tech Lead / Senior Software Engineer | Backend & Platform Engineering | Node.js, Go, Kubernetes, AWS | Agentic AI Workflows

AI code tools type very fast, but they have zero common sense. They do not care about your architecture, your database load, or your system security. If you do not build a brutal, automated pipeline to check this work, your codebase becomes a dumpster fire very quickly. You cannot trust an AI agent.

I will tell you what happens in repositories now. A developer opens a pull request with 1,500 lines of code. He wrote it in twelve minutes using an LLM. It looks clean. The indentation is perfect, and variable names look very smart. But when you look closer, it is just high-speed slop.

AI does not think about tomorrow. It only wants to make the current prompt happy. And the worst part is that AI lies to you. We see new coding tools like Claude Code change a file, break your feature, and then the agent writes in the terminal: "This was probably broken before I started, not my fault." It hallucinates logic and refuses to take responsibility.

When tools move at machine speed but think like a lazy junior intern, human code review is simply not enough. Your eyes get tired. You review 40 files of generated code, your brain goes numb, and you miss a critical security bug on line 450. We cannot rely on humans being careful anymore. We must build automated concrete walls. Machines must check the mistakes of machines. Here is how you build this wall.

## 1. The Linter is Not for Style—It is a Security Guard

In the old days, we used linters to stop fights about spaces and semicolons. Today, the linter stops AI from putting garbage into your master branch. Left alone, AI writes massive nested loops, imports random npm packages that do not exist, and leaves dead code everywhere because it changes its mind halfway through generating.

You must configure your static analysis to maximum strictness. If the linter finds even one bad pattern, the build must die immediately.

- **Node.js & TypeScript:** AI hates complicated types. If a type is hard, it just writes `any` or adds `// @ts-ignore` to make the compiler shut up. You must set `strict: true` and `noImplicitAny: true` in your `tsconfig.json`. In ESLint, make `no-unused-vars` and `no-floating-promises` hard errors. AI always forgets to handle promises or await them properly. This causes silent crashes in production where errors are swallowed. If AI leaves an unused variable, fail the build. Do not let dead code accumulate.
- **React:** AI models do not understand how state changes over time. They write a `useEffect` hook and leave the dependency array empty, or they put the wrong things inside it. This creates infinite loops that freeze the user's browser or stale closures that show old data. You must install `eslint-plugin-react-hooks` and set `exhaustive-deps` as a hard error. If the AI skips a dependency, the build fails. No exceptions.
- **Go (Golang):** Go forces you to check every error explicitly. AI hates this boilerplate because it is lazy. The AI writes `_ = err` to ignore a database failure just to compile the code, or it uses `panic()` instead of returning a proper error. It also forgets to run `defer resp.Body.Close()`, which creates memory leaks. You must run `golangci-lint` with `errcheck` enabled. Also, use `gocyclo` to block functions with too many if statements. If a function has 12 nested conditions, the linter must reject it instantly. Force the AI to break the function down into smaller, readable pieces.

## 2. Tests as a Lie Detector (The /tdd Workflow)

AI is great at writing the "happy path." It writes code for when the database responds in 5 milliseconds and the user enters perfect data. But real software is full of network timeouts, bad inputs, and hacker attacks. AI will confidently ignore security flaws.

Tests are the only way to prove the AI is not lying. But you cannot let the AI grade its own homework.

- **Do not let AI write tests blindly:** If you ask an LLM to write a business function and then say "now write tests for it," it writes useless tests. It will just test its own bugs and say everything is green.
- **Humans must define the test cases:** Before anyone opens an AI chat, the human engineer must write down exactly what to test. You write the rules. What happens if the input string is empty? What happens if someone tries SQL injection? What happens if the ID is a negative number? You must review the tests themselves for quality to ensure they cover these negative scenarios.
- **Use the /tdd approach:** This is a very practical method. It forces the AI to use a strict red-green-refactor loop. You do not write all tests at once. The skill rejects horizontal TDD (writing many tests, then many implementations). Instead, it forces vertical slicing: one behavior at a time. The AI writes one failing test (Red), writes the absolute minimum code to make it pass (Green), and then cleans it up (Refactor).
- **Test through public interfaces:** Good tests read like specifications and describe what the system does from the outside. AI will try to write bad tests that mock internal details or test private methods because it is easier for it. You must enforce that tests verify behavior through public interfaces only, so they survive when the AI refactors the code. The human stays the architect, the AI is just the muscle typing the code.

## 3. Detailed Machine Rules Instead of Vague Feedback

If your team document says "please write clean code and be secure," the AI does not care. It will read it, ignore it, and write a monolithic mess anyway. AI does not understand human intentions. It needs strict, literal, machine-readable constraints.

You must create specific markdown configuration files (like `.cursorrules` or system prompts) inside every repository. You must tell the AI exactly what it cannot do.

- **Write clear architectural boundaries:** Put in the file: "Database operations are strictly forbidden inside HTTP controllers. They must go through the repository layer." If you do not say this, AI will put SQL queries inside your API routes.
- **Write strict security rules:** Put in the file: "Never use string concatenation for SQL queries. Always use prepared statements or the project ORM." Put another rule: "Always check user authorization roles before returning data."
- **Reject locally:** If the AI breaks these rules and generates a huge monolith, the developer must reject the code locally. Force the AI to delete it and try again before opening a pull request. The machine always takes the shortest path; you must put walls to force it to take the safe path.

## 4. The Rigid, Emotionless CI/CD Pipeline

Some developers get lazy. They merge code without a pipeline because "it is just a quick hotfix for staging" or "the AI says it works." In the AI era, skipping the pipeline is project suicide. Your CI/CD must be a cold, rigid wall. It does not have feelings. It just blocks slop.

- **The Pre-PR Rule:** The developer must run all tests, linters, and build commands locally before they ask for a code review. If a Tech Lead opens a PR and sees a red cross from Github Actions or GitLab CI, he closes the tab immediately. Do not waste expensive human time reviewing code that the automated system already calls broken. If the AI broke the build, the developer must read the logs and fix it.
- **Automated Security Scans (SAST/DAST):** AI will happily pull in an old npm package with vulnerabilities because it copied an answer from StackOverflow from 2018. It will write an XSS vulnerability without knowing. Your pipeline must run tools like `npm audit`, `govulncheck`, or SonarQube automatically on every single commit. If a security issue is found, the pipeline stops.
- **Strict Coverage Gates:** AI loves to write hundreds of lines of logic but skips the tests because tests are boring. If a PR brings 200 lines of generated code but zero tests, the code coverage drops. Set your CI/CD to block any PR that lowers project test coverage by even 0.1%. If AI writes new logic, the developer must provide the tests to prove it works.

We are changing from code writers to code editors and supervisors. AI gives you incredible speed, but if you do not have control, speed just means you hit the wall much faster.

Do not trust people to be careful during manual reviews. People get tired, but computers do not get tired. The main idea is this: implement maximum strict checks so AI slop and security issues never reach your main branch. Build a concrete wall of strict linters, human-defined tests with TDD, and a completely rigid CI/CD pipeline. Keep the garbage out of your project.

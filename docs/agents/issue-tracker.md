# Issue tracker: GitHub

Issues and specs live in GitHub Issues for
`master-bogdan/master-bogdan.github.io`. Use the `gh` CLI from this clone.

## Conventions

- Verify the target before the first issue creation in a session:
  `gh repo view --json nameWithOwner`.
- Create an issue: `gh issue create --title "..." --body-file <file>`.
  For multiline bodies, write the exact Markdown to a temporary file.
- Read an issue:
  `gh issue view <number> --json number,title,body,labels,comments`.
- List issues:
  `gh issue list --state open --json number,title,body,labels`.
  Add label filters as needed.
- Comment: `gh issue comment <number> --body-file <file>`.
- Apply or remove labels:
  `gh issue edit <number> --add-label "..."` or `--remove-label "..."`.
  Read `docs/agents/triage-labels.md` for triage role mappings.
- Close: post an explanation, then run `gh issue close <number>`.
  Post explanations separately even when the issue is already closed.
- Use native sub-issues and issue dependencies when available.
  Otherwise, put `Part of #<parent>` and `Blocked by: #<number>` lines
  at the top of child issue bodies. A ticket is unblocked when every
  blocker is closed.

File issues only in this repository. If the resolved target differs,
confirm it with the user before creating an issue.

## Pull requests as a triage surface

**PRs as a request surface: no.**

## Skill terminology

- “Publish to the issue tracker”: create a GitHub issue.
- “Fetch the relevant ticket”: read the GitHub issue and its comments.

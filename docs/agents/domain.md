# Domain Docs

This repository uses a single-context domain layout.

## Before exploring

- Read `GLOSSARY.md` at the repository root.
- Read ADRs in `docs/adr/` that concern the area being explored.

If either is absent, proceed silently. The domain-modeling skill creates
domain documentation when terms or decisions are resolved.

## File structure

- `GLOSSARY.md`: shared domain vocabulary, relationships, and invariants.
- `docs/adr/`: architectural decision records.

## Use the glossary's vocabulary

Use defined domain terms in issue titles, proposals, hypotheses, and
test names. When a needed concept is missing, reconsider the term or
note the gap for domain-modeling.

## Flag ADR conflicts

Explicitly identify proposals that contradict an existing ADR, reference
that ADR, and explain why the decision should be reconsidered.

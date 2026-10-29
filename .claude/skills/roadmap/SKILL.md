---
name: "roadmap"
description: "Run the roadmap-curator agent: empty the idea inbox, reprioritize docs/ideas.md, update the spec queue in docs/roadmap.md, and propose ideas the maintainer has not thought of."
argument-hint: "Optional focus, for example 'only triage the inbox'"
user-invocable: true
disable-model-invocation: true
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Steps

1. Check the working tree. If it has uncommitted changes, stop and ask the maintainer to commit or stash them
   so the curation diff stays clean.
2. Launch the `roadmap-curator` agent with the Agent tool (`subagent_type: "roadmap-curator"`), passing the
   user input as the focus.
3. When it finishes, report the PR link and its short summary: priority changes, items merged, rejected, or
   needing clarification, and the new proposals. Ask the maintainer to answer `## Questions for you` in the PR.

This skill only launches the agent. The rules for curation live in `.claude/agents/roadmap-curator.md` and
the constitution.

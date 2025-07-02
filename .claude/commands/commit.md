---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*), Bash(git diff:*)
description: Create a git commit with an appropriate message based on the changes
---

## Context

- Current git status: !`git status`
- Current git diff (staged and unstaged changes): !`git diff HEAD`
- Current branch: !`git branch --show-current`
- Recent commits: !`git log --oneline -10`

## Your task

Based on the above changes, create a single git commit following these steps:

1. Analyze all staged changes (both previously staged and newly added) and draft a commit message that:
   - Summarizes the nature of the changes (e.g., new feature, enhancement, bug fix, refactoring, test, docs, etc.)
   - Checks for any sensitive information that shouldn't be committed
   - Drafts a concise (1-2 sentences) commit message that focuses on the "why" rather than the "what"
   - Ensures it accurately reflects the changes and their purpose

2. Add relevant untracked files to the staging area if needed.

3. Create the commit with a message ending with:
   🤖 Generated with [Claude Code](https://claude.ai/code)

   Co-Authored-By: Claude <noreply@anthropic.com>

4. Run git status to make sure the commit succeeded.

If the commit fails due to pre-commit hook changes, retry the commit ONCE to include these automated changes. If it fails again, it usually means a pre-commit hook is preventing the commit.
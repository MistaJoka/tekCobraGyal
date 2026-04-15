# Security policy — Python Prep Lab

## Scope

**Python Prep Lab** is a **client-side** Next.js application. Learner progress is stored in the browser (`localStorage` via Zustand). There is **no** built-in authentication or server-side account database in the current design (see [docs/PRD.md](docs/PRD.md)).

## Supported versions

Security fixes are applied to the **latest commit on the default branch** unless a release is tagged for backport (uncommon for this repo).

## Reporting a vulnerability

If you find a security issue (for example XSS, unsafe handling of untrusted input, or a dependency with a practical exploit against this app):

1. **Do not** file a public issue with exploit details.
2. Report **privately**:
   - Prefer **[GitHub Security Advisories](https://docs.github.com/en/code-security/security-advisories)** — *Security → Report a vulnerability* on the repository.
   - If unavailable, use a contact published on the repo **About** page or maintainer email, if listed in [README.md](README.md).

Include:

- Impact summary
- Steps to reproduce (safe proof of concept when possible)
- Affected version or commit range, if known

Maintainers will acknowledge when practical and coordinate fix and disclosure.

## What is in scope

- The Next.js app, client-side storage usage, and bundled dependencies as used in this repository.

## What is out of scope

- Generic upstream bugs without a plausible impact **here** (report to the upstream project).
- Social engineering or physical access to a user’s machine.

## Safe harbor

Good-faith security research that follows this policy will not be met with legal action.

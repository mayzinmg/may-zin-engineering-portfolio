# Vibe-Coding Portfolio Dojo — Day 1

**Date:** 8 September 2026  
**Project:** May Zin Engineering Portfolio  
**Repository:** `may-zin-engineering-portfolio`

## 1. Learning objectives

By the end of this session, I should be able to explain:

- what responsible vibe coding means;
- how human-in-the-loop review differs from blindly accepting AI output;
- why a product brief should exist before implementation;
- why Astro with TypeScript is suitable for a content-oriented portfolio;
- the roles of Node.js, npm, `package.json`, `package-lock.json` and `node_modules`;
- why `.gitignore` is a security and repository-hygiene control;
- how early execution reveals environmental and dependency problems;
- how Git history can demonstrate deliberate AI steering.

---

## 2. What responsible vibe coding means

Vibe coding uses natural-language direction and AI assistance to accelerate software development. It does not remove the engineer's responsibility for requirements, architecture, correctness, security or acceptance.

The working loop for this project is:

```text
Intent → constraints → small generation → inspection → testing → revision
```

AI may propose designs, implementation options and code. The human remains responsible for:

- defining the problem and intended outcome;
- deciding which suggestions to accept or reject;
- limiting project scope;
- reviewing generated changes;
- protecting private or confidential information;
- verifying that the application builds and behaves correctly;
- approving each commit and deployment.

Nobody needs to memorize every syntax detail. A responsible vibe coder must instead understand what a command is intended to change, inspect its effects and know how to verify or reverse the change.

### Human-in-the-loop checkpoints

For this project, a human review occurs before:

1. accepting a technical or design decision;
2. installing a new dependency;
3. committing generated code;
4. publishing personal information;
5. deploying a new version.

The initial AI-generated visual draft was deliberately frozen rather than published. The project restarted from a written brief so that later implementation could be traced to explicit human decisions.

---

## 3. Product direction

The portfolio has two connected outcomes:

### Visitor outcome

Visitors should be able to explore my professional experience, completed projects, ongoing work, learning direction and selected writing in one structured place.

### Learning outcome

The repository should demonstrate how I steer an AI-assisted project through product decisions, architectural choices, security guardrails, incremental implementation and human review.

### Primary audience

The primary audience is fellow technology professionals with whom I can share ideas and exchange feedback. A secondary audience includes anyone seeking a clearer understanding of my professional background, technical interests and current work.

### V1 scope

The first version will allow visitors to:

- explore my professional experience;
- read the scope, tools, decisions and lessons learned from completed projects;
- follow the progress and documentation of ongoing projects;
- access selected writing about data engineering, AI, books, travel and films;
- access clearly identified GitHub and LinkedIn links.

The writing can later be organized into categories such as:

- Engineering and AI;
- Reading Notes;
- Beyond Work.

---

## 4. Initial project guardrails

1. **Privacy:** Do not publish job-search plans, visa information, private contact details or confidential employer information.
2. **Secrets:** Do not store API keys, access tokens, passwords or credentials in the repository or client-side code.
3. **Accuracy:** Do not invent experience, project results, metrics, certifications or project statuses.
4. **Scope control:** Keep V1 static. Do not introduce authentication, a database, a backend, forms or analytics without a documented requirement.
5. **Human review:** Review every AI-generated change before committing it. Keep changes small, understandable and reversible.
6. **Language:** Use British English with Oxford `-ize` spelling consistently, for example `organize` and `familiarize`, while retaining British forms such as `colour`, `centre` and `analyse`.

Reducing unnecessary features also reduces the attack surface. A static V1 has no database, login, server-side secret or user-submitted form to protect.

---

## 5. Architecture decision: frontend stack

The evaluated options were:

| Option | Advantages | Trade-offs |
|---|---|---|
| Plain HTML, CSS and JavaScript | Minimal tooling and runtime complexity | Repeated content becomes harder to maintain as the site grows |
| Astro with TypeScript and ordinary CSS | Static-first, content-oriented and capable of limiting client-side JavaScript | Requires learning Astro's structure and build process |
| Next.js with React | Broad ecosystem and strong application capabilities | Adds more application complexity than V1 currently requires |

### Decision

Astro with TypeScript and ordinary CSS was selected as the balanced option. It supports learning relevant frontend principles while keeping the project's main focus on AI-assisted development, security guardrails and human-in-the-loop oversight.

### Consequences

- The portfolio can be generated as a static website.
- Project information and articles can be maintained as structured content.
- TypeScript provides type checking during development.
- Ordinary CSS keeps the visual rules inspectable.
- The project accepts the need to learn Astro's basic structure and build process.
- Dynamic features may require deliberate architectural changes in later versions.

An Architecture Decision Record does not prove that a choice is perfect. It records the context, considered options, selected decision and accepted consequences.

---

## 6. Node.js and npm mental model

| Item | Purpose |
|---|---|
| Node.js | Runtime used to execute JavaScript development tools |
| npm | Package manager included with Node.js |
| `package.json` | Declares project metadata, commands and dependencies |
| `package-lock.json` | Records the exact resolved dependency tree for reproducible installation |
| `node_modules/` | Contains locally installed third-party packages |
| `npm install astro` | Installs Astro and updates the package manifest and lock file |
| `npm ci` | Recreates dependencies exactly from the lock file |
| `npm run dev` | Runs the `dev` command declared in `package.json` |
| `npm run build` | Generates the production-ready static output |

The relationship is:

```text
package.json
    ↓ npm install or npm ci
package-lock.json + node_modules/
```

The dependency declaration:

```json
"astro": "^7.3.1"
```

allows compatible releases within the same major version. The lock file records the precise versions that were resolved for this installation.

The portfolio is marked as a private npm package:

```json
"private": true
```

This prevents accidental publication to the npm registry. It does not control whether the GitHub repository or website is public.

---

## 7. Repository hygiene and `.gitignore`

The initial `git status --short` displayed:

```text
?? node_modules/
```

This revealed that `.gitignore` was missing. The following rules were added:

```gitignore
# Dependencies
node_modules/

# Astro-generated files
dist/
.astro/

# Local environment files
.env
.env.*
!.env.example
```

Afterward, `node_modules/` disappeared from Git status while remaining available locally.

### Why generated files are excluded

- `node_modules/` can be recreated using the lock file.
- `dist/` is generated by the production build.
- `.astro/` contains framework-generated working files.
- `.env` files may contain local configuration or secrets.
- `.env.example` may be committed only as a safe template containing placeholder names rather than real secrets.

Ignoring a secret after it has already been committed does not remove it from Git history. Therefore, ignore rules and secret review must exist before the first implementation commit.

---

## 8. Runtime compatibility incident

The first attempt to run Astro produced:

```text
Node.js v20.5.0 is not supported by Astro.
Please upgrade Node.js to a supported version: ">=22.12.0"
```

The installed Astro version required a newer Node.js runtime. Node was upgraded to:

```text
v24.20.0
```

After a major runtime upgrade, the locally generated dependency directory was rebuilt:

```powershell
Remove-Item -Recurse -Force .\node_modules
npm ci
```

This incident demonstrates several principles:

1. Successful dependency installation does not guarantee runtime compatibility.
2. Toolchain requirements should be checked early.
3. A minimal executable slice reveals environmental problems before significant implementation begins.
4. A field such as `engines.node` documents a requirement; it does not install or upgrade Node.js.
5. Generated dependency directories can be deleted and recreated from the lock file.

The Node requirement should be documented in `package.json`:

```json
"engines": {
  "node": ">=22.12.0"
}
```

---

## 9. Minimum Astro project structure

The planned foundation is:

```text
may-zin-engineering-portfolio/
├── docs/
├── src/
│   └── pages/
│       └── index.astro
├── .gitignore
├── astro.config.mjs
├── package.json
├── package-lock.json
└── tsconfig.json
```

Astro uses file-based routing:

```text
src/pages/index.astro → /
src/pages/about.astro → /about
```

The first page should remain intentionally small. Its purpose is to verify configuration, routing, rendering and the local development server before design complexity is introduced.

---

## 10. Git strategy

Git history is part of the project's evidence. Commits should communicate how the project evolved rather than placing documentation and implementation into one unexplained change.

Suggested initial commits:

```text
docs: define portfolio purpose and frontend decision
feat: initialize Astro portfolio foundation
```

Before committing implementation:

```powershell
npm run build
git status --short
git diff --cached --stat
git diff --cached --check
```

The review verifies that:

- the production build succeeds;
- ignored files are not staged;
- the staged scope is understandable;
- basic whitespace errors are absent;
- the change matches the intended increment.

---

## 11. Roadmap and estimated effort

| Phase | Deliverable | Estimated focused time |
|---|---|---:|
| Foundation | Product brief, stack decision, Astro, Git guardrails and working build | Completed in Day 1 |
| Visual direction | References, art-direction constraints, colour, typography and spacing tokens | 2–3 hours |
| Site shell | Shared layout, navigation, metadata and footer | 2–3 hours |
| Homepage | Introduction, current focus and featured work | 2–3 hours |
| Projects | Structured data, status cards and project-detail pages | 4–6 hours |
| Writing | Medium categories, article cards and safe external links | 2–3 hours |
| About and connections | Experience, learning direction, GitHub and LinkedIn | 2 hours |
| Quality gate | Mobile layout, accessibility, security, performance and content review | 3–4 hours |
| Deployment | Production build, automated deployment and final verification | 2–3 hours |

Expected remaining effort:

- Presentable shell: approximately 6–8 focused hours.
- Usable V1 with real content: approximately 16–22 focused hours.
- Documented and polished case study: approximately 24–32 total project hours.

---

## 12. Review questions

1. What responsibilities remain with the human when AI generates the implementation?
2. Why is `package-lock.json` committed while `node_modules/` is ignored?
3. What does `"private": true` protect against?
4. Why did adding `engines.node` not upgrade Node.js?
5. Why was the runtime compatibility problem useful to discover on Day 1?
6. What private information is prohibited by the project's guardrails?
7. Why is Astro a better fit for this V1 than a complex application framework?
8. What should be checked before accepting an AI-generated command?

## 13. Day 1 checkpoint

By the end of Day 1, the project has:

- a defined purpose and audience;
- a deliberately limited V1 scope;
- privacy, accuracy and security guardrails;
- a documented frontend-stack decision;
- an initialized npm and Astro toolchain;
- a corrected Node.js runtime;
- a protected Git boundary for generated files and secrets;
- a roadmap for the next implementation phases.

The next session begins with visual direction and prompt constraints, followed by the shared site shell.

# Frontend Stack Decision
| Option | Advantages | Trade-offs |
|---|---|---|
| Plain HTML, CSS and JavaScript | Simple and lightweight | Harder to maintain as content grows |
| Astro and TypeScript | Content-oriented and minimal client-side JavaScript | Requires learning Astro conventions |
| Next.js and React | Powerful ecosystem | More complexity than V1 requires |

## Decision

Of the options suggested by AI, I chose Astro with TypeScript and ordinary CSS because it offers a balanced approach. It allows me to learn relevant frontend development principles while keeping my primary focus on AI-assisted development, security guardrails and human-in-the-loop oversight.

## Consequences

- The portfolio can be deployed as a static website with minimal browser-side JavaScript.
- Project information and articles can be maintained as structured content.
- TypeScript will provide type checking during development.
- The visual system will remain inspectable through ordinary CSS.
- We accept the need to learn Astro's basic project structure and build process.
- Dynamic features will require deliberate architectural changes in future versions.
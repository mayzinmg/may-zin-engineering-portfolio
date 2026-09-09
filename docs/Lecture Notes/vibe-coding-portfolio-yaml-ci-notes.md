# YAML and GitHub Actions CI — Learning Notes

## Learning objective

Understand enough YAML and GitHub Actions syntax to review an AI-generated CI workflow safely. The goal is not to memorise every option. The goal is to recognise what triggers the workflow, what permissions it has, what external actions it uses and what commands it executes.

## 1. What is YAML?

YAML is a human-readable format used for structured configuration. GitHub Actions workflow files use the extensions `.yml` or `.yaml`.

### Key and value

```yaml
name: Continuous Integration
```

- `name` is the key.
- `Continuous Integration` is the value.
- A colon separates a key from its value.

### Nested values

```yaml
permissions:
  contents: read
```

Indentation shows that `contents` belongs inside `permissions`.

Equivalent JSON:

```json
{
  "permissions": {
    "contents": "read"
  }
}
```

### Lists

```yaml
branches:
  - main
```

The hyphen introduces one list item. More branches could be added with more hyphens.

```yaml
branches:
  - main
  - development
```

### Comments

```yaml
# This workflow validates the Astro production build.
```

Text after `#` is a comment and is not executed.

### Essential formatting rules

- Use spaces for indentation, not tabs.
- Keep indentation consistent; two spaces is common.
- Use `key: value` for a key-value pair.
- Use `-` for an item in a list.
- Incorrect indentation can change the meaning of the workflow or make it invalid.

## 2. CI and CD

### Continuous Integration (CI)

CI automatically validates changes. For this Astro portfolio, CI will:

1. obtain the repository code;
2. prepare Node.js;
3. install the locked dependencies;
4. run the production build;
5. report success or failure.

### Continuous Delivery (CD)

CD takes a validated build and makes it available in a target environment. A later workflow will deploy the portfolio to Azure Static Web Apps only after validation succeeds.

Keeping CI and deployment concepts separate makes the permissions and failure boundaries easier to understand.

## 3. Portfolio CI workflow

File location:

```text
.github/workflows/ci.yml
```

Workflow:

```yaml
name: Continuous Integration

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

permissions:
  contents: read

jobs:
  build:
    name: Build Astro site
    runs-on: ubuntu-latest
    timeout-minutes: 10

    steps:
      - name: Check out repository
        uses: actions/checkout@v7
        with:
          persist-credentials: false

      - name: Set up Node.js
        uses: actions/setup-node@v7
        with:
          node-version: 24
          cache: npm

      - name: Install locked dependencies
        run: npm ci

      - name: Build site
        run: npm run build
```

## 4. Reading the workflow

### `name`

```yaml
name: Continuous Integration
```

The human-readable workflow name displayed on GitHub's Actions page.

### `on`

```yaml
on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
```

`on` defines the events that start the workflow:

- a commit is pushed to `main`; or
- a pull request proposes a change to `main`.

### `permissions`

```yaml
permissions:
  contents: read
```

The workflow can read repository contents but is not granted write access. This applies the principle of least privilege: automation should receive only the permissions necessary for its task.

### `jobs`

```yaml
jobs:
  build:
```

A workflow can contain one or more jobs. This workflow has one job with the internal identifier `build`.

### Runner

```yaml
runs-on: ubuntu-latest
```

GitHub creates a temporary Ubuntu Linux runner. It starts clean, executes the workflow steps, reports the result and is then discarded.

### Timeout

```yaml
timeout-minutes: 10
```

The job is stopped if it runs longer than ten minutes. This limits wasted runner time when a process hangs.

### Steps

```yaml
steps:
  - name: Check out repository
```

`steps` is a list. Each hyphen begins another step, and the steps execute in order.

### `uses`

```yaml
uses: actions/checkout@v7
```

`uses` invokes a reusable GitHub Action. The general format is:

```text
owner/repository@version
```

Before accepting an AI-generated action, verify its owner, purpose and version.

### `with`

```yaml
with:
  node-version: 24
  cache: npm
```

`with` supplies configuration values to the action immediately above it.

### `run`

```yaml
run: npm ci
```

`run` executes a shell command directly on the runner.

The important difference is:

- `uses` invokes a reusable action;
- `run` executes a command.

### `npm ci`

```yaml
run: npm ci
```

`npm ci` installs the dependency versions recorded in `package-lock.json`. It fails if `package.json` and the lock file disagree. This supports reproducible automated builds.

### Production build

```yaml
run: npm run build
```

This invokes the `build` script in `package.json`, which runs `astro build`. If Astro cannot generate the production site, the job fails.

## 5. Execution flow

```text
Push or pull request targeting main
              ↓
Create temporary Ubuntu runner
              ↓
Read repository contents
              ↓
Install Node.js 24
              ↓
Install locked npm dependencies
              ↓
Build the Astro production site
              ↓
Report a green success or red failure
```

## 6. Security guardrails

An automated workflow is executable code, even though it is written in YAML.

Before approving a workflow, ask:

1. What events trigger it?
2. What repository permissions does it receive?
3. Which external actions does it invoke?
4. What shell commands does it execute?
5. Does it use secrets?
6. Can it write to the repository?
7. Can it deploy or modify external resources?
8. Does it have a sensible timeout?

Additional rules:

- Never paste tokens, passwords or API keys directly into workflow YAML.
- Store required credentials in GitHub Actions Secrets.
- Never print secrets in logs.
- Prefer official or carefully reviewed actions.
- Use least-privilege permissions.
- Commit `package-lock.json` for reproducibility and dependency review.
- Review changes to `.github/workflows/` especially carefully.
- Avoid dangerous triggers such as `pull_request_target` until their security model is understood.
- Treat deployment as a separate, higher-authority operation.

The current CI workflow has no Azure credentials. It can read the repository, install packages and build the site, but it cannot deploy or modify Azure resources.

## 7. Common mistakes

### Incorrect indentation

Incorrect:

```yaml
steps:
- name: Build
 run: npm run build
```

Correct:

```yaml
steps:
  - name: Build
    run: npm run build
```

### Using tabs

YAML indentation should use spaces. Editors can be configured to insert spaces when the Tab key is pressed.

### Using `npm install` in reproducible CI

For this repository, prefer:

```yaml
run: npm ci
```

This respects the committed lock file exactly.

### Giving excessive permissions

Avoid write access when the workflow only needs to build:

```yaml
permissions:
  contents: read
```

### Copying unknown actions

Do not accept an unfamiliar `uses:` entry merely because AI generated it. Verify the owner and understand what the action does.

## 8. Debugging checklist

If the workflow fails:

1. Open the repository's **Actions** tab.
2. Select the failed workflow run.
3. Identify the first failed step.
4. Read the error from that step, not only the final summary.
5. Reproduce the command locally when possible.
6. Check that the CI Node version satisfies Astro's requirement.
7. Check that `package.json` and `package-lock.json` are synchronised.
8. Fix the root cause locally, commit it and push again.

## 9. Knowledge check

1. What does indentation represent in YAML?
2. What is the difference between `uses:` and `run:`?
3. Why does this workflow use `npm ci` instead of `npm install`?
4. What does `contents: read` prevent the workflow from doing?
5. Why is a timeout useful?
6. Which two repository events trigger this workflow?
7. Can the current workflow deploy to Azure? Why or why not?
8. What should you inspect before accepting an unfamiliar action?

## 10. Core lesson

Responsible vibe coding does not require memorising all YAML syntax. It requires understanding an automation file's authority and reviewing its important boundaries before allowing it to run.

The human remains responsible for deciding:

- when automation runs;
- what it may access;
- which commands it executes;
- whether secrets are involved; and
- whether a successful build is allowed to deploy.

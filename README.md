
![npm](https://img.shields.io/npm/v/@uatthaphon/chatpack)
![CI](https://github.com/uatthaphon/chatpack/actions/workflows/test.yml/badge.svg)
![Coverage](https://img.shields.io/codecov/c/github/uatthaphon/chatpack)
![License](https://img.shields.io/npm/l/@uatthaphon/chatpack)
![Node](https://img.shields.io/node/v/@uatthaphon/chatpack)

# 🧠 chatpack


Pack only what matters. Zip your code context for smarter AI coding with ChatGPT or any LLM.

## 📦 NPM Package

Published under a scoped package 👉 [`@uatthaphon/chatpack`](https://www.npmjs.com/package/@uatthaphon/chatpack)

Install globally:
```bash
npm install -g @uatthaphon/chatpack
```

---

## 📚 Table of Contents

- [🧠 chatpack](#-chatpack)
  - [📦 NPM Package](#-npm-package)
  - [📚 Table of Contents](#-table-of-contents)
  - [✨ What is chatpack?](#-what-is-chatpack)
  - [📦 Installation](#-installation)
  - [🛠️ Usage](#️-usage)
    - [1. Zip your current project](#1-zip-your-current-project)
    - [2. Create a context file and ignore rules](#2-create-a-context-file-and-ignore-rules)
    - [3. Add global ignore (optional)](#3-add-global-ignore-optional)
  - [🔐 Privacy \& Client Concerns](#-privacy--client-concerns)
    - [✅ Best Practices](#-best-practices)
  - [❓ Common Client Question](#-common-client-question)
  - [📁 .chatpackignore](#-chatpackignore)
  - [🧰 Development](#-development)
    - [Project Structure](#project-structure)
    - [Run CLI Locally (without publishing)](#run-cli-locally-without-publishing)
    - [Development Tips](#development-tips)
  - [🧪 Testing \& Coverage](#-testing--coverage)
    - [Tooling](#tooling)
  - [🧪 Roadmap](#-roadmap)
  - [📝 License](#-license)
  - [💡 Author](#-author)

## ✨ What is chatpack?

`chatpack` is a CLI tool that helps developers package only the relevant parts of their codebase — skipping `node_modules`, `dist`, test artifacts, etc. — into a zip file. This helps you share context more effectively with ChatGPT, Claude, or other AI coding assistants.

You can also generate a `CHATPACK.md` file to describe your project and guide AI interaction.

---

## 📦 Installation

```
npm install -g chatpack
```

---

## 🛠️ Usage

### 1. Zip your current project

```
chatpack zip
```

Creates `your-folder-context.zip` in the current directory, respecting `.chatpackignore` if present.

---

### 2. Create a context file and ignore rules

```
chatpack create
```

Creates both `CHATPACK.md` and `.chatpackignore` in your current directory (if they do not already exist). These help LLMs understand your project and avoid zipping unnecessary files.

Options:

```
chatpack create --only-md       # Create only CHATPACK.md
chatpack create --only-ignore   # Create only .chatpackignore
chatpack create --file NAME.md  # Custom file name instead of CHATPACK.md
```

---

### 3. Add global ignore (optional)

To avoid accidentally committing `CHATPACK.md`, zip files, etc.:

```
chatpack ignore --global
```

Adds patterns like `**/CHATPACK.md`, `**/*.zip`, `**/.chatpackignore` to your global `.gitignore`.

---

## 🔐 Privacy & Client Concerns

If you are working with sensitive or client-owned code, Chatpack helps you maintain strict control over what is shared with AI assistants.

### ✅ Best Practices

- **Mask sensitive data**: Never include `.env`, credentials, customer data, or private keys. These are excluded by default in `.chatpackignore`.
- **Avoid uploading full repos**: Only zip the relevant services, features, or modules. Use `chatpack create` and `chatpack zip` with scoped folders if needed.
- **Use context-driven templates**: `CHATPACK.md` helps describe the project clearly without leaking implementation details. You control what is included.

---

## ❓ Common Client Question

> **Q: "Is it safe to use ChatGPT on our project code?"**

**A:** _Yes. I use a tool called Chatpack that zips only the essential, non-sensitive parts of the code. It excludes things like production configs, customer data, and private infrastructure. I never upload the full repo or any secrets. Everything is filtered and anonymized to maintain confidentiality.

---

## 📁 .chatpackignore

You can exclude specific files/folders from the zip by creating a `.chatpackignore` file in your project root.

Example:

```
node_modules/
dist/
coverage/
.env*
*.log
```

## 🧰 Development

### Project Structure

```
src/
├── bin/         # CLI entry point
├── lib/         # Core logic: zip, create, ignore
├── __tests__/   # Unit tests
├── scripts/     # Build helpers (e.g. postbuild)
templates/       # Default content for CHATPACK.md
```

### Run CLI Locally (without publishing)

After building the CLI:
```
npm run build
npm link
```

This makes the `chatpack` command available globally on your machine, pointing to your local build.

To verify it's linked:
```
which chatpack
```

To remove the global link:
```
npm unlink
```

If you get a file already exists error, you can force the link:
```
npm link --force
```

Or clean up a previous install:
```
npm unlink -g chatpack
```

### Development Tips

- Modify files in `src/`, then run `npm run build` to regenerate `dist/`.
- You can test the built CLI with `node dist/bin/chatpack.js` before linking.

---

## 🧪 Testing & Coverage

Run tests with coverage:

```
npm test
```

Test output includes a coverage summary. The `/coverage` folder is automatically excluded from version control.


### Tooling

- ESLint with Airbnb rules: `npm run lint`
- Husky pre-commit hook to run linter automatically
- Jest for testing and code coverage

## 🧪 Roadmap

- [x] Basic zip support
- [x] Context file generator
- [x] Global ignore support
- [ ] Interactive templates
- [ ] Integration with VS Code extension

---

## 📝 License

MIT

---

## 💡 Author

Developed by [Atthaphon Urairat](https://github.com/uatthaphon)
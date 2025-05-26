# 🧠 chatpack


Pack only what matters. Zip your code context for smarter AI coding with ChatGPT or any LLM.

---

## 📚 Table of Contents

- [🧠 chatpack](#-chatpack)
  - [📚 Table of Contents](#-table-of-contents)
  - [✨ What is chatpack?](#-what-is-chatpack)
  - [📦 Installation](#-installation)
  - [🛠️ Usage](#️-usage)
    - [1. Zip your current project](#1-zip-your-current-project)
    - [2. Create a context file and ignore rules](#2-create-a-context-file-and-ignore-rules)
    - [3. Add global ignore (optional)](#3-add-global-ignore-optional)
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

After building:
```
npm run build
npm link
```

Then use `chatpack` from anywhere in your terminal.

To unlink:
```
npm unlink
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
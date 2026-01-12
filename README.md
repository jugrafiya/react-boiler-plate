# Formatting for Frontend Applications

This document describes how to set up **Prettier** for consistent code formatting across frontend applications such as **React**, **Next.js**, and other **JavaScript/TypeScript**-based projects.

---

## Required Extension

### Prettier – Code Formatter

Prettier is an opinionated code formatter that enforces a consistent coding style across your project. It supports:

- JavaScript / TypeScript
- JSX / TSX
- HTML
- CSS / SCSS
- JSON / Markdown

Using Prettier helps teams avoid formatting debates and keeps the codebase clean and readable.

---

## Steps to Add Formatting in Frontend Applications

### 1. Install Prettier

Install Prettier as a development dependency:

npm install -D prettier

---

### 2. Enable Format on Save in VS Code

Create or update a `.vscode/settings.json` file in the root of your project. This ensures files are automatically formatted when saved.

{
"editor.formatOnSave": true,
"editor.defaultFormatter": "esbenp.prettier-vscode",
"editor.codeActionsOnSave": {
"source.fixAll.eslint": "explicit"
},
"[javascript]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[javascriptreact]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[typescript]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[typescriptreact]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
}
}

> 💡 Make sure the **Prettier – Code Formatter** extension is installed in VS Code.

---

### 3. Create a Prettier Configuration File

Create a `.prettierrc` file in the root directory to define your formatting rules:

{
"semi": true,
"singleQuote": true,
"jsxSingleQuote": false,
"trailingComma": "es5",
"printWidth": 100,
"tabWidth": 2,
"useTabs": false,
"bracketSpacing": true,
"arrowParens": "always",
"endOfLine": "lf"
}

These rules ensure consistent formatting across all supported file types.

---

### 4. Create a `.prettierignore` File

This file prevents Prettier from formatting generated files, dependencies, and configuration files that should not be modified.

# Ignore build artifacts

build
coverage
dist
out
storybook-static
.next

# Ignore dependencies

node_modules

# Ignore lock and configuration files

package-lock.json
yarn.lock
pnpm-lock.yaml
package.json

# Ignore specific configuration files

.eslintrc.js
.prettierrc.js

---

## Summary

- ✅ Prettier enforces consistent formatting across JavaScript, TypeScript, JSX, TSX, HTML, and CSS files
- 💾 Formatting is automatically applied on file save
- 🤝 Configuration is centralized and can be shared across the team
- 🚫 Ignored files prevent accidental formatting of generated or sensitive files

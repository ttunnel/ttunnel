# Contributing

You are considering contributing to ttunnel. I thank you for this 🙏.

Any contributions you make are **greatly appreciated**. It can be anything from typo fixes to new features.

## Get started

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your
   own GitHub account and then
   [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device.

2. Create a new branch:

   ```sh
   git checkout -b MY_BRANCH_NAME
   ```

3. Install dependencies

   ```sh
   cd client
   pnpm i
   ```

4. Start

   ```sh
   pnpm watch
   ```

## Good Issue Descriptions
When creating an issue, include clear steps to reproduce in addition to
- Your Operating System
- Clear steps to reproduce the issue. Making a repo for reproducing is welcome

## Coding standards

### Functional Programming
TTunnel uses functional programming. So its better to use functions, not classes.

### Single Responsibility Principle.
Functions should do one thing. If they do more than one thing, they should be split into separate functions.

### Return early with Guard Clauses
Functions should return as early as possible.

### Perfer async/await over callbacks
Callbacks can get messy, so wherever possible use async/await instead.

### ES6 Modules
Wherever possible, use ES6 modules over commonjs ones, even if sometimes commonjs modules are unavoidable.
# Paymi

Budgets? Assets? Who knows, but it's a 5 letter name with wordplay so it's definitely a tech product.

## Project Setup

### Node

This project uses [Node.js v22.5.1](https://nodejs.org/en). To set your local version of Node, run the following command.

```bash
nvm use
```

### pnpm

This project uses [pnpm](https://pnpm.io/) for workspace and dependency management. In this project, pnpm is managed via [corepack](https://nodejs.org/api/corepack.html). To enable corepack, run the following command.

```bash
corepack enable
```

Once corepack is enabled, run the following command to initialize the workspace and install all of its dependencies.

```bash
pnpm install
```

### Supabase

This project uses [Supabase](https://supabase.com/) to manage common backend services such as authentication and database management.

To setup and run Supabase, follow the [@paymi/supbase](./services/supabase/README.md) setup guide.

### Environment variables

Create a `.env` file to store environment variables that will be passed to services and applications.

```bash
touch .env
```

Paste the `.env.sample` file into your `.env` file and update the values accordingly.

> [!TIP]  
> You'll notice that the `.env.sample` file is separated into `@paymi` projects existing in the repository.
>
> Refer to a project's `README.md` file for detailed information on how to populate its section of the `.env` file.

# @paymi/supabase

This package contains the Paymi [Supabase](https://supabase.com/) service.

> [!IMPORTANT]  
> Before completing the steps in this setup guide, ensure that you've completed the project setup found in the main [README](../../README.md) file.

## Setup

### Docker

Supabase is run locally using [Docker](https://www.docker.com/). If you don't have Docker installed, you can find installation help [here](https://www.docker.com/get-started/).

### Supabase CLI

In order to control Supabase, you'll need to download the [Supabase CLI](https://supabase.com/docs/guides/cli/getting-started#installing-the-supabase-cli). This will allow the configured `pnpm` scripts to start and stop the Supabase stack.

> [!TIP]  
> For a full list of Supase CLI commands, run the following
>
> ```bash
> supabase --help
> ```

## Running Supabase

In order to start Supabase, run the following command.

```bash
pnpm dev:supabase:start
```

To stop Supabase, run the following command.

```bash
pnpm dev:supabase:stop
```

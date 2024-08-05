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

### Environment variables

This project uses Google OAuth for user authentication. Supabase relies on the following environment variables in order for Google OAuth to work as expected:

`SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID`  
`SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_SECRET`  
`SUPABASE_AUTH_SERVER_REDIRECT_URL`  
`SUPABASE_WEB_APPLICATION_BASE_URL`  
`SUPABASE_WEB_APPLICATION_REDIRECT_URL`

#### Google setup

Follow the steps outlined in [Supabase – Login with Google](https://supabase.com/docs/guides/auth/social-login/auth-google?queryGroups=environment&environment=server&queryGroups=framework&framework=remix).

> [!NOTE]
> In Google Cloud, you'll be asked to add 'Authorized JavaScript origins' and 'Authorized redirect URIs'.
>
> Add the value of `SUPABASE_WEB_APPLICATION_BASE_URL` as a record under 'Authorized Javascript origins'.
>
> Add the value of `SUPABASE_AUTH_SERVER_REDIRECT_URL` as a record under
> 'Authorized redirect URIs'. This value is the Supabase endpoint that Google will redirect to after authentication.

## Running Supabase

In order to start Supabase, run the following command.

```bash
pnpm dev:supabase:start
```

To stop Supabase, run the following command.

```bash
pnpm dev:supabase:stop
```

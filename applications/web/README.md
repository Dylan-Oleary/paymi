# @paymi/web

This package contains the Paymi web application. This application uses [Remix](https://remix.run/) and [TailwindCSS](https://tailwindcss.com/).

## Setup

### Environment variables

For environment variables prefixed with `SUPBASE_`, refer to the output of the command `pnpm dev:supabase:start`.

```bash
// pnpm dev:supabase:start
Started supabase local development setup.

API URL: http://127.0.0.1:54321
GraphQL URL: http://127.0.0.1:54321/graphql/v1
S3 Storage URL: http://127.0.0.1:54321/storage/v1/s3
DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
Studio URL: http://127.0.0.1:54323
Inbucket URL: http://127.0.0.1:54324
JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
anon key: secret-key
service_role key: secret-key
S3 Access Key: abcdefg
S3 Secret Key: 123456789
S3 Region: local
```

In your `.env` file, use the following values from the Supabase output.

```bash
SUPABASE_ANON_KEY=anon key (Output -> anon key)
SUPABASE_URL=API URL (Output -> API_URL)
```

## Running the application

To start the project in development mode, run the following commands after starting Supabase.

```bash
pnpm dev:web
```

This is a Next.js frontend for the Start Up project. The repository includes a lightweight Docker setup used for local development and to build images for deployment.

## Quick start (local development)

1. Copy the example env files and fill values:

```powershell
cp .env.example .env
cp project/.env.example project/.env
```

2. Install node dependencies and start dev server (optional if you prefer Docker):

```powershell
npm install
npm run dev
```

Open http://localhost:3000 to view the app.

## Docker (recommended for parity with production)

The repo contains a minimal `docker-compose.yml` that runs the app service. This is used for local builds and can be extended for staging/production.

Available compose variants (if you have separate files):
- `docker-compose-stg.yml` (staging) — not present by default
- `docker-compose-prod.yml` (production) — not present by default

Use the provided `docker-compose.yml` for local runs:

```powershell
# build and run in background
docker-compose up -d --build

# view logs
docker-compose logs -f

# stop
docker-compose down
```

For staging/production, if you have `docker-compose-stg.yml` or `docker-compose-prod.yml`, run:

```powershell
docker-compose -f docker-compose-stg.yml up -d --build
# or
docker-compose -f docker-compose-prod.yml up -d --build
```

If those files are not present, create them as overrides that reference the base `docker-compose.yml` and set environment variables accordingly.

## Environment variables

Two `.env` files are expected:

- Root `.env` — controls Docker/Next public variables (see `.env.example`)
- `project/.env` — server-side variables and secrets (see `project/.env.example`)

Danger: Do NOT commit real secrets to Git. Use CI/CD secret managers or `.gitignore` to prevent leakage.

## Build / Production notes

This repository is the Next.js frontend only. The original Laravel app referenced in deployment notes is a separate backend project. If you need the Laravel backend, you'll need that repository and its `project/.env` values configured.

If you do have the Laravel backend inside `project/` and Docker image tooling, the README in your original deployment instructions is useful — generate app keys, run migrations and seeders inside the backend container as described there.

## Troubleshooting

- Ports: ensure `COMPOSE_WEBSERVER_PORT` in `.env` is free.
- Missing compose files: if `docker-compose-stg.yml` or `docker-compose-prod.yml` are referenced by your deployment pipeline but not in this repo, ask your Ops/DevOps for those files or create them as environment-specific overrides.

## Next steps I can help with

- Create `docker-compose-stg.yml` and `docker-compose-prod.yml` stubs that set recommended environment variables.
- Walk you through running Docker on Windows PowerShell and checking logs.
- Help wire up GitHub Actions or another CI to build images and deploy.

If you'd like to run the full stack locally (frontend + Laravel backend + MariaDB + Redis + Elasticsearch), follow the steps below.

Full-stack dev using `docker-compose.dev.yml` (local)

1. Place your Laravel backend code in `./backend/` (this repo currently doesn't include Laravel source). The structure should include `artisan`, `composer.json`, etc.

2. Copy env examples:

```powershell
cp .env.example .env
cp project/.env.example project/.env
# Edit project/.env to point DB/Redis/ELASTIC to the service hostnames (db, redis, elastic)
```

3. Start the full stack:

```powershell
docker-compose -f docker-compose.dev.yml up -d --build
docker-compose -f docker-compose.dev.yml logs -f
```

4. Run backend setup (inside backend container) — examples:

```powershell
.\scripts\run-artisan.ps1 -Command "key:generate"
.\scripts\run-artisan.ps1 -Command "migrate --force"
.\scripts\run-artisan.ps1 -Command "db:seed --class=AdministratorSeeder"
```

5. Open the frontend at http://localhost:3000 and the Laravel backend (if using artisan serve) at http://localhost:8000

Notes about Elasticsearch on Windows:
- Elasticsearch requires increased virtual memory and may have additional requirements on Windows. For local development it's often easier to run Elasticsearch in a small VM or use a hosted dev cluster. The compose file sets ES to single-node and reduced JVM heap.

Security and performance:
- These dev compose files are intended for development only. For production you should use a hardened Elasticsearch image, secure network rules, and externalized secrets.

If you want, I can scaffold a simple `backend` starter (Laravel project skeleton) in `./backend/` so you can start immediately. Do you want me to create that skeleton now?

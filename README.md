# Interview Starter

A self-contained Laravel + React/MUI starter repo for interview candidates.

**Stack:** PHP 8.4 · Laravel 13 · MySQL 8 · React 19 · MUI 9 · Vite 8 · React Query 5 · React Router 7

# Jordan's Notes

### Chosen Idea: Staff Idea Board

Credit unions run on cooperative principles; member and staff voice matters. Build an internal idea submission board where staff can post improvement suggestions (process, product, member experience), other staff can upvote or comment, and leadership can update the status (Under Review, Planned, Implemented, Declined).

### Key feature / functionality

### Outstanding Work

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) with Compose v2
- Ports **8000** (app), **8080** (Adminer), **5173** (Vite), and **13306** (MySQL) must be available on your machine

## Setup

```bash
cp .env.example .env
docker compose up -d
```

That's it. The `php` container will automatically:

1. Run `composer install`
2. Run migrations
3. Seed the database with example data

Wait about 10–15 seconds on first boot for MySQL to initialize and migrations to run.

## Service URLs

| Service          | URL                   |
| ---------------- | --------------------- |
| App              | http://localhost:8000 |
| Adminer (DB GUI) | http://localhost:8080 |

**Adminer credentials:**

- Server: `mysql`
- Username: `interview`
- Password: `secret`
- Database: `interview`

## Frontend

The React app is served by Vite with HMR. It loads automatically when you visit http://localhost:8000. The `node` container runs Vite in the background — changes to files in `resources/js/react/` will hot-reload in the browser.

## Useful Commands

```bash
# Tail all container logs
docker compose logs -f

# Run artisan commands
docker compose exec php php artisan <command>

# Generate a new migration
docker compose exec php php artisan make:migration create_things_table

# Open a shell in the PHP container
docker compose exec php bash

# Reset the database
docker compose exec php php artisan migrate:fresh --seed

# Stop everything
docker compose down

# Stop and remove the database volume (full reset)
docker compose down -v

# Lint JS with Biome
docker compose exec node sh -c "cd /app && npm run lint"

# Lint + format JS with Biome
docker compose exec node sh -c "cd /app && npm run check"
```

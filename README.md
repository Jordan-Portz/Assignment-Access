# Interview Starter

A self-contained Laravel + React/MUI starter repo for interview candidates.

**Stack:** PHP 8.4 · Laravel 13 · MySQL 8 · React 19 · MUI 9 · Vite 8 · React Query 5 · React Router 7

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

> **Note:** MySQL is exposed on host port `13306` (not `3306`) to avoid conflicts. If connecting with an external client use `localhost:13306`.

## API

The example scaffold exposes a full CRUD API for `Task` resources:

| Method | Endpoint          | Description    |
| ------ | ----------------- | -------------- |
| GET    | `/api/tasks`      | List all tasks |
| POST   | `/api/tasks`      | Create a task  |
| GET    | `/api/tasks/{id}` | Get a task     |
| PATCH  | `/api/tasks/{id}` | Update a task  |
| DELETE | `/api/tasks/{id}` | Delete a task  |

A task has `title` (string, required), `description` (text, optional), and `status` (`todo` / `in_progress` / `done`).

## Frontend

The React app is served by Vite with HMR. It loads automatically when you visit http://localhost:8000. The `node` container runs Vite in the background — changes to files in `resources/js/react/` will hot-reload in the browser.

## Project Structure

```
app/
  Enums/TaskStatus.php          # Status enum (todo, in_progress, done)
  Http/
    Controllers/Api/
      TaskController.php        # CRUD endpoints
    Requests/
      StoreTaskRequest.php      # Validation
      UpdateTaskRequest.php
  Models/
    Task.php
    User.php                    # Included if you want to add auth, but not required
database/
  migrations/                   # Includes tasks, users, cache, jobs tables
  seeders/TaskSeeder.php
routes/
  api.php                       # Route::apiResource('tasks', ...)
  web.php                       # SPA catch-all
resources/js/react/
  main.jsx                      # Entry point (QueryClient, ThemeProvider)
  App.jsx                       # AppBar shell + <Outlet />
  lib/api.js                    # fetch wrapper
  pages/Tasks/index.jsx         # Task list page (React Query + MUI Table)
  theme/                        # MUI theme + dark mode
```

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

## Adding Things

**New API resource (backend):**

1. `make:migration`, `make:model`, `make:controller --api` via `docker compose exec php php artisan ...`
2. Add `Route::apiResource(...)` to `routes/api.php`

**New page (frontend):**

1. Create `resources/js/react/pages/YourPage/index.jsx`
2. Add a `<Route>` in `resources/js/react/main.jsx`
3. Add a method to `resources/js/react/lib/api.js`

**New API call from React:**
All fetch calls go through `lib/api.js` — add a method there and use `useQuery` / `useMutation` from React Query to call it in your component.

> The `Task` scaffold is just an example to show the pattern — you're not required to build on top of it. Feel free to ignore it and start fresh with your own models and pages.

## Problem/Solution Prompts

These are intentionally open-ended. There's no right answer — pick whichever resonates, interpret the problem however makes sense to you, and build what you think is most valuable. We're more interested in the decisions you make and why than in how much you complete.

### Staff Idea Board

Credit unions run on cooperative principles; member and staff voice matters. Build an internal idea submission board where staff can post improvement suggestions (process, product, member experience), other staff can upvote or comment, and leadership can update the status (Under Review, Planned, Implemented, Declined).

### New Member Journey Tracker

Onboarding a new member well is critical; properly set-up members are far more likely to stay and grow their relationship. Build a tool for branch staff to track where each new member is in their onboarding journey: account opened, e-statements activated, mobile app set up, appropriate product conversation had (e.g. TFSA, FHSA, overdraft protection).

### Member Financial Wellness Check-In

Credit unions differentiate from banks on member wellbeing. Build a tool where a member (or a staff member on their behalf) can log a periodic financial check-in: income, rough monthly expenses by category (housing, food, transport, debt payments), and savings. The tool should surface something useful from that data, whatever makes sense to the candidate.

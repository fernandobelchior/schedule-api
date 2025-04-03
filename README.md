# Leonardo.ai Schedule API 
### NestJS + Prisma + PostgreSQL

[Requirements](./challenge.pdf)

---

## ✨ Features

- Full CRUD for `tasks` and `schedules`
- UUID primary keys, relational integrity with Prisma
- Custom validation decorators (e.g. `@Exists()` for referential checks)
- RESTful resource design with versioning (`/v1/...`)
- Global validation pipe with `class-validator`
- Full unit and e2e test coverage with Jest + Supertest
- Docker-ready PostgreSQL integration
- `agent` and `account` tables included.

---

## Assumptions
- A task must be in the timespan of a schedule, otherwise reject the request
- `tasks.duration` field is stored in minutes.
- Only allow to add a task if Schedule, Account, Agent exists (implemented via @ExistsRule decorator)

___

## 📚 Potential Enhancements (Interview Discussion Points)

> These are areas intentionally left out to focus on core structure — and serve as great discussion starters.

### Error Handling
- Improve error handling to avoid exposing server errors
- Check if a cascade record can be deleted before execute the delete command in db itself.
- Example: a schedule cannot be deleted if it has at least one task, to avoid orphan rows.

### 🔢 Pagination Decorator

- Replace current DTO usage with a custom `@Paginated()` decorator
- Automatically inject and validate `page`, `perPage` with defaults
- Great chance to demonstrate NestJS metaprogramming + DRY design

### 🔐 Authentication & Authorization

- Add JWT-based auth using Passport module
- Add guards (`@UseGuards(AuthGuard)`) to protect endpoints
- Optionally enforce account ownership on resources

### ⚡ Soft deleting

- Use `is_deleted` field across DB tables to avoid hard-deletion

### ⚡ Rate Limiting

- Use NestJS `@nestjs/throttler` to apply global/per-user limits
- Supports distributed environments with Redis backend

### ✨ Swagger/OpenAPI Documentation

- Add `@nestjs/swagger` decorators to generate interactive docs
- Includes models, parameters, and error response types

### ✨ Add more test cases (Unit & E2E)
- Targeting at least 70% coverage
- Generate a Code Coverage report

### 🚀 K8s deployment
- Build a GitHub action to deploy in a k8s cluster and using helm.
- Happy to discuss other options.

### 🌀 Caching Layer

- Use Redis to cache `GET` endpoints for better performance
- Add a cache invalidation strategy tied to updates/deletes

---


# 🚀 Getting Started

### Prerequisites

- Node.js 22+
- Docker + Docker Compose
- `npm`

### 1. Start PostgreSQL with Docker

```bash
docker-compose up -d
```

### 2. Set up environment variables

Create a `.env` file at the root (copy .env.dist):

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/schedule
```

### 3. Install dependencies

```bash
npm install
```

### 4. Run database migrations

```bash
npx prisma migrate dev --name init
```

### 5. Start the application

```bash
npm run start:dev
```

### 6. Run tests locally or via CI pipeline

#### locally
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e
```

---

## 🌐 API Overview

| Method | Endpoint                  | Description               |
| ------ | ------------------------- | ------------------------- |
| GET    | `/v1/schedules`           | List all schedules        |
| POST   | `/v1/schedules`           | Create new schedule       |
| PATCH  | `/v1/schedules/:id`       | Update schedule by ID     |
| DELETE | `/v1/schedules/:id`       | Delete schedule by ID     |
| GET    | `/v1/schedules/:id/tasks` | List tasks for a schedule |
| GET    | `/v1/tasks`               | List all tasks            |
| POST   | `/v1/tasks`               | Create new task           |
| PATCH  | `/v1/tasks/:id`           | Update task               |
| DELETE | `/v1/tasks/:id`           | Delete task               |

---

## ✨ Architectural Highlights

- **SOLID Principles**: Logic is cleanly separated into services, DTOs, and validation layers.
- **Reusable Validation**: Includes a custom `@Exists()` validator that checks referential integrity (e.g., `accountId`, `scheduleId`).
- **Versioned Routes**: Easy future-proofing with URI-based versioning (`/v1/...`).
- **Testability**: Designed for both unit testing and e2e testing using DI and mocks.

---

## 🙌 Contact

Built by Fernando Belchior as part of a job application to Leonardo.ai
Feel free to reach out to discuss architecture, improvements, or scaling plans.
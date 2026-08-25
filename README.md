# MERN Blog

A full-stack blog with MongoDB persistence, an Express REST API, and a React 19 + Tailwind CSS dashboard. Create, edit, list, and delete posts with authors and tags.

## Prerequisites

- Node.js 20+
- MongoDB 7+ locally, or a MongoDB Atlas connection string

## Start the API

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

## Start the client

```bash
cd client
npm install
npm run dev
```

Open <http://localhost:5173>. The API health endpoint is <http://localhost:5000/api/health>.

## API

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/posts` | List newest posts first |
| POST | `/api/posts` | Create a validated post |
| PUT | `/api/posts/:id` | Replace a post |
| DELETE | `/api/posts/:id` | Delete a post |

Never commit `.env` or real database credentials. Add authentication and authorization before exposing write endpoints publicly.

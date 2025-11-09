# Vercel Deployment Guide

This document explains how to deploy the Traffic Sign Classification project entirely on [Vercel](https://vercel.com/). The steps below assume that you already have the source code checked out locally and the Vercel CLI installed.

## 1. Prerequisites

- Vercel account with access to the destination workspace.
- Vercel CLI (`npm i -g vercel`) authenticated with the target account.
- `GEMINI_API` key available for production usage.

## 2. Project Layout for Vercel

The repository now contains an `api/` folder that exposes the existing FastAPI application as a Vercel serverless function:

```
api/
├── __init__.py
├── index.py           # Serverless entrypoint that imports backend.app
└── requirements.txt   # Minimal dependency set installed by Vercel
```

Vercel uses `vercel.json` to configure both the Python function and the React static build.

## 3. Configure Environment Variables

```bash
vercel env add GEMINI_API
```

Add any additional variables that the backend requires (e.g., logging levels).

## 4. First-Time Deployment

From the repository root:

```bash
vercel
```

During the interactive prompts:

1. Select the Vercel scope (personal account or team).
2. Create or link the project.
3. Accept the default settings for builds.

This will create a preview deployment and a `.vercel` directory (ignored by Git).

## 5. Promote to Production

Once the preview build looks good:

```bash
vercel --prod
```

Vercel runs the following automatically:

- `npm install && npm run build` inside the `frontend/` directory (configured in `vercel.json`).
- Installs Python dependencies from `api/requirements.txt`.
- Serves the React build output (`frontend/dist/`) and maps `/api/*` routes to the FastAPI application.

## 6. Verifying the Deployment

- Frontend UI: `https://<project>.vercel.app`
- Backend API (health check): `https://<project>.vercel.app/api/health`
- Gemini integration logs: View via `vercel logs <deployment-url>`

## 7. Local Development Remains Unchanged

```bash
# Backend
cd backend
uvicorn app:app --reload

# Frontend
cd frontend
npm install
npm run dev
```

The additional Vercel files do not affect local development workflows.



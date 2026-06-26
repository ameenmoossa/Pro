# ProManage Frontend (Next.js 15)

This is the Next.js frontend for the ProManage application, communicating with a FastAPI backend.

## Tech Stack
- Next.js 15 (App Router)
- React 19
- Tailwind CSS v4
- TanStack React Query (v5)
- Axios
- Lucide React (Icons)
- Zustand (State management)

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment:**
   Ensure `.env.local` contains the correct backend API URL:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

3. **Run the Development Server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features
- **Authentication**: JWT-based authentication interacting securely with FastAPI.
- **Projects & Tasks**: Full CRUD operations using React Query for efficient data fetching, caching, and optimistic UI updates.
- **User Management**: Admin tools to manage system users.
- **Clean UI**: Professional, modern UI built with Shadcn UI and Framer Motion.

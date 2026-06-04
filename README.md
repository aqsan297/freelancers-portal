# Freelancer's Portal

## Overview

Freelancer's Portal is a personal work management and knowledge reuse platform designed for freelancers and solo professionals. The application helps users organize projects, tasks, notes, reusable assets, and lessons learned in a single workspace, making it easier to find, reuse, and build upon previous work.

## Features

* Dashboard
* Projects Management
* Task Management
* Assets Library
* Notes Management
* Lessons Learned
* Unified Search
* Authentication Screens
* User Settings

## Technology Stack

* TanStack Start
* React
* TypeScript
* Tailwind CSS
* shadcn/ui

## Project Structure

```text
src/routes/
│
├── __root.tsx
├── index.tsx                 -> Dashboard/Home
├── projects.tsx              -> /projects
├── tasks.tsx                 -> /tasks
├── assets.tsx                -> /assets
├── notes.tsx                 -> /notes
├── lessons.tsx               -> /lessons
├── search.tsx                -> /search
├── settings.tsx              -> /settings
│
├── auth/
│   ├── login.tsx             -> /auth/login
│   ├── signup.tsx            -> /auth/signup
│   ├── forgot-password.tsx   -> /auth/forgot-password
│   └── reset-password.tsx    -> /auth/reset-password
│
└── admin/
    └── index.tsx             -> /admin
```

## Current Status

Frontend MVP using mock data and local state only.

### Not Included Yet

* Backend integration
* Database
* Real authentication
* File storage
* External APIs
* Team collaboration features

## Future Enhancements

* AI-powered work search
* Team workspaces
* Role-based access control
* Knowledge recommendations
* Analytics and reporting
* Backend and database integration

portfolio-project
│
├── portfolio-backend
│
├── portfolio-frontend
│
├── infrastructure
│
├── scripts
│
└── docs

# RunTime architecture
                Browser
                   │
                   ▼

             CloudFront CDN
                   │
                   ▼

               S3 Bucket
                   │
                   ▼

            React Frontend

                   │
         HTTPS API Requests
                   │
                   ▼

         Application Load Balancer
                   │
         ┌─────────┴─────────┐
         │                   │
         ▼                   ▼

     Backend Blue      Backend Green
         │                   │
         └─────────┬─────────┘
                   │

                   ▼

                Redis

                   │

                   ▼

                MongoDB

                   │

                   ▼

              CloudWatch

## Backend Pattern
# Layered architecture
Route
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
Database

Example
GET /projects

Route
 ↓
ProjectController
 ↓
ProjectService
 ↓
ProjectRepository
 ↓
MongoDB
WHY? --> Keeps business logic separate from database logic.
portfolio-backend/

# Backend Folder Structure
src/

├── config/
│
├── routes/
│
├── controllers/
│
├── services/
│
├── repositories/
│
├── models/
│
├── middleware/
│
├── validations/
│
├── utils/
│
├── constants/
│
├── cache/
│
├── jobs/
│
└── app.js

# Frontend Pattern

Feature Based architecture

Instead of components and pages we use features
Folder Structure
portfolio-frontend/

src/

├── api/
│
├── app/
│
├── features/
│   │
│   ├── auth/
│   ├── profile/
│   ├── projects/
│   └── contact/
│
├── components/
│
├── layouts/
│
├── routes/
│
├── hooks/
│
├── services/
│
├── utils/
│
├── assets/
│
└── main.jsx
# CDN Portfolio Platform

Production-style MERN application demonstrating:

- React Frontend
- Node Backend
- MongoDB
- Redis
- Docker
- AWS CloudFront
- S3
- EC2
- ALB
- Blue/Green Deployment
- CloudWatch Monitoring

## Architecture

Frontend:
CloudFront → S3

Backend:
ALB → EC2 → Docker

Data:
Redis + MongoDB

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

# CI/CD Flow Desgin
Feature Branch
      │
      ▼

Pull Request
      │
      ▼

Develop
      │
      ▼

Release Branch
      │
      ▼

Main
      │
      ▼

GitHub Actions
      │
      ▼

AWS Deployment

# Final Structure
portfolio-project/

├── .github/
│   └── workflows/
│
├── docs/
│   ├── architecture/
│   ├── deployment/
│   ├── api/
│   └── decisions/
│
├── infrastructure/
│   ├── aws/
│   ├── docker/
│   ├── nginx/
│   └── diagrams/
│
├── scripts/
│   ├── setup-backend.sh
│   ├── setup-frontend.sh
│   ├── start-dev.sh
│   ├── stop-dev.sh
│   ├── build-images.sh
│   ├── deploy-backend.sh
│   ├── deploy-frontend.sh
│   ├── invalidate-cloudfront.sh
│   └── blue-green-switch.sh
│
├── portfolio-backend/
│
├── portfolio-frontend/
│
├── .gitignore
│
├── docker-compose.yml
│
├── README.md
│
└── architecture.md


                    ┌──────────────────────┐
                    │      User Browser     │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   AWS CloudFront CDN │
                    │  (Frontend Delivery) │
                    └──────────┬───────────┘
                               │
                    Cached Static Assets
                               │
                               ▼
                    ┌──────────────────────┐
                    │        S3 Bucket      │
                    │   portfolio-frontend  │
                    └──────────────────────┘


API Requests
──────────────────────────────────────────────►

                    ┌──────────────────────┐
                    │        EC2           │
                    │  portfolio-backend   │
                    │  Docker Container    │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │       MongoDB        │
                    └──────────────────────┘

                    ┌──────────────────────┐
                    │          S3          │
                    │ Profile Images/Files │
                    └──────────────────────┘
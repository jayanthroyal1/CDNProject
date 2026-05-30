# Packages installed

# Runtime Packages
npm install express cors dotenv mongoose redis helmet compression morgan

# Authentication Packages
npm install jsonwebtoken bcryptjs cookie-parser

# Validation Package
npm install zod

# Logging Package
npm install winston

# Development Package
npm install -D nodemon

| Package      | Purpose          |
| ------------ | ---------------- |
| express      | API server       |
| mongoose     | MongoDB          |
| redis        | Cache            |
| cors         | Cross origin     |
| helmet       | Security headers |
| compression  | Gzip             |
| morgan       | Request logs     |
| winston      | Application logs |
| dotenv       | Env vars         |
| zod          | Validation       |
| jsonwebtoken | JWT              |
| bcryptjs     | Password hashing |


Before writing any business logic or any code first we need to complete the 
configuartion part like mongoose, redis, docker and need to check
then
complete the below one's before starting coding
Logging
Error Handling
Validation
Rate Limiting
Request Tracking
Standard Responses
Bcoz:
Request
   │
Request ID Middleware
   │
Rate Limiter
   │
Validation
   │
Controller
   │
Service
   │
Repository
   │
Database

Error Handler
   │
Response Formatter

# why winston for logging
In Dev
console.logs
In Production
CloudWatch, ELK, Datadog, Splunk

we need to create a log file

ratelimit - api limits
Auth APIs → 5 requests
Public APIs → 100 requests
Admin APIs → Different rules
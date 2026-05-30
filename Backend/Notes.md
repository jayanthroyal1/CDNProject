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

Authentication & Authorization Architecture
User Login
    │
    ▼
Password Validation
    │
    ▼
MongoDB User
    │
    ▼
Access Token (15 min)
    │
    ▼
Refresh Token (7 days)
    │
    ▼
Redis Session

For AccessToken - JWT
Store Refresh token in HttpOnly Cookies
Here we avoiding storing JWT in localstorage for XSS Risk - since production application uses HttpOnly Cookies

# Register Flow
Request
  ↓
Validate
  ↓
Email Exists?
  ↓
Hash Password
  ↓
Create User
  ↓
Return User

# Login Flow
Request
  ↓
Find User
  ↓
Compare Password
  ↓
Generate Tokens
  ↓
Store Session Redis
  ↓
Return Access Token

# redis
session:userId

# Flow
Request-->Middleware -->Route--->Controller-->Service-->Repository-->Database-->Response

Middleware has
Authentication
Authorization
Rate Limiting
Request Validation
Logging
CORS
Helmet

Middleware VS Service

| Middleware         | Service         |
| ------------------ | --------------- |
| Authentication     | Register User   |
| Authorization      | Create Order    |
| Rate Limiting      | Process Payment |
| Request Validation | Apply Coupon    |
| Logging            | Calculate Tax   |
| CORS               | Business Rules  |

example Login flow
Request
  ↓
Validation Middleware
  ↓
Controller
  ↓
Auth Service
  ↓
User Repository
  ↓
MongoDB

Protected API FLow
Request
  ↓
Authentication Middleware
  ↓
Authorization Middleware
  ↓
Validation Middleware
  ↓
Controller
  ↓
Service
  ↓
Repository
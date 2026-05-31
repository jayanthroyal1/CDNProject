# Frontend ↔ Backend Cross-Check Walkthrough

Traced every frontend API call end-to-end against the backend. Found and fixed **4 additional issues** beyond the initial 21.

---

## Cross-Check Results by Feature

### 1. Auth — Register
| Layer | Detail |
|-------|--------|
| **Frontend** | `RegisterPage` → `registerApi({ name, email, password })` → `POST /auth/register` |
| **Backend Route** | `POST /register` → `validate(registerSchema)` → `register` controller |
| **Validation** | `registerSchema`: `{ name: min(3), email: email(), password: min(6) }` |
| **Response** | `{ success, message, data: { id, name, email, role } }` |
| **Status** | ✅ Payload shape matches. Validation aligns. |

### 2. Auth — Login
| Layer | Detail |
|-------|--------|
| **Frontend** | `LoginPage` → `AuthContext.login(email, password)` → `loginApi({ email, password })` → `POST /auth/login` |
| **Backend Route** | `POST /login` → `authLimiter` → `validate(loginSchema)` → `login` controller |
| **Response** | HTTP body: `{ success, message, data: { accessToken, user: { id, name, email, role } } }` + `refreshToken` in httpOnly cookie |
| **Frontend reads** | `response.data.accessToken` (= API `.data.accessToken`), then `GET /users/me` for user details |
| **Status** | ✅ Correct. `loginApi` returns Axios `.data` = API envelope. `response.data.accessToken` is correct. |

### 3. Auth — Refresh
| Layer | Detail |
|-------|--------|
| **Frontend** | `AuthContext.initializeAuth()` → `refreshApi()` → `POST /auth/refresh` |
| **Backend** | Reads `req.cookies.refreshToken` (httpOnly cookie sent via `withCredentials: true`) → verifies → returns new `accessToken` |
| **Response** | `{ success, message, data: { accessToken } }` |
| **Frontend reads** | `refresh.data.accessToken` ✅ |
| **Status** | ✅ Cookie sent automatically by browser with `withCredentials: true`. |

### 4. Auth — Logout
| Layer | Detail |
|-------|--------|
| **Frontend** | `AuthContext.logout()` → `logoutApi()` → `POST /auth/logout` |
| **Backend** | `authenticate` middleware → `logoutUserService` (deletes Redis session) → clears cookie |
| **Status** | ✅ **Fixed**: Now clears interceptor token via `setToken(null)` and wraps in try/catch so local state always clears. |

### 5. Auth — Get Current User
| Layer | Detail |
|-------|--------|
| **Frontend** | `getCurrentUserApi()` → `GET /users/me` |
| **Backend** | `authenticate` middleware → `getMe` controller → returns `req.user` |
| **Response** | `{ success, message, data: { userId, role, email } }` |
| **Frontend reads** | `me.data` = `{ userId, role, email }` → sets as `user` in context |
| **Status** | ✅ Correct. |

### 6. Files — List
| Layer | Detail |
|-------|--------|
| **Frontend** | `FilesPage` → `listFilesApi()` → `GET /files` |
| **Backend** | `getFilesController` → `fetchFilesService(page, limit, type)` → returns `{ files, pagination }` |
| **Full response** | `{ success, message, data: { files: [...], pagination: { page, limit, total } } }` |
| **Frontend reads** | `rawFiles` = Axios `.data` = API envelope. Then `rawFiles?.data?.files` ✅ |
| **Rendered fields** | `f._id`, `f.originalName` — both exist on File model ✅ |
| **Status** | ✅ Correct. |

### 7. Files — Upload
| Layer | Detail |
|-------|--------|
| **Frontend** | `FilesPage` → `uploadFileApi(file)` → `POST /files/upload` with `FormData` |
| **Backend** | `authenticate` → `authorize("admin")` → `upload.single("file")` → `uploadFileController` |
| **Field name** | Frontend: `formData.append("file", file)` matches backend `upload.single("file")` ✅ |
| **Status** | ✅ Correct. Requires admin auth. |

### 8. Profile — Read
| Layer | Detail |
|-------|--------|
| **Frontend** | `ProfilePage` → `httpClient.get("/profile")` |
| **Backend** | `GET /api/v1/profile` → `getProfileController` → `getProfileService()` (checks Redis cache first) |
| **Response** | `{ success, message, data: { fullName, title, summary, email, phone, location, ... } }` |
| **Frontend reads** | `response.data?.data` → maps to `{ fullName, title, summary, email, phone, location }` ✅ |
| **Status** | ✅ Form fields match profile model schema. |

### 9. Profile — Update
| Layer | Detail |
|-------|--------|
| **Frontend** | `ProfilePage` → `httpClient.put("/profile", profile)` |
| **Backend** | `PUT /api/v1/profile` → `authenticate` → `authorize("admin")` → `validate(profileSchema)` → `updateProfileController` |
| **Validation** | `profileSchema`: `{ fullName: min(3), title: min(2), summary: min(10), email: email(), phone?, location?, profileImage?, resumeUrl? }` |
| **Frontend sends** | `{ fullName, title, summary, email, phone, location }` — all present in schema ✅ |
| **Status** | ✅ Correct. Requires admin auth. |

### 10. Contact — Submit
| Layer | Detail |
|-------|--------|
| **Frontend** | `ContactPage` → `sendContactApi({ name, email, subject, message })` → `POST /contact` |
| **Backend** | `authLimiter` → `validate(createContactSchema)` → `createContactController` |
| **Validation** | `createContactSchema`: `{ name: min(2), email: email(), subject: min(3), message: min(10) }` |
| **Status** | ✅ All 4 required fields now sent. |

### 11. Reports — Chart Data
| Layer | Detail |
|-------|--------|
| **Frontend** | `ReportPage` → `getChartDataApi(id)` → `GET /reports/:id/chart` |
| **Backend** | `getChartData` → checks Redis cache → `fetchFileService(id)` → extracts rows → returns `{ success, data: { labels, values } }` |
| **Frontend reads** | `chartResponse.data.labels` and `chartResponse.data.values` ✅ |
| **Status** | ✅ Correct. |

### 12. Admin — Dashboard
| Layer | Detail |
|-------|--------|
| **Frontend** | `AdminDashboard` → no API calls, just renders static dashboard |
| **Backend** | `GET /api/v1/admin/dashboard` exists but frontend doesn't call it |
| **Status** | ✅ No mismatch (frontend is a simple protected page). |

---

## Additional Issues Found & Fixed (Round 2)

| # | Issue | Fix |
|---|-------|-----|
| 22 | [AuthContext.jsx](file:///g:/001-LearnAgain/CDNProject/Frontend/src/context/AuthContext.jsx) — Interceptor token never cleared on logout. Stale `Bearer` token persisted across sessions. | Added `setToken(null)` in `logout()` and in `initializeAuth` catch block |
| 23 | [AppRouter.jsx](file:///g:/001-LearnAgain/CDNProject/Frontend/src/app/router/AppRouter.jsx) — `ReportPage` had no route. Users could never navigate to `/reports`. | Added `<Route path="/reports" element={<ReportPage />} />` and lazy import |
| 24 | [Header.jsx](file:///g:/001-LearnAgain/CDNProject/Frontend/src/shared/components/Header.jsx) — No "Reports" navigation link | Added `<Link to="/reports">Reports</Link>` |
| 25 | [user.api.js](file:///g:/001-LearnAgain/CDNProject/Frontend/src/shared/api/user.api.js) — Contained `updateUserApi` calling non-existent `PUT /users/me` and duplicate `getCurrentUserApi` | Cleaned to documented placeholder |

---

## Verification

- ✅ `vite build` — 704 modules transformed, 0 errors, built in 2.30s
- ✅ All 12 frontend→backend data flows verified to match

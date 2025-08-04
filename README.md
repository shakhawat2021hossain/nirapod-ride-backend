# Ride Booking API

A **secure**, **role-based**, and **scalable backend API** for a ride-booking system (like Uber / Pathao) built with **Express.js**, **MongoDB (Mongoose)**, and **JWT authentication**. It supports `rider`, `driver`, and `admin` roles with clear lifecycle and business rules.

## 🚀 Features

- JWT-based authentication with roles: `admin`, `rider`, `driver`
- Secure password hashing
- Rider functionality:
  - Request ride
  - Cancel ride (with rules)
  - View ride history
- Driver functionality:
  - Apply to become driver
  - Toggle availability (online/offline)
  - Accept / reject ride requests
  - Update ride status (`picked_up`, `in_transit`, `completed`)
  - View earnings history (derived from completed rides)
- Admin functionality:
  - Approve / reject driver applications
  - View all users and rides
  - Override ride status / cancel rides
- Full ride lifecycle tracking with timestamps
- Role-based route protection
- Validation using Zod
- Structured, modular codebase

## 🗂️ Project Structure 
src/
├── app/
├── ├── middlewares
├── ├── config
├── ├── utils
├── ├── modules
├──       ├── auth
├──       ├── user
├──       ├── ride
├── app.ts
├── sever.ts


## 🧠 Core Concepts

- **Roles**: 
  - `RIDER` — requests rides.
  - `DRIVER` — applies, gets approved, accepts rides, toggles availability.
  - `ADMIN` — manages users/drivers/rides.

- **Ride Status Flow**:
   requested → accepted → picked_up → in_transit → completed


- **Driver Application**:
- Rider applies → becomes `driver` role with a pending application.
- Admin approves → driver can go online and accept rides.

## 🛠️ Tech Stack

- Node.js / Express.js
- MongoDB with Mongoose
- JWT for authentication
- Zod for request validation
- bcrypt for password hashing
- TypeScript
- HTTP status codes via `http-status-codes`

## ⚙️ Setup Instructions

1. **Clone repository**
 ```bash
 git clone <your-repo-url>
 cd <repo-directory>
```
2. **Clone repository**
 ```bash
   npm install
  ```
3. **Create a .env file**
   ```bash
   PORT=5000
   MONGO_URI=<your-mongodb-connection-string>
   ACCESS_TOKEN_SECRET=<strong_jwt_secret>
   REFRESH_TOKEN_SECRET=<optional_if_using_refresh_tokens>
   ```
4. Run the server
   ```bash
   npm run dev
   ```
## API Endpoints Summary

### Authentication
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/v1/auth/signup` | Public | Register user (default role: RIDER) |
| POST | `/api/v1/auth/login` | Public | Login and receive JWT |

### Common Headers
Authorization: Bearer <token>
Content-Type: application/json

---

### Rider
| Method | Path | Auth | Description | Body |
|--------|------|------|-------------|------|
| POST | `/api/v1/ride/request` | Rider | Request a new ride | `{ "startLocation": "string", "endLocation": "string", "fare": number }` |
| PATCH | `/api/v1/ride/:id/cancel` | Rider | Cancel a ride (if allowed) | _none or optional reason_ |
| GET | `/api/v1/ride/me` | Rider | Get own ride history | _none_ |
| GET | `/api/v1/ride/:id` | Rider (owner) / Admin / Driver | Get ride details | _none_ |

---

### Driver
| Method | Path | Auth | Description | Body |
|--------|------|------|-------------|------|
| POST | `/api/v1/driver/apply` | Rider (to become driver) | Apply to become a driver (creates pending application) | `{ "vehicleInfo": { "type": "car"|"bike"|"cng"|"auto", "model": "string", "plateNum": "string" } }` |
| PATCH | `/api/v1/driver/availability` | Driver | Toggle availability status | `{ "availability": "ONLINE" | "OFFLINE" }` |
| PATCH | `/api/v1/ride/:id/accept` | Driver | Accept a requested ride | _none_ |
| PATCH | `/api/v1/ride/:id/reject` | Driver | Reject a ride request | _none_ |
| PATCH | `/api/v1/ride/:id/status` | Driver (or Admin override) | Update ride lifecycle status | `{ "status": "picked_up" | "in_transit" | "completed" | "cancelled" }` |
| GET | `/api/v1/earnings/me/history` | Driver | View earnings history (from completed rides) | _none_ |

---

### Admin
| Method | Path | Auth | Description | Body |
|--------|------|------|-------------|------|
| PATCH | `/api/v1/driver/approve/:userId` | Admin | Approve driver application | _none_ |
| PATCH | `/api/v1/driver/reject/:userId` | Admin | Reject driver application | `{ "reason": "string" }` (optional) |
| GET | `/api/v1/ride` | Admin | List all rides with filters | Query params: status, date range, riderId, driverId |
| PATCH | `/api/v1/ride/:id/status-override` | Admin | Forcefully change ride status | `{ "status": "string", "reason"?: "string" }` |
| PATCH | `/api/v1/user/block/:id` | Admin | Block or unblock a user | `{ "block": true|false }` |

---

### Notes
- Role-based access is enforced via JWT in `Authorization` header.
- Ride status transitions are validated (e.g., cannot jump from `requested` directly to `completed`).
- Drivers must be approved and online to accept rides.
- Riders can have only one active ride at a time.






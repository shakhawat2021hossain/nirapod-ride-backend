# Ride Booking API

A **secure**, **role-based**, and **scalable backend API** for a ride-booking system (like Uber / Pathao) built with **Express.js**, **MongoDB (Mongoose)**, and **JWT authentication**. It supports `rider`, `driver`, and `admin` roles with clear lifecycle and business rules.

## Base URL
  ```bash
  https://nirapod-ride.vercel.app/api/v1
  ```

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
```plaintext
src/
├── app/
│   ├── middlewares/
│   ├── config/
│   ├── utils/
│   ├── modules/
│   │   ├── auth/
│   │   ├── user/
│   │   ├── ride/
├── app.ts
├── server.ts
```

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


## API Endpoints
### 🔐 Authentication Routes (`/auth`)

| Method | Endpoint | Description | Body (JSON Example) | Access |
|--------|-----------|--------------|---------------------|--------|
| POST | `/auth/register` | Register a new user | `{ "name": "John Doe", "email": "john@example.com", "password": "123456", "role": "rider" }` | Public |
| POST | `/auth/login` | Login with credentials | `{ "email": "john@example.com", "password": "123456" }` | Public |
| POST | `/auth/logout` | Logout the current user | None | Authenticated |

---

### 👤 User Routes (`/user`)

| Method | Endpoint | Description | Body (JSON Example) | Access |
|--------|-----------|--------------|---------------------|--------|
| GET | `/user/all-user` | Get all users | None | Admin |
| PATCH | `/user/change-password` | Change user password | `{ "oldPassword": "123456", "newPassword": "abcdef" }` | All Roles |
| PATCH | `/user/become-driver` | Request to become a driver | `{ "plateNum": "ABC12345", "type": "car", "model": "toyota s corola" }` | Rider |
| GET | `/user/driver-request` | Get all driver requests | None | Admin |
| PATCH | `/user/availability` | Set driver availability | `{ "available": true }` | Driver |
| PATCH | `/user/driver-request/:id/approve` | Approve driver request | None | Admin |
| PATCH | `/user/:id/toggle-block` | Block/unblock user | None | Admin |
| PATCH | `/user/:id` | Update user profile | `{ "name": "Updated Name", "phone": "0123456789" }` | All Roles |
| GET | `/user/me` | Get current user info | None | All Roles |

---

### 🚘 Ride Routes (`/ride`)

| Method | Endpoint | Description | Body (JSON Example) | Access |
|--------|-----------|--------------|---------------------|--------|
| POST | `/ride/request` | Request a ride | `{ "pickupLocation": "Uttara", "destination": "Dhanmondi", "fare": 350 }` | Rider |
| GET | `/ride/all-rides` | Get all rides | None | Admin |
| GET | `/ride/available-rides` | Get available rides | None | Driver |
| GET | `/ride/earnings` | Get driver’s earnings | None | Driver |
| GET | `/ride/my-rides` | Get rider’s rides | None | Rider |
| GET | `/ride/driver-rides` | Get driver’s rides | None | Driver |
| GET | `/ride/:id` | Get ride details by ID | None | All Roles |
| PATCH | `/ride/:id/cancel-ride` | Cancel a ride | None | Rider |
| PATCH | `/ride/:id/update-status` | Update ride status(picked_up, in_transit, cancelled etc) | `{ "status": "completed" }` | Driver |
| PATCH | `/ride/:id/accept-ride` | Accept a ride request | None | Driver |

---



## ⚙️ Setup Instructions

1. **Clone repository**
 ```bash
 git clone <your-repo-url>
 cd <repo-directory>
```
2. **Install Dependencies**
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


### Notes
- Role-based access is enforced via JWT in `Authorization` header.
- Ride status transitions are validated (e.g., cannot jump from `requested` directly to `completed`).
- Drivers must be approved and online to accept rides.
- Riders can have only one active ride at a time.






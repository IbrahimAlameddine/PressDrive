# 🚗 PressDrive

**PressDrive** is a production-ready full-stack car rental platform that connects customers with car rental providers.

Users can discover vehicles, compare prices, check availability, select rental dates, and contact providers directly through WhatsApp.

The platform also includes a dedicated **Admin Dashboard** for managing users, vehicles, bookings, and vehicle availability.

---

## ✨ Features

* 🚘 Browse available vehicles
* 🔎 Search and filter vehicles
* 📅 Check vehicle availability by date
* 💰 View and compare rental prices
* 🤖 AI-powered vehicle recommendations
* 💬 Contact providers through WhatsApp
* 🔐 Authentication and role-based authorization
* 👤 User management
* 🚗 Vehicle management
* 📋 Booking management
* 📅 Vehicle availability management
* 📊 Admin Dashboard
* 📱 Fully responsive design
* ⚡ Modern and optimized user interface
* 🗄️ PostgreSQL database
* 🔒 Protected API endpoints

---

## 🧠 AI Assistant

PressDrive includes an AI-powered assistant that helps users find vehicles based on their needs.

The assistant can provide recommendations based on factors such as:

* Trip type
* Number of passengers
* Vehicle size
* Driving requirements
* User preferences

### Example

```text
Mountain trip
      ↓
AI analyzes requirements
      ↓
Recommends suitable vehicles
      ↓
User selects a vehicle
```

---

## 👥 User Roles

PressDrive currently supports three roles:

| Role       | Access                                                                        |
| ---------- | ----------------------------------------------------------------------------- |
| `USER`     | Browse vehicles, check availability, and request reservations                 |
| `PROVIDER` | Uses the platform as a normal user and can be associated with rental vehicles |
| `ADMIN`    | Full access to the Admin Dashboard and platform management                    |

### 🔐 Admin Access

The **Admin Dashboard is currently available only to administrators**.

Providers do **not** have access to the dashboard.

Providers use the same main platform interface as normal users.

---

## 📊 Admin Dashboard

The Admin Dashboard provides administrators with centralized control over the platform.

### 👤 Users

Administrators can:

* View users
* Manage user information
* Manage user roles
* Manage user accounts

### 🚗 Cars

Administrators can:

* View vehicles
* Add vehicles
* Edit vehicle information
* Remove vehicles
* Manage vehicle information
* Manage vehicle availability

### 📋 Bookings

Administrators can:

* View bookings
* Review reservation information
* Manage booking records

### 📅 Availability

Administrators can manage unavailable dates for vehicles.

This allows the system to prevent reservations during unavailable periods.

### Dashboard Structure

```text
Admin Dashboard
│
├── Users
│   └── Manage Users
│
├── Cars
│   └── Manage Vehicles
│
└── Bookings
    └── Manage Bookings
```

---

## 📅 Vehicle Availability

PressDrive includes a date-based availability system.

Before a reservation request is created, the system checks whether the selected vehicle is available for the requested dates.

```text
Select Vehicle
      ↓
Select Start Date
      ↓
Select End Date
      ↓
Check Availability
      ↓
   Available?
    ↙       ↘
  Yes        No
   ↓          ↓
Booking    Show unavailable
request       dates
```

This helps prevent users from requesting vehicles during unavailable periods.

---

## 💬 Reservation Flow

PressDrive currently does not process online payments.

Instead, users can contact the vehicle provider directly through WhatsApp.

```text
Browse Vehicles
       ↓
Select Vehicle
       ↓
Select Rental Dates
       ↓
Check Availability
       ↓
Request Reservation
       ↓
Contact Provider
       ↓
WhatsApp
```

The WhatsApp message can include relevant reservation information such as:

* Vehicle
* Rental dates
* Reservation details

---

## 🛠️ Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* Next.js API Routes
* Node.js
* Prisma ORM

### Database

* PostgreSQL

### APIs & Services

* REST APIs
* OpenAI API
* WhatsApp integration

### Libraries & Tools

* TanStack Query
* Axios
* Prisma
* Git
* GitHub

---

## 🏗️ Architecture

PressDrive follows a full-stack architecture where the frontend communicates with backend API routes that handle business logic and database operations.

```text
┌─────────────────────────┐
│        Frontend         │
│    Next.js / React      │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│        API Layer        │
│     Next.js API Routes  │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│       Prisma ORM        │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│       PostgreSQL        │
└─────────────────────────┘
```

---

## 🔐 Authentication & Authorization

PressDrive uses authentication and role-based authorization to protect application functionality.

Different permissions are applied depending on the user's role.

```text
User
 │
 ├── USER
 │
 ├── PROVIDER
 │
 └── ADMIN
        │
        └── Admin Dashboard
```

Administrative routes and functionality are protected so that only authorized administrators can access them.

---

## 📂 Project Structure

```text
PressDrive/
│
├── app/
│   ├── api/
│   ├── dashboard/
│   ├── ai-assistant/
│   └── ...
│
├── components/
│
├── lib/
│
├── prisma/
│   ├── migrations/
│   └── ...
│
├── public/
│
├── types/
│
├── prisma.config.ts
├── package.json
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/IbrahimAlameddine/PressDrive.git
```

### 2. Navigate to the project

```bash
cd PressDrive
```

### 3. Install dependencies

```bash
npm install
```

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Configure environment variables

Create a `.env` file:

```env
DATABASE_URL=
DIRECT_URL=
OPENAI_API_KEY=
```

Add the appropriate values for your environment.

### 6. Run database migrations

```bash
npx prisma migrate deploy
```

### 7. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## 🚀 Production

PressDrive is designed and configured for production deployment.

### Production build

```bash
npm run build
```

### Start production server

```bash
npm start
```

The production setup includes:

* Optimized Next.js build
* PostgreSQL database
* Prisma migrations
* Environment-based configuration
* Protected API endpoints
* Role-based authorization
* Admin Dashboard
* Responsive UI
* AI integration

---

## 🔒 Environment Variables

Environment variables contain sensitive information and should never be committed to GitHub.

Example:

```env
DATABASE_URL=
DIRECT_URL=
OPENAI_API_KEY=
```

Make sure your environment files are included in `.gitignore`.

```text
.env
.env.local
```

---

## 📱 Responsive Design

PressDrive is designed to provide a consistent experience across different screen sizes.

Supported devices include:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📟 Tablet

---

## 🎯 Project Goals

PressDrive was created to simplify the car rental process by providing a modern platform where users can:

* Discover available vehicles
* Compare rental prices
* Check availability
* Choose suitable vehicles
* Request reservations
* Contact providers directly

At the same time, administrators have a centralized dashboard for managing the platform.

---

## 👨‍💻 Team

### Ibrahim Alameddine

**Team Leader — Full-Stack Developer**

Responsibilities:

* Full-stack development
* Application architecture
* Backend development
* Frontend development
* Database design
* API development
* Authentication and authorization
* AI integration
* Admin Dashboard
* Deployment

### Anas Azzam

**Team Member**

### Jihad Abd el Hamid

**Team Member**

---

## 📈 Project Status

**Production Ready**

PressDrive has been developed as a complete full-stack application with:

* Frontend
* Backend
* Database
* Authentication
* Authorization
* Admin Dashboard
* Vehicle availability
* Booking system
* AI assistant
* Production configuration

---

## 📄 License

This project is developed as a private software project.

---

<p align="center">
  <strong>PressDrive — Find your ride. Press the drive.</strong>
</p>

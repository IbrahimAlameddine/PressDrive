# 🚗 PressDrive

**PressDrive** is a production-ready full-stack car rental platform that connects customers with car rental providers.

Users can discover vehicles, compare prices, check availability, request reservations, and contact providers directly through WhatsApp.

## ✨ Features

* 🚘 Browse and search vehicles
* 📅 Check vehicle availability
* 💰 View rental prices
* 📋 Request reservations
* 💬 WhatsApp provider communication
* 🤖 AI-powered vehicle recommendations
* 🔐 Authentication & authorization
* 📊 Admin Dashboard
* 👤 User management
* 🚗 Vehicle management
* 📋 Booking management
* 📱 Responsive design

## 📊 Admin Dashboard

The Admin Dashboard is available **only to administrators**.

Admins can manage:

* Users
* Vehicles
* Bookings
* Vehicle availability

Providers use the platform as normal users and **do not have access to the dashboard**.

## 🧠 AI Assistant

The integrated AI assistant helps users find suitable vehicles based on their requirements, such as:

* Trip type
* Number of passengers
* Vehicle size
* User preferences

## 🛠️ Tech Stack

**Frontend**

* Next.js
* React
* TypeScript
* Tailwind CSS

**Backend**

* Next.js API Routes
* Node.js
* Prisma

**Database**

* PostgreSQL

**Other**

* OpenAI API
* TanStack Query
* Axios
* Git & GitHub

## 👥 Roles

| Role       | Access                                   |
| ---------- | ---------------------------------------- |
| `USER`     | Browse vehicles and request reservations |
| `PROVIDER` | Uses the platform as a normal user       |
| `ADMIN`    | Full access to the Admin Dashboard       |

## 🚀 Getting Started

```bash
git clone https://github.com/IbrahimAlameddine/PressDrive.git
cd PressDrive
npm install
npx prisma generate
```

Create a `.env` file:

```env
DATABASE_URL=
DIRECT_URL=
OPENAI_API_KEY=
```

Run migrations:

```bash
npx prisma migrate deploy
```

Start the application:

```bash
npm run dev
```

## 🚀 Production

PressDrive is configured for production deployment.

```bash
npm run build
npm start
```

---

<p align="center">
  <strong>PressDrive — Find your ride. Press the drive.</strong>
</p>

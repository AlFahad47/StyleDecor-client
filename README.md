# ✨ StyleDecor | Event Decoration Booking Platform

> **Live Website:** [https://styledecor-d90b4.web.app/](https://styledecor-d90b4.web.app/)

---

## 👋 About The Project

Welcome to **StyleDecor**!

This project was born out of a desire to streamline the chaotic process of event planning. Usually, booking a decorator involves endless phone calls and vague status updates. StyleDecor solves this by creating a centralized platform where:

1.  **Users** can browse premium decoration packages and book them instantly.
2.  **Decorators** (Staff) have a dedicated dashboard to manage their tasks step-by-step.
3.  **Admins** oversee the entire operation with data-driven insights.

It is a full-stack MERN application focusing on **Role-Based Access Control (RBAC)** and a seamless **Stripe Payment** experience.

---

## 🚀 Key Features

### 🛍️ For Customers (Users)

- **Smart Search & Filter:** Easily find services by category (Wedding, Corporate, etc.) or budget range.
- **Seamless Booking:** Real-time availability checks and instant booking.
- **Secure Payments:** Integrated **Stripe** gateway for safe and secure transactions.
- **Dashboard:** View booking history, payment receipts, and real-time status updates of their event.

### 🎨 For Decorators (Staff)

- **Strict Workflow:** A unique "Step-by-Step" status update system. Decorators cannot skip steps (e.g., they must mark "Materials Prepared" before "On the Way"), ensuring accountability.
- **Visual Schedule:** A daily timeline view of assigned tasks.
- **Earnings Tracker:** A transparent view of completed jobs and payment history.

### 🛡️ For Admins

- **Visual Analytics:** Interactive charts (Recharts) displaying revenue, service demand, and user growth.
- **Team Management:** Ability to promote users to Decorators or Admins and manage account statuses.
- **Service Control:** Full CRUD capabilities for decoration packages.

---

## 🛠️ Technologies & NPM Packages

I chose the **MERN Stack** for its flexibility and robust ecosystem. Here are the specific packages that power StyleDecor:

### **Frontend (Client)**

| Category          | Package                    | Purpose                               |
| :---------------- | :------------------------- | :------------------------------------ |
| **Core**          | `react`, `react-dom`       | UI Library                            |
| **Routing**       | `react-router-dom`         | Client-side navigation                |
| **State/Fetch**   | `@tanstack/react-query`    | Server state management & caching     |
| **HTTP**          | `axios`                    | API Requests                          |
| **Styling**       | `tailwindcss`, `daisyui`   | Styling & Component Library           |
| **Animations**    | `framer-motion`            | Page transitions & micro-interactions |
| **Payments**      | `@stripe/react-stripe-js`  | Stripe UI Elements                    |
| **Maps**          | `react-leaflet`, `leaflet` | Service coverage map                  |
| **Charts**        | `recharts`                 | Admin analytics visualization         |
| **Notifications** | `sweetalert2`              | User feedback alerts                  |

### **Backend (Server)**

| Category      | Package          | Purpose                                 |
| :------------ | :--------------- | :-------------------------------------- |
| **Framework** | `express`        | Node.js web framework                   |
| **Database**  | `mongodb`        | Database driver                         |
| **Auth**      | `firebase-admin` | Verifying Firebase tokens on the server |
| **Security**  | `cors`, `dotenv` | Middleware & Env variables              |
| **Payments**  | `stripe`         | Server-side payment processing          |

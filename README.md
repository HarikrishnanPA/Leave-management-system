# 🗓️ Leave Management System (LMS)

A modern, role-based Leave Management System designed to simplify leave tracking, approvals, and holiday management for organizations. The system provides a clean calendar-driven UI, real-time leave status visibility, and secure role-based access.

---

## 🚀 Project Overview

The Leave Management System enables employees to apply for leaves, managers to review and approve them, and admins to manage organization-wide policies such as holidays and leave balances.

The project emphasizes:
- Intuitive frontend UX
- Calendar-based leave visualization
- Clear role separation
- Scalable API-driven architecture

---

## 👥 User Roles

### 🧑‍💼 Admin
- Manage company holidays
- View all employee leave balances
- Configure leave policies
- Soft delete and restore records

### 🧑‍💻 Manager
- Review team leave requests
- Approve or reject leave applications
- View team leave calendar

### 👤 Employee
- Apply for leave
- View leave status (Approved / Pending / Rejected)
- Track leaves via monthly calendar view

---

## 🖥️ Frontend Features

- 📆 Interactive calendar view with monthly navigation
- 🎨 Visual indicators for:
  - Approved leaves
  - Pending leaves
  - Company holidays
- 🔄 Real-time UI updates
- 🎯 Role-based UI rendering
- 🧹 Soft delete support (non-destructive)
- ✨ Clean and consistent design system

---

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Lucide Icons
- Axios

### Backend
- Spring Boot
- Spring Security
- JWT Authentication
- Hibernate / JPA

### Database
- MySQL / PostgreSQL

---

## 📁 Project Structure (Frontend)

src/
│
├── api/ # API service calls
├── components/ # Reusable UI components
├── pages/ # Page-level components
├── hooks/ # Custom React hooks
├── utils/ # Utility functions
├── styles/ # Global styles
└── App.tsx


---

## 🔄 Calendar Logic (Overview)

- Determines first day and total days of the month
- Dynamically generates calendar weeks
- Maps leave data (approved, pending, holidays) to dates
- Applies conditional styling based on leave type

---

## 🔐 Authentication & Authorization

- JWT-based authentication
- Role-based route protection
- Backend-enforced access control using Spring Security

---

## 🧪 Error Handling

- Graceful API error handling
- User-friendly messages
- Console logging during development

---

## 📈 Future Enhancements

- Leave analytics dashboard
- Export reports (PDF / Excel)
- In-app and email notifications
- Mobile responsiveness
- Multi-organization support

---

## 🧑‍🤝‍🧑 Team

Frontend Development  
Backend API Development  
UI/UX Design  

---

## 📄 License

This project is developed for internal, academic, or demonstration purposes.

# 📚 **Library Management System - Admin Dashboard**

## **Overview**

Welcome to the **Library Management System - Admin Dashboard**, a modern web application built to simplify library operations. This project is developed using **Next.js (App Router)**, **TypeScript**, **MUI**, and **Redux Toolkit**, providing a robust and responsive interface for managing users, roles, and permissions.

With an advanced **Role-Based Access Control (RBAC)** system, admins can efficiently manage roles, permissions, and users while ensuring data security. 🚀

---

## **Features** ✨

- ✅ **Fully Responsive Design**: Seamless access across all devices.
- 🔧 **State Management**: Powered by **Redux Toolkit** for scalability and efficiency.
- 📊 **Admin Dashboard**: At-a-glance statistics on Total Users, Total Roles, Active Members, and Recent Activities.
- 🛡️ **RBAC Integration**: Manage roles and permissions securely and efficiently.
- 👥 **User Management**: Add, edit, or deactivate users while assigning roles with ease.

---

## **🔑 Login Information**

| **Email**          | **Password**  |
|---------------------|---------------|
| `admin@gmail.com`   | `Test@123`    |

- This login information is stored in cookies.
- If the cookie is absent, middleware restricts access to internal paths, ensuring security.

---

## **Key Definitions**

### **Role-Based Access Control (RBAC)**

RBAC ensures users can only access resources they need, based on their assigned role. Each role bundles a set of permissions defining the actions a user can perform.

### **Core Functionalities**

| **Feature**        | **Description**                                                                 |
|---------------------|-------------------------------------------------------------------------------|
| **Roles**          | Admins manage roles with specific permissions. Roles can be created or edited. |
| **Permissions**    | Define specific actions (e.g., add, edit, view) for modules like Books, Users. |
| **Users**          | Users inherit permissions from their roles. Their active/inactive status controls access. |

---

## **Detailed Breakdown with Examples**

### **1. Role Management** 🛠️

Roles bundle permissions to define what actions users can perform.

| **Role**              | **Permissions**                                      |
|------------------------|-----------------------------------------------------|
| **Manager**           | Full system access.                                  |
| **Librarian**         | Manage books and member records.                     |
| **Library Assistant** | View books and member records.                       |
| **Research Assistant**| Temporary role to view books only.                   |

---

### **2. Permission Management** 🔒

Permissions are building blocks of roles and define specific actions within modules.

| **Module**   | **Permission Types**         |
|--------------|------------------------------|
| **Books**    | Add, Edit, Delete, View      |
| **Users**    | Add, Edit, Deactivate, View  |
| **Members**  | Add, Edit, Deactivate, View  |

Permissions are assigned to roles, and users inherit permissions based on their roles.

---

### **3. User Management** 👤

Admins can manage users by:
- Adding new users and assigning roles.
- Modifying roles or permissions for existing users.
- Deactivating users to restrict access.

| **Action**               | **Description**                                         |
|---------------------------|-------------------------------------------------------|
| **Adding a New Employee** | Assign a role like "Library Assistant" to new users.  |
| **Promoting a User**      | Change roles, e.g., from "Librarian" to "Manager."    |
| **Restricting Access**    | Set a user's status to "Inactive" to revoke access.   |

---

## **Tech Stack** 🛠️

| **Technology**       | **Purpose**                                      |
|-----------------------|-------------------------------------------------|
| **Next.js (App Router)** | Framework for building the application.       |
| **TypeScript**        | Strongly typed language for better development. |
| **Redux Toolkit**     | State management for scalable solutions.        |
| **MUI**              | UI components for a modern interface.           |
| **Formik + Yup**      | Form handling and validation.                   |

---

## **Getting Started** 🚀

### **Prerequisites**
- Ensure **Node.js** and **npm** (or **yarn**) are installed.

### **Installation**

1. **Clone the Repository**
   ```bash
   git clone <repository-url>

2. **Install Dependencies**
   ```bash
   npm install

3. **Run the Development Server**
   ```bash
   npm run dev

4. Open http://localhost:3000 in your browser to access the application.
---

## **Key Features in Action** 🔍

### **Adding a New Role**
1. Navigate to the **Roles** section.
2. Click **"Add New Role"**, provide a name, description, and initial permissions.
3. Save changes. Permissions can be modified anytime.

### **Assigning Permissions**
1. Go to the **Permissions** section.
2. Define permissions for specific modules.
3. Assign permissions to roles.

### **Managing Users**
1. Visit the **Users** page.
2. Add a new user or edit an existing one.
3. Assign roles and set user status.

---

## **Summary**

The **Library Management System - Admin Dashboard** is a cutting-edge, secure, and user-friendly solution for managing library operations. Featuring **RBAC**, responsive design, and robust state management, this system is ideal for libraries of all sizes. 🌟

---

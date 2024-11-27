# Library Management System - Admin Dashboard

## **Overview**

The **Library Management System - Admin Dashboard** is a comprehensive web application designed to streamline the management of library operations. Built with **Next.js (App Router)**, **TypeScript**, **MUI**, and **Redux Toolkit** for state management, the system provides an intuitive, fully responsive interface for managing users, roles, and permissions across all devices. Form validation is handled using **Formik** and **Yup**.

With a Role-Based Access Control (RBAC) mechanism, the system ensures secure and efficient task delegation. Admins can manage user roles, define permissions, and monitor activities with ease.

---

## **Features**

- **Fully Responsive Design**: Compatible with all devices for seamless access.
- **State Management**: Built using **Redux Toolkit** for efficient and scalable state handling.
- **Admin Dashboard**: Overview of Total Users, Total Roles, Active Members, and Recent Activities.
- **Role Management**: Create, edit, and assign roles with predefined permissions.
- **Permission Management**: Define specific permissions for modules like Books, Users, and Members.
- **User Management**: Add, edit, or deactivate users and assign roles.

---

## **Key Definitions**

### **Role-Based Access Control (RBAC)**

RBAC ensures users have access only to the resources they need based on their assigned role. Each role bundles a set of permissions defining the actions a user can perform.

### **Core Functionalities**

1. **Roles**: Admins can manage roles with specific permissions. New roles can be created with a descriptive name and initial permissions, which can be updated later.
   
2. **Permissions**: Permissions define specific actions like adding, editing, or viewing data. Permissions are assigned to roles and can be customized as needed.

3. **Users**: Users are assigned roles and inherit the permissions associated with those roles. Their status (active/inactive) determines their access.

---

## **Detailed Breakdown with Examples**

### **1. Role Management**

Roles bundle permissions to define what actions users can perform.

#### **Example: Common Library Roles**
- **Manager**: Full system access.
- **Librarian**: Manage books and member records.
- **Library Assistant**: View books and member records.
- **Research Assistant**: Temporary role to view books only.

---

### **2. Permission Management**

Permissions are building blocks of roles and define what actions can be performed within the system.

#### **Example: Permissions for the Books Module**
- Add Books
- Edit Books
- Delete Books
- View Books

Permissions are grouped into roles. For instance:
- **Manager**: All permissions.
- **Librarian**: Add, Edit, View Books.
- **Library Assistant**: View Books only.

---

### **3. User Management**

Admins can manage user accounts, assign roles, and modify their statuses.

#### **Example Scenarios**
- **Adding a New Employee**: Assign a role like "Library Assistant" to new users, granting predefined permissions.
- **Promoting a User**: Change a user's role from "Librarian" to "Manager" to expand their access.
- **Restricting Access**: Set a user's status to "Inactive" to revoke their access temporarily.

---

## **How It Works**

### **Scenario: Adding a New Role**
1. Admin navigates to the **Roles** page.
2. Clicks **"Add New Role"** and fills out the role name, description, and initial permissions.
3. Saves the role. Permissions can be modified later as needed.

---

### **Scenario: Assigning Permissions**
1. Navigate to the **Permissions** page.
2. Define permissions for a specific module (e.g., Books, Users).
3. Assign these permissions to roles via the **Roles** page.

---

### **Scenario: Managing Users**
1. Navigate to the **Users** page.
2. Add a new user or edit an existing one.
3. Assign roles to the user, determining their access and responsibilities.

---

## **Tech Stack**

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **UI Library**: MUI
- **Form Validation**: Formik and Yup
- **Responsive Design**: Fully optimized for all devices.

---

## **Getting Started**

### **Prerequisites**
- Node.js and npm/yarn installed.

### **Installation**
1. Clone the repository:
   ```bash
   git clone <repository-url>

2. Install dependencies:
   ```bash
   npm install

3. Start the development server:
   ```bash
    npm run dev

4. Open http://localhost:3000 in your browser to see the app.

Summary

The Library Management System - Admin Dashboard is a modern, user-friendly solution for managing libraries. By integrating RBAC and leveraging Redux Toolkit for state management, the system ensures secure and efficient access control while providing admins with powerful tools for role, permission, and user management. Its responsive design and advanced tech stack make it the perfect choice for libraries of any size.

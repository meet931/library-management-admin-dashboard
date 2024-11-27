# Library Management System - Admin Dashboard

The **Library Management System - Admin Dashboard** is a modern, efficient solution for managing users, roles, and permissions in a library setting. Built using **Next.js (App Router)**, **TypeScript**, and **MUI (Material-UI)**, this dashboard ensures streamlined access control and adaptability to organizational needs.

---

## **Key Definitions**

1. **User**: A person with an account in the library management system (e.g., Alice, Bob).
2. **Role**: A job title or designation that groups certain permissions (e.g., Manager, Librarian, Assistant).
3. **Permission**: A specific action that a user is allowed to perform (e.g., Add Book, Edit Book, View Records).

---

## **System Features**

### **1. Role Management**

Roles define what a user can do by bundling permissions together. Each user is assigned a role.

#### Example Roles:
- **Manager**: Full system control (e.g., Add/Edit/Delete Books, Add/Remove Users, View Records).
- **Librarian**: Manages books and records but cannot manage users (e.g., Add/Edit Books, View Records).
- **Library Assistant**: Limited to viewing books and member records.
- **Research Assistant** (Custom Role): Temporary role with restricted access (e.g., View Books Only).

---

### **2. Permission Management**

Permissions are the building blocks of roles, representing individual tasks users can perform.

#### Example Permissions:
- **Books**: Add, Edit, Delete, View.
- **Users**: Add, Edit, Delete, Change Status.
- **Records**: View Member Records.

#### How Permissions Relate to Roles:
- A **Manager** role might include all permissions.
- A **Librarian** role might only include book and record management permissions.

---

### **3. User Management**

Admins can add, update, and deactivate users, as well as assign or change roles to control user access.

#### Example Scenarios:
- **Adding a User**: Assign a role to give the user specific permissions.
- **Promoting a Librarian**: Change a user's role from Librarian to Manager, granting additional permissions.
- **Deactivating a User**: Temporarily disable a user’s access by marking them inactive.

---

## **Practical Scenarios**

### **Scenario 1: Adding a New Employee**
1. Admin creates a new user account for **David**.
2. Assigns the **Library Assistant** role, which includes permissions like "View Books."

### **Scenario 2: Promoting a Librarian**
1. Admin updates **Bob's** role from **Librarian** to **Manager**.
2. Bob gains additional permissions to manage users and records.

### **Scenario 3: Restricting Access**
1. **Charlie** takes leave. The admin marks his account as **Inactive**.
2. Charlie's account is disabled, restricting access.

### **Scenario 4: Updating a Role**
1. Admin adds "Delete Books" permission to the **Librarian** role.
2. All users with the Librarian role gain this new ability.

---

## **Summary Table**

| **Role**               | **Permissions**                                   | **Who?**        |
|-------------------------|---------------------------------------------------|-----------------|
| **Manager**             | Full Access (Add/Edit/Delete Books & Users, View Records) | Alice           |
| **Librarian**           | Add/Edit Books, View Records                     | Bob             |
| **Library Assistant**   | View Books, View Member Records                  | Charlie         |
| **Research Assistant**  | View Books Only                                  | David           |

---

## **Technologies Used**

1. **Next.js (App Router)**: A modern framework for building server-rendered React applications, ensuring scalability and performance.
2. **TypeScript**: For strong typing and reduced runtime errors.
3. **MUI (Material-UI)**: A component library for building user-friendly and responsive UI designs.

---

## **Setup and Development**

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

4. Modify `app/page.tsx` to customize the project further. The application auto-updates with your changes.

---

## **Deployment**

Deploy the app using the [Vercel Platform](https://vercel.com/new). Refer to the [Next.js deployment guide](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## **Learn More**

To dive deeper into the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs): Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn): Explore the official tutorial for hands-on learning.
- [MUI Documentation](https://mui.com/): Learn how to use Material-UI components.
- [TypeScript Documentation](https://www.typescriptlang.org/): Explore TypeScript's features and benefits.

---

This system ensures efficient user and access management, aligning roles and permissions with organizational responsibilities while leveraging modern web technologies for a seamless admin experience.

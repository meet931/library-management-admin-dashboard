"use client";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Select from "@/components/Select/Select";
import {
  addUser,
  deleteUser,
  // editUser,
  setSearchQuery,
  // toggleUserSelection,
  // bulkDeleteUsers,
  bulkUpdateRoles,
  updateUser,
  bulkDeleteUsers,
  toggleUserSelection,
} from "@/store/slices/usersSlice";
import { AppDispatch, RootState } from "@/store/store";
import IconService from "@/utils/icon";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserManagementPage: React.FC = () => {
  const { users, searchQuery, selectedUsers } = useSelector(
    ({ usersSlice }: RootState) => usersSlice
  );

  const { roles } = useSelector(({ rolesSlice }: RootState) => rolesSlice);
  const dispatch = useDispatch<AppDispatch>();
  console.log("Roles: ", roles);
  console.log("User: ", users);
  
  const statusList = ["Active", "Inactive"];

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    status: "",
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectUser = (userId: number) => {
    dispatch(toggleUserSelection(userId));
  };

  const handleAddUserModalOpen = () => {
    setIsAddUserModalOpen(true);
    setUserForm({
      name: "",
      email: "",
      password: "",
      role: "",
      status: "",
    });
  };

  const handleCloseModal = () => {
    setIsAddUserModalOpen(false);
    setIsEditUserModalOpen(false);
    setEditUserId(null);
  };

  const handleEditUserModalOpen = (user) => {
    setEditUserId(user.id);
    setUserForm({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
      status: user.status,
    });
    setIsEditUserModalOpen(true);
  };

  const handleSaveUser = () => {
    if (editUserId) {
      dispatch(updateUser({ id: editUserId, ...userForm }));
    } else {
      dispatch(addUser(userForm));
    }
    handleCloseModal();
  };

  const handleDeleteUser = (id: number) => {
    dispatch(deleteUser(id));
  };

  const handleBulkDelete = () => {
    dispatch(bulkDeleteUsers());
  };

  const handleBulkUpdateRoles = () => {
    const newRole = prompt(
      "Enter new role for selected users: (Admin, Librarian, Member)"
    );
    if (newRole && roles.includes(newRole)) {
      dispatch(bulkUpdateRoles(newRole));
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="user-management-page">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold">User Management</h1>
        <nav>
          <ul className="flex gap-2 text-gray-500">
            <li>Dashboard</li>
            <li>/</li>
            <li>Permissions</li>
          </ul>
        </nav>
      </header>

      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 mt-4">
        <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
          <Input
            type="text"
            placeholder="Search users by name, email, or role"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="flex gap-4">
          <Select
            name="role"
            value={userForm.role}
            onChange={handleFilterChange}
            option="Select Role"
            contentList={roles}
          />
          <Select
            name="status"
            value={userForm.status}
            onChange={handleFilterChange}
            option="Select Status"
            contentList={statusList}
          />
        </div>
        <Button
          buttonName="Add User"
          className="bg-blue-500 text-white hover:bg-blue-600 mt-4 sm:mt-0"
          onClick={handleAddUserModalOpen}
        />
      </div>

      {/* User Table */}
      <div className="p-4">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Users</h2>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">
                <input
                  type="checkbox"
                  checked={selectedUsers.length === users.length}
                  onChange={() => dispatch(bulkDeleteUsers())}
                />
              </th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Role</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="border border-gray-300 p-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleSelectUser(user.id)}
                  />
                </td>
                <td className="border border-gray-300 p-2 text-center">{user.name}</td>
                <td className="border border-gray-300 p-2 text-center">{user.email}</td>
                <td className="border border-gray-300 p-2 text-center">{user.role}</td>
                <td className="border border-gray-300 p- text-center">{user.status}</td>
                <td className="border border-gray-300 p-2 text-center">
                  <button
                    onClick={() => handleEditUserModalOpen(user)}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    <Image
                      src={IconService.edit_icon.src}
                      width={20}
                      height={20}
                      alt="Edit"
                    />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-500 hover:underline"
                  >
                    <Image
                      src={IconService.delete_icon.src}
                      width={20}
                      height={20}
                      alt="Delete"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedUsers.length > 0 && (
          <div className="flex gap-4 mt-4">
            <Button
              buttonName="Delete Selected"
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={handleBulkDelete}
            />
            <Button
              buttonName="Update Roles"
              className="bg-yellow-500 text-white hover:bg-yellow-600"
              onClick={handleBulkUpdateRoles}
            />
          </div>
        )}
      </div>

      {/* Add/Edit User Modal */}
      {(isAddUserModalOpen || isEditUserModalOpen) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 sm:w-1/2 lg:w-1/3">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">
              {isEditUserModalOpen ? "Edit User" : "Add New User"}
            </h3>
            <form>
              <Input
                labelName="Name"
                type="text"
                placeholder="Name"
                value={userForm.name}
                onChange={(e) =>
                  setUserForm((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
              <Input
                labelName="Email"
                type="email"
                placeholder="Email"
                value={userForm.email}
                onChange={(e) =>
                  setUserForm((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
              <Input
                labelName="Password"
                type="password"
                placeholder="Password"
                value={userForm.password}
                onChange={(e) =>
                  setUserForm((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
              <Select
                labelName="Role"
                value={userForm.role}
                onChange={handleFilterChange}
                contentList={roles}
              />
              <Select
                labelName="Status"
                value={userForm.status}
                onChange={handleFilterChange}
                contentList={statusList}
              />
              <div className="flex gap-4 mt-4">
                <Button
                  buttonName="Save"
                  className="bg-blue-500 text-white hover:bg-blue-600"
                  onClick={handleSaveUser}
                />
                <Button
                  buttonName="Cancel"
                  className="bg-gray-300 text-black hover:bg-gray-400"
                  onClick={handleCloseModal}
                />
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Add/Edit User Modal */}
      {(isAddUserModalOpen || isEditUserModalOpen) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 sm:w-1/2 lg:w-1/3">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">
              {isEditUserModalOpen ? "Edit User" : "Add New User"}
            </h3>
            <div className="mb-4">
              <Input
                labelName="Name"
                type="text"
                placeholder="Name"
                value={userForm.name}
                onChange={(e) =>
                  setUserForm({ ...userForm, name: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <Input
                labelName="Email"
                type="email"
                placeholder="Email"
                value={userForm.email}
                onChange={(e) =>
                  setUserForm({ ...userForm, email: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <Input
                labelName="Password"
                type="password"
                placeholder="Password"
                value={userForm.password}
                onChange={(e) =>
                  setUserForm({ ...userForm, password: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <Select
                labelName="Role"
                value={userForm.role}
                onChange={(e) =>
                  setUserForm({ ...userForm, role: e.target.value })
                }
                option="Select Role"
                contentList={roles}
              />
            </div>
            <div className="mb-4">
              <Select
                labelName="Status"
                value={userForm.status}
                onChange={(e) =>
                  setUserForm({ ...userForm, status: e.target.value })
                }
                option="Select Status"
                contentList={statusList}
              />
            </div>
            <div className="flex justify-end gap-4">
              <Button
                buttonName="Cancel"
                className="bg-gray-500 text-white hover:bg-gray-600"
                onClick={handleCloseModal}
              />
              <Button
                buttonName="Save User"
                className="bg-blue-500 text-white hover:bg-blue-600"
                onClick={handleSaveUser}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default UserManagementPage;

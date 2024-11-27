"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import {
  addModule,
  setPermissions,
  updatePermissions,
} from "@/store/slices/permissionsSlice";
import { AppDispatch, RootState } from "@/store/store";

const PermissionsPage: React.FC = () => {
  const { roles } = useSelector(({ rolesSlice }: RootState) => rolesSlice);
  const { rolesPermissions } = useSelector(
    ({ permissionsSlice }: RootState) => permissionsSlice
  );
  const dispatch = useDispatch<AppDispatch>();

  const [selectedRole, setSelectedRole] = useState<number>(roles[0]?.id || 0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newModuleName, setNewModuleName] = useState<string>("");
  // const [role, setRole] = useState([]);
  // console.log(role)

  // const initialModules = ["Books", "Users", "Members"];  

  // Handle role selection and set default permissions for a new role
  const handleRoleSelection = (roleId: number) => {
    console.log("Role ID: ", roleId);
    setSelectedRole(roleId);

    if (!rolesPermissions[roleId]) {
      const defaultPermissions = initialModules.reduce(
        (acc, module) => ({
          ...acc,
          [module]: { read: false, write: false, delete: false },
        }),
        {}
      );
      dispatch(setPermissions({ roleId, permissions: defaultPermissions }));
    }
  };

  // Handle permission changes
  const handlePermissionChange = (
    module: string,
    permissionType: "read" | "write" | "delete"
  ) => {
    const currentPermissionValue =
      rolesPermissions[selectedRole]?.[module]?.[permissionType] || false;
    dispatch(
      updatePermissions({
        roleId: selectedRole,
        moduleName: module,
        permissionType,
        value: !currentPermissionValue,
      })
    );
  };

  // Save changes
  const handleSave = () => {
    console.log("Saved Permissions for Role:", selectedRole);
    console.log("Roles Permissions:", rolesPermissions);
    alert("Permissions saved successfully!");
  };

  // Open/Close Modal
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewModuleName("");
  };

  // Add a new module dynamically
  const handleAddModule = () => {
    if (newModuleName.trim()) {
      dispatch(addModule({ roleId: selectedRole, moduleName: newModuleName }));
      handleCloseModal();
    } else {
      alert("Module name cannot be empty!");
    }
  };

  // Permissions for the selected role
const selectedPermissions = rolesPermissions[selectedRole] || {};

console.log("selectedPermissions", selectedPermissions);
  // Selected role name
  const selectedRoleName = roles.find((role) => role.id === selectedRole)?.role;

  return (
    <section className="permissions-page">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold">Permissions Management</h1>
        <nav>
          <ul className="flex gap-2 text-gray-500">
            <li>Dashboard</li>
            <li>/</li>
            <li>Permissions</li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row">
        {/* Role Selector Panel */}
        <aside className="w-full lg:w-1/4 border-b lg:border-r border-gray-200 p-4">
          <h2 className="text-lg font-semibold mb-4">Select Role</h2>
          <ul className="space-y-2">
            {roles.map((role) => (
              <li
                key={role.id}
                className={`p-2 cursor-pointer rounded-md hover:bg-gray-100 ${
                  selectedRole === role.id ? "bg-gray-100 font-bold" : ""
                }`}
                onClick={() => handleRoleSelection(role.id)}
              >
                {role.role}
              </li>
            ))}
          </ul>
        </aside>

        {/* Permission Grid */}
        <main className="w-full lg:w-3/4 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              Permissions for {selectedRoleName}
            </h2>
            <Button
              buttonName="Add Permission"
              className="bg-green-500 text-white hover:bg-green-600"
              onClick={handleOpenModal}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2 text-left">
                    Module
                  </th>
                  <th className="border border-gray-300 p-2 text-center">
                    Read
                  </th>
                  <th className="border border-gray-300 p-2 text-center">
                    Write
                  </th>
                  <th className="border border-gray-300 p-2 text-center">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(selectedPermissions).map((module) => (
                  <tr key={module}>
                    <td className="border border-gray-300 p-2">{module}</td>
                    {["read", "write", "delete"].map((permissionType) => (
                      <td
                        key={permissionType}
                        className="border border-gray-300 p-2 text-center"
                      >
                        <input
                          type="checkbox"
                          checked={
                            selectedPermissions[module]?.[permissionType] ||
                            false
                          }
                          onChange={() =>
                            handlePermissionChange(
                              module,
                              permissionType as "read" | "write" | "delete"
                            )
                          }
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="p-4 border-t border-gray-200 flex justify-end">
        <Button
          buttonName="Save Changes"
          className="bg-blue-500 text-white hover:bg-blue-600"
          onClick={handleSave}
        />
      </footer>

      {/* Add Permission Modal */}
      {isModalOpen && (
        <Modal>
          <h3 className="text-xl font-semibold mb-4">Add New Module</h3>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Module Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={newModuleName}
              onChange={(e) => setNewModuleName(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-4">
            <Button
              buttonName="Cancel"
              className="bg-gray-500 text-white hover:bg-gray-600"
              onClick={handleCloseModal}
            />
            <Button
              buttonName="Add Module"
              className="bg-blue-500 text-white hover:bg-blue-600"
              onClick={handleAddModule}
            />
          </div>
        </Modal>
      )}
    </section>
  );
};

export default PermissionsPage;

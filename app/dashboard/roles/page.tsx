"use client";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import { deleteRole, setRole, updateRole } from "@/store/slices/rolesSlice";
import { AppDispatch, RootState } from "@/store/store";
import IconService from "@/utils/icon";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { roleValidationSchema } from "@/schemas/roleSchemas";

const RoleManagementPage: React.FC = () => {
  const { roles } = useSelector(({ rolesSlice }: RootState) => rolesSlice);
  const { rolesPermissions } = useSelector(
    ({ permissionsSlice }: RootState) => permissionsSlice
  );

  console.log(roles);
  

  const dispatch = useDispatch<AppDispatch>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roleForm, setRoleForm] = useState({
    id: null,
    role: "",
    description: "",
    permissions: [],
  });

  // Handlers
  const handleOpenModal = (role = null) => {
    setRoleForm(
      role || { id: null, role: "", description: "", permissions: [] }
    );
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePermissionChange = (permission) => {
    setRoleForm((prev) => {
      const updatedPermissions = prev.permissions.includes(permission)
        ? prev.permissions.filter((perm) => perm !== permission)
        : [...prev.permissions, permission];
      return { ...prev, permissions: updatedPermissions };
    });
  };

  const handleDeleteRole = (id) => {
    dispatch(deleteRole(id));
  };

  // Formik hook for handling form state and validation
  const { values, errors, handleSubmit, touched, handleChange, handleBlur } =
    useFormik({
      initialValues: roleForm,
      validationSchema: roleValidationSchema,
      enableReinitialize: true,
      onSubmit: (values) => {
        if (roleForm.id) {
          dispatch(updateRole(values));
        } else {
          const newRole = {
            ...values,
            id: roles.length ? roles[roles.length - 1].id + 1 : 1,
          };
          dispatch(setRole(newRole));
        }
        handleCloseModal();
      },
    });

  return (
    <section className="role-management-page">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold">Role Management</h1>
        <nav>
          <ul className="flex gap-2 text-gray-500">
            <li>Dashboard</li>
            <li>/</li>
            <li>Roles</li>
          </ul>
        </nav>
      </header>

      <div className=" flex justify-end p-4">
        <Button
          buttonName="Add New Role"
          className="bg-blue-500 text-white hover:bg-blue-600"
          onClick={() => handleOpenModal(null)}
        />
      </div>

      {/* Role List */}
      <div className="p-4">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4">
          Roles
        </h2>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Role Name</th>
              <th className="border border-gray-300 p-2">Description</th>
              <th className="border border-gray-300 p-2">Permissions</th>
              <th className="border border-gray-300 p-2 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {(Array.isArray(roles) ? roles : []).map((role) => (
              <tr key={role.id}>
                <td className="border border-gray-300 p-2 text-center">
                  {role.role}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {role.description || "No Description"}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {(role.permissions || []).join(", ") || "No Permissions"}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <button
                    className="text-blue-500 hover:underline mr-2"
                    onClick={() => handleOpenModal(role)}
                  >
                    <Image
                      src={IconService.edit_icon.src}
                      width={20}
                      height={20}
                      alt="Roles"
                    />
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDeleteRole(role.id)}
                  >
                    <Image
                      src={IconService.delete_icon.src}
                      width={20}
                      height={20}
                      alt="Roles"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Role Modal */}
      {isModalOpen && (
        <Modal>
          <h3 className="text-xl sm:text-2xl font-semibold mb-4">
            {roleForm.id ? "Edit Role" : "Add New Role"}
          </h3>
          <form onSubmit={handleSubmit}>

            {/* Role Name */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">Role Name</label>
              <input
                type="text"
                name="role"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={values.role}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.role && touched.role && (
                <div className="text-red-500 text-sm">{errors.role}</div>
              )}
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">Description</label>
              <textarea
                name="description"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.description && touched.description && (
                <div className="text-red-500 text-sm">{errors.description}</div>
              )}
            </div>

            {/* Permissions */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">Permissions</label>
              <div className="flex flex-wrap gap-2">
                {Object.keys(rolesPermissions).map((roleId) => (
                  <div key={roleId} className="mb-4">
                    <h3 className="font-semibold">Role ID: {roleId}</h3>
                    {Object.keys(rolesPermissions[roleId]).map((moduleName) => (
                      <div key={moduleName} className="mb-2">
                        <h4 className="font-medium">{moduleName}</h4>
                        <div className="flex gap-2">
                          {["read", "write", "delete"].map((action) => (
                            <label
                              key={action}
                              className="flex items-center gap-2 text-sm sm:text-base"
                            >
                              <input
                                type="checkbox"
                                name={`permissions.${roleId}.${moduleName}.${action}`}
                                // checked={
                                //   values.permissions?.includes(action) ||
                                //   false
                                // }
                                onChange={() => handlePermissionChange(action)}
                              />
                              {action.charAt(0).toUpperCase() + action.slice(1)}
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                buttonName="Cancel"
                className="bg-gray-500 text-white hover:bg-gray-600"
                onClick={handleCloseModal}
              />
              <Button
                buttonName="Save Role"
                className="bg-blue-500 text-white hover:bg-blue-600"
                type="submit"
              />
            </div>
          </form>
        </Modal>
      )}
    </section>
  );
};

export default RoleManagementPage;

// permissionsSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types for module permissions
interface ModulePermissions {
  read: boolean;
  write: boolean;
  delete: boolean;
}

// Types for permissions
interface Permissions {
  [moduleName: string]: ModulePermissions;
}

interface PermissionState {
  rolesPermissions: {
    [roleId: number]: Permissions;
  };
}

// Load from localStorage if available
const loadPermissionsFromLocalStorage = (): PermissionState => {
  if (typeof window !== "undefined") {
    const savedPermissions = localStorage.getItem("rolesPermissions");
    if (savedPermissions) {
      return JSON.parse(savedPermissions);
    }
  }
  return { rolesPermissions: {} };
};

const initialState: PermissionState = loadPermissionsFromLocalStorage();

const permissionsSlice = createSlice({
  name: "permissionsSlice",
  initialState,
  reducers: {
    setPermissions: (
      state,
      action: PayloadAction<{ roleId: number; permissions: Permissions }>
    ) => {
      const { roleId, permissions } = action.payload;
      state.rolesPermissions[roleId] = permissions;
      savePermissionsToLocalStorage(state);
      // Pass dispatch function as argument to syncPermissionsToRole
      syncPermissionsToRole(state, roleId);
    },

    updatePermissions: (
      state,
      action: PayloadAction<{
        roleId: number;
        moduleName: string;
        permissionType: "read" | "write" | "delete";
        value: boolean;
      }>
    ) => {
      const { roleId, moduleName, permissionType, value } = action.payload;
      if (!state.rolesPermissions[roleId]) {
        state.rolesPermissions[roleId] = {};
      }
      if (!state.rolesPermissions[roleId][moduleName]) {
        state.rolesPermissions[roleId][moduleName] = {
          read: false,
          write: false,
          delete: false,
        };
      }
      state.rolesPermissions[roleId][moduleName][permissionType] = value;
      savePermissionsToLocalStorage(state);
      // Pass dispatch function as argument to syncPermissionsToRole
      syncPermissionsToRole(state, roleId);
    },

    addModule: (
      state,
      action: PayloadAction<{ roleId: number; moduleName: string }>
    ) => {
      const { roleId, moduleName } = action.payload;
      if (!state.rolesPermissions[roleId]) {
        state.rolesPermissions[roleId] = {};
      }
      if (!state.rolesPermissions[roleId][moduleName]) {
        state.rolesPermissions[roleId][moduleName] = {
          read: false,
          write: false,
          delete: false,
        };
      }
      savePermissionsToLocalStorage(state);
      // Pass dispatch function as argument to syncPermissionsToRole
      syncPermissionsToRole(state, roleId);
    },

    removeModule: (
      state,
      action: PayloadAction<{ roleId: number; moduleName: string }>
    ) => {
      const { roleId, moduleName } = action.payload;
      if (
        state.rolesPermissions[roleId] &&
        state.rolesPermissions[roleId][moduleName]
      ) {
        delete state.rolesPermissions[roleId][moduleName];
        savePermissionsToLocalStorage(state);
        // Pass dispatch function as argument to syncPermissionsToRole
        syncPermissionsToRole(state, roleId);
      }
    },
  },
});

// Helper function to sync permissions with the roles slice
const syncPermissionsToRole = (
  state: PermissionState,
  roleId: number
): string[] => {
  const rolePermissions = state.rolesPermissions[roleId];

  // Map over the modules and construct the permission strings
  const permissionsArray = Object.keys(rolePermissions).map((moduleName) => {
    const { read, write, delete: del } = rolePermissions[moduleName];

    // Build the permission string based on the selected permissions
    const permissionString = `${moduleName}:${read ? "read" : ""}${
      write ? " write" : ""
    }${del ? " delete" : ""}`;

    return permissionString.trim(); // Clean up the string to avoid extra spaces
  });

  return permissionsArray; // Return the permissions array
};

// Save updated state to localStorage
const savePermissionsToLocalStorage = (state: PermissionState) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("rolesPermissions", JSON.stringify(state));
  }
};

export const { setPermissions, updatePermissions, addModule, removeModule } =
  permissionsSlice.actions;
export default permissionsSlice.reducer;

// rolesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Role {
  id: number;
  role: string;
  description: string;
  permissions: string[];
}

interface RolesState {
  roles: Role[];
}

const initialState: RolesState = {
  roles: Array.isArray(JSON.parse(localStorage.getItem("roles") || "[]"))
    ? JSON.parse(localStorage.getItem("roles") || "[]")
    : [], // Ensure roles is always an array
};

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<Role>) => {
      // Append the new role to the existing roles array
      state.roles.push(action.payload);
      localStorage.setItem("roles", JSON.stringify(state.roles));
    },

    updateRole: (state, action: PayloadAction<Role>) => {
      const index = state.roles.findIndex((role) => role.id === action.payload.id);
      if (index !== -1) {
        state.roles[index] = action.payload;
        localStorage.setItem("roles", JSON.stringify(state.roles));
      }
    },

    deleteRole: (state, action: PayloadAction<number>) => {
      state.roles = state.roles.filter((role) => role.id !== action.payload);
      localStorage.setItem("roles", JSON.stringify(state.roles));
    },
  },
});

export const { setRole, updateRole, deleteRole } = rolesSlice.actions;
export default rolesSlice.reducer;

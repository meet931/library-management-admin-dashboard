// usersSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface UsersState {
  users: User[];
  searchQuery: string;
  selectedUsers: number[];
}

const initialState: UsersState = {
  users: [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Librarian",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Sara Lee",
      email: "sara.lee@example.com",
      role: "Member",
      status: "Active",
    },
  ],
  searchQuery: "",
  selectedUsers: [],
};

const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    addUser(state, action: PayloadAction<Omit<User, "id">>) {
      const newUser = {
        ...action.payload,
        id: state.users.length + 1,
      };
      state.users.push(newUser);
    },
    updateUser(state, action: PayloadAction<User>) {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser(state, action: PayloadAction<number>) {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    setSelectedUsers(state, action: PayloadAction<number[]>) {
      state.selectedUsers = action.payload;
    },
    toggleUserSelection: (state, action: PayloadAction<number>) => {
      const userId = action.payload;
      if (state.selectedUsers.includes(userId)) {
        state.selectedUsers = state.selectedUsers.filter((id) => id !== userId);
      } else {
        state.selectedUsers.push(userId);
      }
    },

    bulkDeleteUsers(state) {
      state.users = state.users.filter(
        (user) => !state.selectedUsers.includes(user.id)
      );
      state.selectedUsers = [];
    },
    bulkUpdateRoles(state, action: PayloadAction<string>) {
      const newRole = action.payload;
      state.users = state.users.map((user) =>
        state.selectedUsers.includes(user.id)
          ? { ...user, role: newRole }
          : user
      );
    },
  },
});

export const {
  setSearchQuery,
  addUser,
  updateUser,
  deleteUser,
  setSelectedUsers,
  toggleUserSelection,
  bulkDeleteUsers,
  bulkUpdateRoles,
} = usersSlice.actions;

export default usersSlice.reducer;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface User {
//     id: number;
//     name: string;
//     email: string;
//     role: string;
//     status: string;
// }

// interface UserState {
//     users: User[];
// }

// const initialState: UserState = {
//   users: [
//     {
//       id: 1,
//       name: "John Doe",
//       email: "john.doe@example.com",
//       role: "Admin",
//       status: "Active",
//     },
//     {
//       id: 2,
//       name: "Jane Smith",
//       email: "jane.smith@example.com",
//       role: "Librarian",
//       status: "Inactive",
//     },
//     {
//       id: 3,
//       name: "Sara Lee",
//       email: "sara.lee@example.com",
//       role: "Member",
//       status: "Active",
//     },
//   ],
// };

// const usersSlice = createSlice({
//     name: "users",
//     initialState,
//     reducers: {
//         setUser: (state, action) => {
//             state.users = action.payload;
//         },

//         updateUser: (state, action: PayloadAction<User>) => {
//             const index = state.users.findIndex(
//                 (user) => user.id === action.payload.id
//             );

//             if (index !== -1) {
//                 state.users[index] = action.payload;
//             }
//         },

//         deleteUser: (state) => {
//             state.users = [];
//         }
//     }
// });

// export const { setUser, updateUser, deleteUser } = usersSlice.actions;
// export default usersSlice.reducer;

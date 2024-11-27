import { configureStore } from "@reduxjs/toolkit";
import rolesSlice from "@/store/slices/rolesSlice";
import usersSlice from "@/store/slices/usersSlice";
import permissionsSlice from "@/store/slices/permissionsSlice";

const store = configureStore({
    reducer: {
        rolesSlice: rolesSlice,
        usersSlice: usersSlice,
        permissionsSlice: permissionsSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    user: "",
    refresh: null,
}

export const LoggedSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        loadingTrue: (state, action) => {
            state.loading = action.payload;
        },
        loadingFalse: (state, action) => {
            state.loading = action.payload;
        },
        setToken: (state, action) => {
            state.user = action.payload;
        },
        removeToken: (state, action) => {
            state.user = action.payload;
        },
        setRefresh: (state, action) => {
            state.refresh = action.payload;
        },
        removeRefresh: (state, action) => {
            state.refresh = action.payload;
        }
    }
}
)

export const { loadingTrue, loadingFalse, setToken, removeToken, setRefresh, removeRefresh } = LoggedSlice.actions;
export default LoggedSlice.reducer;
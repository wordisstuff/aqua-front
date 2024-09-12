export const INIT_STATE = {
    user: null,
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    isLoading: false,
    isError: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: INIT_STATE,
    extraReducers: builder => {
        builder
            .addCase(register.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(refreshUser.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload;
            })
            .addCase(logout.fulfilled, () => {
                return INIT_STATE;
            });
    },
});

export const authReducer = authSlice.reducer;

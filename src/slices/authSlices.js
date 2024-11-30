import { createSlice } from '@reduxjs/toolkit';
import { getStudent, getTeacher } from '../actions/authActions';

const initialState = {
    loading: false,
    full_name: null,
    group: null,
    error: null,
    success: null,
    subjects: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
      .addCase(getStudent.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getStudent.fulfilled, (state, { payload }) => {
        state.loading = false
        state.full_name = payload.full_name
        state.group = payload.group
        state.subjects = payload.group.subjects
      })
      .addCase(getStudent.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
      .addCase(getTeacher.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getTeacher.fulfilled, (state, { payload }) => {
        state.loading = false
        state.full_name = payload.full_name
        state.group = payload.group
        state.subjects = payload.subjects
      })
      .addCase(getTeacher.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      });
  },
})

// const studentSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(authUser.pending, (state) => {
//         state.isLoadingAuth = true;
//         state.error = null;
//       })
//       .addCase(authUser.fulfilled, (state, { payload }) => {
//         state.isLoadingAuth = false;
//         state.isAuth = true;
//       })
//       .addCase(authUser.rejected, (state, { payload }) => {
//         state.isLoadingAuth = false;
//         state.error = payload;
//       });
//   },
// });

export default authSlice.reducer;
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = 'http://127.0.0.1:8000'
export const getStudent = createAsyncThunk(
  'auth/student',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${backendURL}/api/user/${id}/student`
      )
      return data
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const getTeacher = createAsyncThunk(
  'auth/teacher',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${backendURL}/api/user/${id}/teacher`
      )
      return data
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)
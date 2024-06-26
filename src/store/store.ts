import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../components/TodoSlice'

export const store = configureStore({
  reducer: {
    todoReducer: todoReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

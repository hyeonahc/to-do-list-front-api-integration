import { configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import todoReducer from '../components/TodoSlice'

export const store = configureStore({
  reducer: {
    todoReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

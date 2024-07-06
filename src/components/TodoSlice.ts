import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ITodos, ITodosState } from '../types/todoTypes'
import { addTodo, deleteTodo, fetchAllTodos, updateTodo } from './todoThunks'

const initialState: ITodosState = {
  todos: [],
  newTodoValue: '',
  editModeId: null,
  editText: '',
  loading: false,
  error: null,
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<ITodos[]>) => {
      state.todos = action.payload
    },
    setNewTodoValue: (state, action: PayloadAction<string>) => {
      state.newTodoValue = action.payload
    },
    setEditModeId: (state, action: PayloadAction<string | null>) => {
      state.editModeId = action.payload
    },
    setEditText: (state, action: PayloadAction<string>) => {
      state.editText = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllTodos.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchAllTodos.fulfilled,
        (state, action: PayloadAction<ITodos[]>) => {
          state.loading = false
          state.todos = action.payload
        }
      )
      .addCase(fetchAllTodos.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(addTodo.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(addTodo.fulfilled, state => {
        state.loading = false
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(updateTodo.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(updateTodo.fulfilled, state => {
        state.loading = false
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(deleteTodo.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteTodo.fulfilled, state => {
        state.loading = false
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { setTodos, setNewTodoValue, setEditModeId, setEditText } =
  todoSlice.actions

export default todoSlice.reducer

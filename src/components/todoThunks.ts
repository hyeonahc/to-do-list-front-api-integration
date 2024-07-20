import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  addTodoApi,
  deleteTodoApi,
  fetchAllTodosApi,
  updateTodoApi,
} from '../api/todoApi'

// With Type Annotations
// export const fetchAllTodos = createAsyncThunk<
//   ITodos[],
//   void,
//   { rejectValue: string }
// >('todo/fetchAllTodos', async (_, thunkAPI) => {
//   try {
//     const data = await fetchAllTodosApi()
//     return data
//   } catch (error) {
//     return thunkAPI.rejectWithValue('Failed to fetch todos')
//   }
// })

// Without Type Annotations
export const fetchAllTodos = createAsyncThunk(
  'todo/fetchAllTodos',
  async (_, thunkAPI) => {
    try {
      const data = await fetchAllTodosApi()
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch todos')
    }
  }
)

export const addTodo = createAsyncThunk<void, string, { rejectValue: string }>(
  'todo/addTodo',
  async (text, thunkAPI) => {
    try {
      await addTodoApi(text)
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to add todo')
    }
  }
)

export const updateTodo = createAsyncThunk<
  void,
  { id: string | null; text: string },
  { rejectValue: string }
>('todo/updateTodo', async ({ id, text }, thunkAPI) => {
  try {
    await updateTodoApi(id, text)
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to update todo')
  }
})

export const deleteTodo = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>('todo/deleteTodo', async (id, thunkAPI) => {
  try {
    await deleteTodoApi(id)
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to delete todo')
  }
})

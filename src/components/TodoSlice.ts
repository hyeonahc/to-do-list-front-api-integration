import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface ITodos {
  id: string
  text: string
}

interface TodosState {
  todos: ITodos[]
  newTodoValue: string
  editModeId: string | null
  editText: string
}

const initialState: TodosState = {
  todos: [],
  newTodoValue: '',
  editModeId: null,
  editText: '',
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
})

export const { setTodos, setNewTodoValue, setEditModeId, setEditText } =
  todoSlice.actions

export default todoSlice.reducer

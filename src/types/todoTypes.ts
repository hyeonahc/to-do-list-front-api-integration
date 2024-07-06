export interface ITodos {
  id: string
  text: string
}

export interface ITodosState {
  todos: ITodos[]
  newTodoValue: string
  editModeId: string | null
  editText: string
  loading: boolean
  error: string | null
}

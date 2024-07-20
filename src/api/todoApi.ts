import axios from 'axios'
import { ITodos } from '../types/todoTypes'

const API_URL = 'http://localhost:8080/api'

export const fetchAllTodosApi = async (): Promise<ITodos[]> => {
  const {
    data: { data },
  } = await axios.get(`${API_URL}/getAllTodo`)
  return data
}

export const addTodoApi = async (text: string): Promise<void> => {
  await axios.post(`${API_URL}/addTodo`, { text })
}

export const updateTodoApi = async (
  id: string | null,
  text: string
): Promise<void> => {
  await axios.put(`${API_URL}/updateTodo`, { id, text })
}

export const deleteTodoApi = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/deleteTodo?id=${id}`)
}

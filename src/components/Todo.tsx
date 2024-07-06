import axios from 'axios'
import { ChangeEvent, KeyboardEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import {
  setEditModeId,
  setEditText,
  setNewTodoValue,
  setTodos,
} from './TodoSlice'

const Todo = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { todos, newTodoValue, editModeId, editText } = useSelector(
    (state: RootState) => state.todoReducer
  )

  useEffect(() => {
    getAllTodo()
  }, [])

  const changeEditText = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEditText(e.target.value))
  }

  const changeNewTodoValue = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setNewTodoValue(e.target.value))
  }

  const pressUpdateBtn = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      clickUpdate()
    }
  }

  const clickUpdate = () => {
    updateTodo()
    dispatch(setEditModeId(null))
  }

  const pressAddBtn = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      clickAdd()
    }
  }

  const clickAdd = () => {
    addTodo()
    dispatch(setNewTodoValue(''))
  }

  const clickEdit = (id: string) => {
    dispatch(setEditModeId(id))
  }

  const clickDelete = (id: string) => {
    deleteTodo(id)
  }

  const getAllTodo = async () => {
    try {
      const {
        data: { data },
      } = await axios.get('http://localhost:8080/api/getAllTodo')
      console.log(data)
      dispatch(setTodos(data))
    } catch (error) {
      console.log(error)
    }
  }

  const addTodo = async () => {
    const newTodo = {
      text: newTodoValue,
    }
    try {
      const response = await axios.post(
        'http://localhost:8080/api/addTodo',
        newTodo
      )
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
    getAllTodo()
  }

  const updateTodo = async () => {
    try {
      const editedTodo = {
        id: editModeId,
        text: editText,
      }
      const response = await axios.put(
        'http://localhost:8080/api/updateTodo',
        editedTodo
      )
      console.log(response.data.message)
    } catch (error) {
      console.log(error)
    }
    getAllTodo()
  }

  const deleteTodo = async (id: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/deleteTodo?id=${id}`
      )
      console.log(response.data.message)
    } catch (error) {
      console.log(error)
    }
    getAllTodo()
  }

  return (
    <div>
      <div>
        <input
          type='text'
          value={newTodoValue}
          onChange={changeNewTodoValue}
          onKeyDown={pressAddBtn}
        />
        <button onClick={clickAdd}>Add</button>
      </div>
      <div>
        <div>
          {todos &&
            todos.map(todo =>
              todo.id === editModeId ? (
                <div key={todo.id}>
                  <input
                    type='text'
                    value={editText}
                    onChange={changeEditText}
                    onKeyDown={pressUpdateBtn}
                  />
                  <button onClick={clickUpdate}>update</button>
                </div>
              ) : (
                <div key={todo.id}>
                  {todo.text}{' '}
                  <span
                    style={{
                      fontSize: '14px',
                      color: 'blue',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    }}
                    onClick={() => clickEdit(todo.id)}
                  >
                    edit
                  </span>{' '}
                  <span
                    style={{
                      fontSize: '14px',
                      color: 'OrangeRed',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    }}
                    onClick={() => clickDelete(todo.id)}
                  >
                    delete
                  </span>
                </div>
              )
            )}
        </div>
      </div>
    </div>
  )
}

export default Todo

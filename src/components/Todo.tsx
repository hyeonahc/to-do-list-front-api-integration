import axios from 'axios'
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'

interface ITask {
  id: string
  text: string
}

const Todo = () => {
  const [todos, setTodos] = useState<ITask[]>()
  const [newTodoValue, setNewTodoValue] = useState('')
  const [editModeId, setEditModeId] = useState<string | null>(null)
  const [editText, setEditText] = useState<string>('')
  const [todosTrigger, setTodosTrigger] = useState<number>(0)

  useEffect(() => {
    getAllTodo()
  }, [todosTrigger])

  const changeEditText = (e: ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value)
  }

  const changeNewTodoValue = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodoValue(e.target.value)
  }

  const pressUpdateBtn = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      clickUpdate()
    }
  }

  const clickUpdate = () => {
    updateTodo()
    setEditModeId(null)
  }

  const pressAddBtn = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      clickAdd()
    }
  }

  const clickAdd = () => {
    addTodo()
    setNewTodoValue('')
  }

  const clickEdit = (id: string) => {
    setEditModeId(id)
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
      setTodos(data)
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
    setTodosTrigger(todosTrigger + 1)
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
    setTodosTrigger(todosTrigger + 1)
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
    setTodosTrigger(todosTrigger + 1)
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

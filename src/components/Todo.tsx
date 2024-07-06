import { unwrapResult } from '@reduxjs/toolkit'
import { ChangeEvent, KeyboardEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { setEditModeId, setEditText, setNewTodoValue } from './TodoSlice'
import { addTodo, deleteTodo, fetchAllTodos, updateTodo } from './todoThunks'

const Todo = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { todos, newTodoValue, editModeId, editText } = useSelector(
    (state: RootState) => state.todoReducer
  )

  useEffect(() => {
    dispatch(fetchAllTodos())
  }, [dispatch])

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
    if (editModeId) {
      dispatch(updateTodo({ id: editModeId, text: editText }))
        .then(unwrapResult)
        .then(() => {
          dispatch(fetchAllTodos())
        })
        .catch(error => {
          console.error('Failed to update todo:', error)
        })
      dispatch(setEditModeId(null))
    }
  }

  const pressAddBtn = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      clickAdd()
    }
  }

  const clickAdd = () => {
    dispatch(addTodo(newTodoValue))
      .then(unwrapResult)
      .then(() => {
        dispatch(fetchAllTodos())
        dispatch(setNewTodoValue(''))
      })
      .catch(error => {
        console.error('Failed to add todo:', error)
      })
  }

  const clickEdit = (id: string) => {
    dispatch(setEditModeId(id))
  }

  const clickDelete = (id: string) => {
    dispatch(deleteTodo(id))
      .then(unwrapResult)
      .then(() => {
        dispatch(fetchAllTodos())
      })
      .catch(error => {
        console.error('Failed to delete todo:', error)
      })
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
                <button onClick={clickUpdate}>Update</button>
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
                  Edit
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
                  Delete
                </span>
              </div>
            )
          )}
      </div>
    </div>
  )
}

export default Todo

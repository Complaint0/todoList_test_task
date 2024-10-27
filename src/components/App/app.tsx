import React, { useState, useEffect, useCallback, useRef, FormEvent } from 'react';

import { data } from '../../utils/data';
import { ITodo } from '../../types/types';
import { nanoid } from 'nanoid';
import { TodoList } from '../ui/TodoList/todoList';
import { Form } from '../ui/Form/form';

import styles from './app.module.css'

enum FilterStatus {
  all,
  active,
  compelte
}

export const App = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [filteredTOdos, setfilteredTOdos] = useState<ITodo[]>([]);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(FilterStatus.all)
  const inputRef = useRef<HTMLInputElement | null>(null);

  const todosLeftCount = useCallback(() => {
    return todos.reduce((acc, todos) => {
      return !todos.isDone ? acc + 1 : acc
    }, 0)
  }, [todos])

  const addTodo = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      if (inputRef.current.value.length < 1) return
      const newTodo = {
        id: nanoid(),
        name: inputRef.current.value,
        isDone: false,
      }
     setTodos((prevtodo) => [...prevtodo, newTodo])
     inputRef.current.value = "";
    }
  }, [])

  const changeCheckedTodo = useCallback((id: string) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id)
          todo.isDone = !todo.isDone
        return todo
      })
      setTodos(newTodos)
  }, [todos])

  const removeTodo = useCallback((id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos)
}, [todos])

  useEffect(() => {
    setTodos(data)
    setfilteredTOdos(data)
  }, [])

  const showActiveTodos = useCallback(() => {
    const activeTodos = todos.filter((todo) => !todo.isDone)
    setfilteredTOdos(activeTodos)
    setFilterStatus(FilterStatus.active)
  }, [todos])

  const showCompleteTodos = useCallback(() => {
    const activeTodos = todos.filter((todo) => todo.isDone)
    setfilteredTOdos(activeTodos)
    setFilterStatus(FilterStatus.compelte)
  }, [todos])

  const showAllTodos = useCallback(() => {
    setfilteredTOdos(todos)
    setFilterStatus(FilterStatus.all)
  }, [todos])

  const clearCompleteTodos = useCallback(() => {
    const newTodos = todos.filter((item) => !item.isDone)
    setTodos(newTodos)
  }, [todos])

  useEffect(() => {
    switch (filterStatus) {
      case FilterStatus.all: {
        setfilteredTOdos(todos)
        break;
      }
      case FilterStatus.active: {
        showActiveTodos()
        break;
      }
      case FilterStatus.compelte: {
        showCompleteTodos();
        break;
      }
    }
  }, [todos])


  return (
    <>
      <h1 className={styles.app_title}>todo</h1>
      <Form addTodo={addTodo} inputRef={inputRef}/>
      <h2 className={styles.tasks_left}>Task to do - {todosLeftCount()}</h2>
      <TodoList todos={filteredTOdos} changeCheckedTodo={changeCheckedTodo} removeTodo={removeTodo}/>
      <div className={styles.interaction_buttons}>
        <div className={styles.filter_button_wrapper}>
          <button className={`${styles.filtered_button} ${filterStatus === FilterStatus.all && styles.filtered_button_active}`} onClick={showAllTodos}>All</button>
          <button data-cy= "showActiveTodos" className={`${styles.filtered_button} ${filterStatus === FilterStatus.active && styles.filtered_button_active}` } onClick={showActiveTodos}>Active</button>
          <button className={`${styles.filtered_button} ${filterStatus === FilterStatus.compelte && styles.filtered_button_active}`} onClick={showCompleteTodos}>Complete</button>
        </div>
        <button data-cy= "clearTodos" className={`${styles.filtered_button} ${styles.clear_btn}`} onClick={clearCompleteTodos}>Clear</button>
      </div>
    </>
  );
}

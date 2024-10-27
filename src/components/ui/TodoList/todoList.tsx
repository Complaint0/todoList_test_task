import { ITodo } from "../../../types/types"
import { TodoItem } from "../TodoItem/todoItem"

import styles from './todoList.module.css'

type ITodoList = {
    todos: ITodo[],
    changeCheckedTodo: (id: string) => void
    removeTodo: (id: string) => void
}

export const TodoList = ({todos, changeCheckedTodo, removeTodo} : ITodoList) => {
    return (
    <ul className={styles.todoList} data-testid = "todoList">
        {todos.map((item) => (
            <li key= {item.id} className={styles.todoItem} data-cy="listItem">
                <TodoItem item = {item} changeCheckedTodo={changeCheckedTodo} removeTodo={removeTodo}/>
          </li>
        ))}
    </ul>
    )
}
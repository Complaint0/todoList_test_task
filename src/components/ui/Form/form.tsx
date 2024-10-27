import { FormEvent, memo } from 'react'
import styles from './form.module.css'

type IForm = {
    addTodo: (e:FormEvent) => void
    inputRef: React.MutableRefObject<HTMLInputElement | null>
} 

export const Form = memo(({addTodo, inputRef}: IForm) => {
    return (
        <>
        <form className={styles.addTodo_form} onSubmit={addTodo}>
            <input data-cy = "form_input" type="text" ref = {inputRef} className={styles.addTodo_input} placeholder='What needs to be done?' />
            <button type='submit' className={styles.addTodo_submit}></button>
        </form>
      </>
    )
})
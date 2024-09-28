import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { Tasks } from './Tasks'
import styles from './Todo.module.css'

import { PlusCircle } from '@phosphor-icons/react'

export interface ITodo {
  id: number
  content: string
  checked: boolean
}

export function Todo() {

  const [ valueInput, setValueInput ] = useState('')

  const [ tasks, setTasks ] = useState<ITodo[]>([])

  function onCreateTodo(event: FormEvent) {
    event.preventDefault()

    setTasks((state) => {
      return [
        ...state,
        {
          id: state.length + 1,
          content: valueInput,
          checked: false
        }
      ]
    })

    setValueInput('')
  }

  function onInvalidInput(event: InvalidEvent<HTMLFormElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório.')
  }

  function handleChangeValueInput(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    setValueInput(event.target.value)
  }

  return (
    <main className={styles.todo}>

      <form onInvalid={onInvalidInput} onSubmit={onCreateTodo} className={styles.form}>
        <input required name='content' onChange={handleChangeValueInput} type='text' placeholder='Adicione um nova tarefa' value={valueInput} />
        <button type='submit'> 
          Criar
          <PlusCircle size={24} />
        </button>
      </form>

      <Tasks groupTodo={tasks} onEditOrDeleteTask={setTasks} />

    </main>
  )
}
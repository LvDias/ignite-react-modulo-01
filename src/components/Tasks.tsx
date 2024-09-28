import styles from './Tasks.module.css'

import { Check, ClipboardText, Trash } from '@phosphor-icons/react'
import { ITodo } from './Todo'
import { Dispatch, SetStateAction } from 'react'

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface ITasks {
  groupTodo: ITodo[]
  onEditOrDeleteTask: Dispatcher<ITodo[]>
}

export function Tasks({groupTodo, onEditOrDeleteTask}: ITasks) {

  const totalTodo = groupTodo.length
  const checkedTodo = groupTodo.filter(el => el.checked === true).length

  function handleDeleteTask(id: number) {
    const withoutTaskDeleted = groupTodo.filter(todo => todo.id !== id)

    onEditOrDeleteTask([...withoutTaskDeleted])
  }

  function handleCheckedTask(id: number) {
    onEditOrDeleteTask((state) => {
      for(const todo of groupTodo) {
        if(todo.id === id) {
          todo.checked = true
        }
      }
      return [...state]
    })
  }

  function handleUnCheckedTask(id: number) {
    onEditOrDeleteTask((state) => {
      for(const todo of groupTodo) {
        if(todo.id === id) {
          todo.checked = false
        }
      }
      return [...state]
    })
  }

  return (
    <div className={styles.tasks}>

      <header>
        <div className={styles.taskTodo}>
          <p className={styles.text}>Tarefas criadas</p>
          <p className={styles.number}>{ totalTodo }</p>
        </div>

        <div className={styles.taskDone}>
          <p className={styles.text}>Concluídas</p>
          <p className={styles.number}>{ totalTodo ? `${checkedTodo} de ${totalTodo}` : '0' }</p>
        </div>
      </header>

      <main className={styles.content}>

        {
          groupTodo.length === 0 ? (
            <div className={styles.nothing}>
              <ClipboardText size={56} />
              <div>
                <h3 className={styles.title}>Você ainda não tem tarefas cadastradas</h3>
                <h3 className={styles.desc}>Crie tarefas e organize seus itens a fazer</h3>
              </div>
            </div>
          ) : (
            <div className={styles.group}>
              {
                groupTodo.map(todo => {
                  return (
                    <div key={todo.id} className={styles.todo}>
                      {
                        todo.checked ? (
                          <>
                            <div onClick={() => handleUnCheckedTask(todo.id)} className={styles.circleChecked}>
                              <Check />
                            </div>
                            {/* <CheckCircle onClick={() => handleUnCheckedTask(todo.id)} className={styles.circleChecked} size={24} /> */}
                            <p className={styles.checked}>{todo.content}</p>
                          </>
                        ) : (
                          <>
                            <div onClick={() => handleCheckedTask(todo.id)} className={styles.circle} />
                            {/* <Circle onClick={() => handleCheckedTask(todo.id)} className={styles.circle} size={24} /> */}
                            <p>{todo.content}</p>
                          </>
                        )
                      }

                      <Trash onClick={() => handleDeleteTask(todo.id)} className={styles.trash} size={24} />
                    </div>
                  )
                })
              }
            </div>
          )
        }

      </main>

    </div>
  )
}
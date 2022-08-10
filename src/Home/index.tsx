import { useState } from 'react'
import { Card } from "../components/Card"
import * as Dialog from '@radix-ui/react-dialog';
import * as AlertDialog from '@radix-ui/react-alert-dialog';


import './styles.css'

type TaskProps = {
  id: number;
  name: string;
  time: string;

}

export function Home() {
  const [taskName, setTaskName] = useState("")
  const [todoTasks, setTodoTasks] = useState<TaskProps[]>([])
  const [todoId, setTodoId] = useState(0)
  const [newTaskName, setNewTaskName] = useState('')


  function handleAddTask() {
    const newTask = {
      name: taskName,
      time: new Date().toLocaleTimeString("pt-Br", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      }),
      id: todoId
    };

    if (Boolean(taskName) === false) {
      return
    }

    setTodoId(todoId + 1)
    setTodoTasks((prevState) => [newTask, ...prevState])
    setTaskName('')
  }


  function handleEditTask(name: string, time: string, id: number) {
    name = newTaskName
    time = new Date().toLocaleTimeString("pt-Br", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    })

    if (Boolean(name) === false) {
      return
    }

    for (var i = 0; i < todoTasks.length; i++) {
      if (todoTasks[i].id === id) {
        var editedName = todoTasks[i].name = name
        var editedTime = todoTasks[i].time = time
      }
    }

    const editedTask = {
      name: editedName!,
      time: editedTime!,
      id: id
    }

    var removeId = todoTasks.filter((task) => task.id !== id)
    setTodoTasks(removeId)
    setTodoTasks((prevState) => [editedTask, ...prevState])
    //console.log(todoTasks)
    setNewTaskName('')


  }


  const handleDeleteTask = (id: number) => {
      //console.log(todoTasks)
      var newTaskList = todoTasks.filter((task) => task.id !== id)
      //console.log(newTaskList)
      setTodoTasks(newTaskList)
  }


  return (
    <div className="todo">
      <h1 className='todo-title'>To-Do</h1>
      <input type="text" className="todo-input"
        placeholder="Digite sua tarefa aqui"
        onChange={event => setTaskName(event.target.value)}
        value={taskName}>
      </input>
      <button type='button' className='todo-button'
        onClick={handleAddTask}
      >Adicionar tarefa <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M12 22q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2q1.625 0 3.075.475 1.45.475 2.675 1.325L16.3 5.275q-.95-.6-2.025-.938Q13.2 4 12 4 8.675 4 6.338 6.337 4 8.675 4 12t2.338 5.663Q8.675 20 12 20q.8 0 1.55-.15t1.45-.425l1.5 1.525q-1.025.5-2.15.775T12 22Zm7-2v-3h-3v-2h3v-3h2v3h3v2h-3v3Zm-8.4-3.4-4.25-4.25 1.4-1.4 2.85 2.85 10-10.025 1.4 1.4Z" /></svg></button>
      <div className='card-list'>
        {todoTasks.map((task) => (
          <Card
            key={task.id}
            task={task.name}
            time={task.time}
            editTask={
              <Dialog.Root>
                <Dialog.Trigger className='edit-button'>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
                  </svg>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className='modal-overlay' />
                  <Dialog.Content className='modal-content'>
                    <Dialog.Title className='modal-title'>Edite a Tarefa</Dialog.Title>
                    <Dialog.Description className='modal-description'>Aqui você pode editar a sua tarefa</Dialog.Description>
                    <div>
                      <input
                        className='modal-input'
                        placeholder="Digite sua nova tarefa"
                        onChange={event => setNewTaskName(event.target.value)}
                        value={newTaskName}
                      />
                    </div>
                    <Dialog.Close className='modal-button' onClick={() => handleEditTask(task.name, task.time, task.id)}>Salvar alterações</Dialog.Close>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            }
            deleteTask={
              <AlertDialog.Root>
                <AlertDialog.Trigger className='delete-button'>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" />
                  </svg>
                </AlertDialog.Trigger>
                <AlertDialog.Portal>
                  <AlertDialog.Overlay className='modal-overlay' />
                  <AlertDialog.Content className='modal-content'>
                    <AlertDialog.Title className='modal-title'>Excluir Tarefa</AlertDialog.Title>
                    <AlertDialog.Description className='modal-description'>Tem certeza que deseja excluir esta tarefa?</AlertDialog.Description>
                    <AlertDialog.Action className='modal-button-red' onClick={() => handleDeleteTask(task.id)}>Sim, deletar tarefa</AlertDialog.Action>
                    <AlertDialog.Cancel className = 'modal-button-gray'>Cancelar</AlertDialog.Cancel>
                  </AlertDialog.Content>
                </AlertDialog.Portal>
              </AlertDialog.Root>
            }
          />
        )
        )}
      </div>
    </div>
  )
}
import { useState } from 'react'
import { Card } from "../components/Card"

import './styles.css'


export function Home() {
  const [taskName, setTaskName] = useState("")
  const [todoTasks, setTodoTasks] = useState([])
  const [todoId, setTodoId] = useState(0)


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
    setTodoId(todoId + 1)
    setTodoTasks((prevState) => [newTask, ...prevState])
  }


  function handleEditTask(name, time, id) {
    name = window.prompt('Edite a sua tarefa:')
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
      name: editedName,
      time: editedTime,
      id: id
    }

    var removeId = todoTasks.filter((task) => task.id !== id)
    setTodoTasks(removeId)
    setTodoTasks((prevState) => [editedTask, ...prevState])
    //console.log(todoTasks)


  }


  const handleDeleteTask = (id) => {
    if (window.confirm('Deseja excluir tarefa?')) {
      //console.log(todoTasks)
      var newTaskList = todoTasks.filter((task) => task.id !== id)
      //console.log(newTaskList)
      setTodoTasks(newTaskList)
    }
  }


  return (
    <div className="todo">
      <h1 className='todo-title'>To-Do</h1>
      <input type="text" className="todo-input"
        placeholder="Digite sua tarefa aqui"
        onChange={event => setTaskName(event.target.value)}>
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
              <button className='edit-button' onClick={() => handleEditTask(task.name, task.time, task.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M5 23.7q-.825 0-1.413-.588Q3 22.525 3 21.7v-14q0-.825.587-1.413Q4.175 5.7 5 5.7h8.925l-2 2H5v14h14v-6.95l2-2v8.95q0 .825-.587 1.412-.588.588-1.413.588Zm7-9Zm4.175-8.425 1.425 1.4-6.6 6.6V15.7h1.4l6.625-6.625 1.425 1.4-7.2 7.225H9v-4.25Zm4.275 4.2-4.275-4.2 2.5-2.5q.6-.6 1.438-.6.837 0 1.412.6l1.4 1.425q.575.575.575 1.4T22.925 8Z" />
                </svg>
              </button>}
            deleteTask={
              <button className='delete-button' aria-label="Excluir Tarefa" onClick={() => handleDeleteTask(task.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" />
                </svg>
              </button>}
          />
        )
        )}
      </div>
    </div>
  )
}


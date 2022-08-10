import { useState } from 'react'


type CardProps = {
task: string;
time: string;
editTask: any;
deleteTask: any;

}

export function Card( props: CardProps) {
    const [done, setDone] = useState(false)

    function setTaskDone() {
        setDone(!done)
    }
    return (
        <div className='card-container' id={done ? 'isDone' : 'notIsDone'}>
            <div className='card-text-content'>
                <strong>{props.task}</strong>
                <small>{props.time}</small>
            </div>
            <div className='functions'>
                <div>
                    {done ?
                    <button className='check-button'>
                        <svg onClick={setTaskDone} xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m10.6 16.2 7.05-7.05-1.4-1.4-5.65 5.65-2.85-2.85-1.4 1.4ZM5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h14q.825 0 1.413.587Q21 4.175 21 5v14q0 .825-.587 1.413Q19.825 21 19 21Zm0-2h14V5H5v14ZM5 5v14V5Z" />
                        </svg>
                    </button> :
                    <button className='check-button'>
                        <svg onClick={setTaskDone} xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h14q.825 0 1.413.587Q21 4.175 21 5v14q0 .825-.587 1.413Q19.825 21 19 21Zm0-2h14V5H5v14Z" />
                        </svg>
                    </button>}
                    </div>
                    {done? '' : <div>{props.editTask}</div> }
                <div>{props.deleteTask}</div>
            </div>
        </div>
    )
}
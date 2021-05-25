import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";

type PropsTodoListType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListsID: string) => void
    addTask: (title: string, todoListsID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListsID: string) => void
    filter: FilterValuesType
    changeTodoListFilter: (filterValue: FilterValuesType, todoListsID: string) => void
}

export const  TodoList: React.FC<PropsTodoListType> = (props) =>  {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const tasksJSX = props.tasks.map(t => {
        let taskClass = t.isDone ? 'is-done' : ""

        const removeTask = () => props.removeTask(t.id, props.todoListID)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
        return (
            <li key={t.id} className={taskClass}>
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={changeTaskStatus}
                /> <span>{t.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        )
    })

    const onClickAddTask = () => {
        const validatedTitle = title.trim()
        if (validatedTitle) {
            props.addTask(validatedTitle, props.todoListID)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyPressAddTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onClickAddTask()
        }
    }

    const onCLickSetAllFilter = () => props.changeTodoListFilter('all', props.todoListID)
    const onCLickSetActiveFilter = () => props.changeTodoListFilter('active', props.todoListID)
    const onCLickSetCompletedFilter = () => props.changeTodoListFilter('completed', props.todoListID)
    let errorMessage = error ? <div style={{color: "red"}}>Title is requires!</div> : null

    return <div>
        <h3> {props.title}</h3>
        <div>
            <input
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onKeyPressAddTask}
                className={error ? "error" : ""}
            />
            <button onClick={onClickAddTask}>+</button>
            {errorMessage}
        </div>
        <ul>
            {tasksJSX}
        </ul>
        <div>
            <button className={props.filter === "all" ? 'active-filter' : ''}
                    onClick={onCLickSetAllFilter}>All
            </button>
            <button className={props.filter === "active" ? 'active-filter' : ''}
                    onClick={onCLickSetActiveFilter}>Active
            </button>
            <button className={props.filter === "completed" ? 'active-filter' : ''}
                    onClick={onCLickSetCompletedFilter}>Completed
            </button>
        </div>
    </div>
}

export default TodoList;
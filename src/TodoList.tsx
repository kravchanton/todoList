import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./addItemForm";

type PropsTodoListType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListsID: string) => void
    removeTodoList: (todoListID: string) => void
    addTask: (title: string, todoListsID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListsID: string) => void
    filter: FilterValuesType
    changeTodoListFilter: (filterValue: FilterValuesType, todoListsID: string) => void
}

export const TodoList: React.FC<PropsTodoListType> = (props) => {

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
    const addTask = (title: string) => {
        props.addTask(title, props.todoListID)
    }

    const onCLickSetAllFilter = () => props.changeTodoListFilter('all', props.todoListID)
    const onCLickSetActiveFilter = () => props.changeTodoListFilter('active', props.todoListID)
    const onCLickSetCompletedFilter = () => props.changeTodoListFilter('completed', props.todoListID)

    return <div>
        <h3> {props.title}
            <button
                onClick={() => props.removeTodoList(props.todoListID)}>x
            </button>
        </h3>
      <AddItemForm addItemForm={addTask} />
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
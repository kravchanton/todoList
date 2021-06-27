import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./addItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type PropsTodoListType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListsID: string) => void
    removeTodoList: (todoListID: string) => void
    addTask: (title: string, todoListsID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListsID: string) => void
    filter: FilterValuesType
    changeTaskTitle : (taskID: string, title: string, todoListsID: string) => void
    changeTodoListFilter: (filterValue: FilterValuesType, todoListsID: string) => void
}

export const TodoList: React.FC<PropsTodoListType> = (props) => {

    const tasksJSX = props.tasks.map(t => {
        let taskClass = t.isDone ? 'is-done' : ""
        const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.todoListID)
        const removeTask = () => props.removeTask(t.id, props.todoListID)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
        return (
            <li key={t.id} className={taskClass}>
                <Checkbox color={"primary"}
                       checked={t.isDone}
                       onChange={changeTaskStatus}
                />
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <IconButton onClick={removeTask}><Delete/></IconButton>
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
            <IconButton
                onClick={() => props.removeTodoList(props.todoListID)}><Delete />
            </IconButton>
        </h3>
        <AddItemForm addItemForm={addTask}/>
        <ul style={{listStyle: "none", padding: "0px"}}>
            {tasksJSX}
        </ul>
        <div>
            <Button
                size={'small'}
                variant={props.filter === "all" ? 'contained' : 'outlined'}
                color={'primary'}
              /*  className={props.filter === "all" ? 'active-filter' : ''}*/
                    onClick={onCLickSetAllFilter}>All
            </Button>
            <Button
                style={{marginLeft: "3px"}}
                size={'small'}
                variant={props.filter === "active" ? 'contained' : 'outlined'}
                color={"primary"}
/*
                className={props.filter === "active" ? 'active-filter' : ''}
*/
                    onClick={onCLickSetActiveFilter}>Active
            </Button>

            <Button
                style={{marginLeft: "3px"}}

                size={'small'}
                variant={props.filter === "completed" ? 'contained' : 'outlined'}
                color={'primary'}
                /*className={props.filter === "completed" ? 'active-filter' : ''}*/
                    onClick={onCLickSetCompletedFilter}>Completed
            </Button>
        </div>
    </div>
}

export default TodoList;
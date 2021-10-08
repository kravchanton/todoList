import React, {ChangeEvent, useCallback, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./addItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TodoListType} from "./AppWithRedux";
import {Task} from "./task";

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
    changeTodoListTitle: (title: string, todoListsIDL: string) => void
}

export const TodoList: React.FC<PropsTodoListType> = React.memo((props) => {


    const getFilteredTasks = () => {
        switch (props.filter) {
            case "active":
                return props.tasks.filter(t => !t.isDone)
            case "completed":
                return props.tasks.filter(t => t.isDone)
            default:
                return props.tasks
        }
    }

    const changeTaskTitle = useCallback((title: string, taskID: string) => props.changeTaskTitle(taskID, title, props.todoListID),[props.todoListID, props.changeTaskTitle])
    const removeTask = useCallback((taskID: string) => props.removeTask(taskID, props.todoListID),[props.todoListID, props.removeTask])
    const changeTaskStatus = useCallback((taskID: string, newIdDoneValue: boolean) => props.changeTaskStatus(taskID, newIdDoneValue, props.todoListID),[props.todoListID, props.changeTaskStatus])
    const tasks = getFilteredTasks()
    const tasksJSX = tasks.map(t => {

        return <Task key={t.id}
                     changeTaskStatus={changeTaskStatus}
                     removeTask={removeTask}
                     changeTaskTitle={changeTaskTitle}
                     task={t} />
    })
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todoListID)
    },[props.addTask, props.todoListID])

    const onCLickSetAllFilter = useCallback(() => props.changeTodoListFilter('all', props.todoListID),[props.todoListID, props.changeTodoListFilter])
    const onCLickSetActiveFilter = useCallback(() => props.changeTodoListFilter('active', props.todoListID),[props.todoListID, props.changeTodoListFilter])
    const onCLickSetCompletedFilter = useCallback(() => props.changeTodoListFilter('completed', props.todoListID),[props.todoListID, props.changeTodoListFilter])
    const changeTodoListTitle = useCallback((title: string) => props.changeTodoListTitle(title, props.todoListID),[props.changeTodoListTitle, props.todoListID])



    return <div>
        <h3> <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
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
})

export default TodoList
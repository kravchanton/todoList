import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./App";

export type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
    changeTaskTitle : (taskID: string, title: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {


    console.log("taskkk")
    let taskClass = props.task.isDone ? 'is-done' : ""
    const changeTaskTitle = (title: string) => props.changeTaskTitle(props.task.id, title)
    const removeTask = () => props.removeTask(props.task.id)
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.task.id, e.currentTarget.checked)

    return (
        <li key={props.task.id} className={taskClass}>
            <Checkbox color={"primary"}
                      checked={props.task.isDone}
                      onChange={changeTaskStatus}
            />
            <EditableSpan title={props.task.title} changeTitle={changeTaskTitle}/>
            <IconButton onClick={removeTask}><Delete/></IconButton>
        </li>
    )
});
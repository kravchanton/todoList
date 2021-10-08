import React, {ChangeEvent, useCallback} from 'react';
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

    let taskClass = props.task.isDone ? 'is-done' : ""
    const changeTaskTitle = useCallback((title: string) => props.changeTaskTitle(props.task.id, title),[props.changeTaskTitle, props.task.id])
    const removeTask = useCallback(() => props.removeTask(props.task.id),[props.removeTask, props.task.id])
    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.task.id, e.currentTarget.checked),[props.changeTaskStatus, props.task.id])

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
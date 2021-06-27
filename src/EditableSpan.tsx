import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {TextField} from "@material-ui/core";


export type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [title, setTitle] = useState<string>(props.title)
    const [editMode, setEditMode] = useState<boolean>(false)
    const onEnterOffEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            offEditMode()
        }
    }
    const onEditMode = () => setEditMode(true);
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    };

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        editMode ?
            <TextField variant={"outlined"} onBlur={offEditMode} onChange={changeTitle} autoFocus={true} value={title} onKeyPress={onEnterOffEditMode}/> :
            <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}
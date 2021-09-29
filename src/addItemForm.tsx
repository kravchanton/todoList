import React, {ChangeEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export type AddItemFormType = {
    addItemForm: (title: string) => void
}
export const AddItemForm = React.memo((props: AddItemFormType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const onClickAddItem = () => {
        const validatedTitle = title.trim()
        if (validatedTitle) {
            props.addItemForm(validatedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyPressAddItem = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(error !== false) {
            setError(false)
        }
        if (e.key === "Enter") {
            onClickAddItem()
        }
    }
    let errorMessage = error ? <div style={{color: "red"}}>Title is requires!</div> : null
    return (
        <div>
            <TextField variant={"outlined"}
                       value={title}
                       onChange={onChangeTitle}
                       onKeyPress={onKeyPressAddItem}
                       error={!!error}
                       label={"Title"}
                       helperText={error}
            />
            <IconButton
                color={"primary"}
                onClick={onClickAddItem}><AddBox /></IconButton>
            {errorMessage}
        </div>)
})
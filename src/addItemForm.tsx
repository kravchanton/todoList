import React, {ChangeEvent, useState} from "react";

export type AddItemFormType = {
    addItemForm: (title: string) => void
}
export function AddItemForm(props: AddItemFormType) {
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
        if (e.key === "Enter") {
            onClickAddItem()
        }
    }
    let errorMessage = error ? <div style={{color: "red"}}>Title is requires!</div> : null

    return (
    <div>
        <input
            value={title}
            onChange={onChangeTitle}
            onKeyPress={onKeyPressAddItem}
            className={error ? "error" : ""}
        />
        <button onClick={onClickAddItem}>+</button>
        {errorMessage}
    </div>)
}
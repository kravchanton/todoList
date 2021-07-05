import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";


export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    todoListID: string
}

type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListsTitleAT | ChangeTodoListFilterAT

type AddTodoListAT= {
    type: "ADD-TODOLIST"
    title: string
}

export type ChangeTodoListsTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    todoListID: string
    title: string

}

export type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER',
    todoListID: string
    filter: FilterValuesType
}

export function todolistsReducer(todoLists: Array<TodoListType>, action: ActionType) {

    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.todoListID)
        case "ADD-TODOLIST":
            let newTodoListID = v1();
            let newTodolist: TodoListType = {
                id: newTodoListID,
                title: action.title,
                filter: "all"
            }
            return [...todoLists, newTodolist]
        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl)
        default:
            return todoLists
    }

}

export const RemoveToDoListAC = (todoListID: string): RemoveTodoListAT => {
    return {
        type: "REMOVE-TODOLIST",
        todoListID: todoListID
    }
}

export const  AddTodoListAC = (title: string): AddTodoListAT => {
    return {
        type: "ADD-TODOLIST",
        title: title
    }
}
export const  ChangeTodoListTitleAC = (todoListID: string, title: string): ChangeTodoListsTitleAT => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        todoListID,
        title
    }
}
export const  ChangeTodoListFilterAC = (todoListID: string, filter: FilterValuesType): ChangeTodoListFilterAT => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        todoListID,
        filter
    }
}
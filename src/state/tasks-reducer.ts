import {FilterValuesType, TasksStateType, TaskType, TodoListType} from "../App";
import {v1} from "uuid";
import {keys} from "@material-ui/core/styles/createBreakpoints";


export type RemoveTaskAT = {
    type: "REMOVE-TASK"
    todoListID: string
    taskID: string
}
export type AddTaskAT = {
    type: "ADD-TASK"
    todoListID: string
    title: string
}

export type ChangeTaskStatusAT = {
    type: "CHANGE-TASK-STATUS"
    todoListID: string
    isDone: boolean
    taskID: string
}
export type ChangeTaskTitleAT = {
    type: "CHANGE-TASK-TITLE"
    todoListID: string
    title: string
    taskID: string
};

type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
    todoListId: string
}

type RemoveTodolistAT = {
    type: "REMOVE-TODOLIST"
    todoListID: string
}
type ActionType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodoListAT | RemoveTodolistAT


export function tasksReducer(state: TasksStateType, action: ActionType) {

    switch (action.type) {
        case "REMOVE-TASK": {
            let copyState = {...state}
            copyState[action.todoListID] = state[action.todoListID].filter(t => t.id !== action.taskID)
            return copyState
        }
        case "ADD-TASK": {
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }

            const copyState = {...state}
            copyState[action.todoListID] = [newTask, ...state[action.todoListID]]
            return copyState
        }
        case "CHANGE-TASK-STATUS": {
            const copyState = {...state}
            copyState[action.todoListID] = state[action.todoListID].map(t => t.id === action.taskID ? {
                ...t,
                isDone: action.isDone
            } : t)
            return copyState
        }
        case "CHANGE-TASK-TITLE": {
            const copyState = {...state}
            copyState[action.todoListID] = state[action.todoListID].map(t => t.id === action.taskID ? {
                ...t,
                title: action.title
            } : t)
            return copyState
        }
        case "ADD-TODOLIST": {
            return {...state, [action.todoListId]: []}
        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.todoListID]
            return copyState
        }


        default:
            throw new Error("I don't understand this type")
    }

}

export const removeTaskAC = (taskID: string, todoListID: string): RemoveTaskAT => {
    return {
        type: "REMOVE-TASK",
        todoListID,
        taskID
    }
}
export const addTaskAC = (title: string, todoListID: string): AddTaskAT => {
    return {
        type: "ADD-TASK",
        todoListID,
        title
    }
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string): ChangeTaskStatusAT => {
    return {
        type: "CHANGE-TASK-STATUS",
        taskID,
        todoListID,
        isDone
    }
}

export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string): ChangeTaskTitleAT => {
    return {
        type: "CHANGE-TASK-TITLE",
        taskID,
        todoListID,
        title
    }
}
export const RemoveTodolistAC = (todoListID: string): RemoveTodolistAT => {
    return {
        type: "REMOVE-TODOLIST",
        todoListID,
    }
}





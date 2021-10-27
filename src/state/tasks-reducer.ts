import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodoListType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    todolistId: string
    task: TaskType
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodoListType
    | SetTasksType

const initialState: TasksStateType = {
    //  'todoId1': []
    /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "SET-TASKS": {
            const copyState = {...state}
            copyState[action.todoListId] = action.tasks
            return copyState
        }
        case 'SET-TODO': {
            const copyState = {...state}
            action.todos.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', task, todolistId}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}

export const fetchTaskAC = (tasks: Array<TaskType>, todoListId: string) => {
    return {type: 'SET-TASKS', tasks, todoListId} as const
}

export type SetTasksType = ReturnType<typeof fetchTaskAC>


export const fetchTaskTC = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todoListId).then(res => {
            let tasks = res.data.items
            dispatch(fetchTaskAC(tasks, todoListId))

        })
    }
}

export const removeTaskTC = (todoListId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTask(todoListId, taskId).then(res => {
            const action = removeTaskAC(taskId, todoListId);
            dispatch(action);
        })
    }
}

export const addTaskTC = (todoListId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTask(todoListId, title).then(res => {
            const action = addTaskAC(res.data.data.item, todoListId);
            dispatch(action);
        })
    }
}

export const updateTaskTitleTC = (todoListId: string, taskId: string, title: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const tasks = getState().tasks[todoListId]
        const task = tasks.find(t => t.id === taskId)
        const newTask = {...task, title}
        console.log(newTask)
        debugger
        if (task) {
            todolistsAPI.updateTask(todoListId, taskId, {
                    title: title,
                    startDate: task.startDate,
                    priority: task.priority,
                    description: task.description,
                    deadline: task.deadline,
                    status: task.status
                }
            ).then(res => {
                const action = changeTaskTitleAC(taskId, title, todoListId);
                dispatch(action);
            })
        }
    }
}
export const updateTaskStatusTC = (todoListId: string, taskId: string, status: TaskStatuses) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const tasks = getState().tasks[todoListId]
        const task = tasks.find(t => t.id === taskId)
        const newTask = {...task, status}
        console.log(newTask)
        debugger
        if (task) {
            todolistsAPI.updateTask(todoListId, taskId, {
                    title: task.title,
                    startDate: task.startDate,
                    priority: task.priority,
                    description: task.description,
                    deadline: task.deadline,
                    status: status
                }
            ).then(res => {
                const action = changeTaskStatusAC(taskId, status, todoListId);
                dispatch(action);
            })
        }
    }
}
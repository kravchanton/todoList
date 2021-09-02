import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./addItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveToDoListAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    RemoveTodolistAC,
    tasksReducer
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = 'all' | 'active' | 'completed'


function AppWithRedux() {

 /*   // BLL:
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, dispatchToTodoLists] = useReducer(todolistsReducer, [
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"},

    ])*/

    let todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()
 /*   const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todoListID_1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'css', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: false},
            {id: v1(), title: 'Meat', isDone: false},
        ]
    })
*/

    function removeTask(taskID: string, todoListsID: string) {
        const action = removeTaskAC(taskID, todoListsID)
        dispatch(action)

    }

    function addTask(title: string, todoListsID: string) {
        const action = addTaskAC(title, todoListsID)
        dispatch(action)
    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListsID: string) {
        const action = changeTaskStatusAC(taskID, isDone, todoListsID)
        dispatch(action)
    }

    function changeTaskTitle(taskID: string, title: string, todoListsID: string) {
        const action = changeTaskTitleAC(taskID, title, todoListsID)
        dispatch(action)
    }

    function removeTodoList(todoListID: string) {
        const action = RemoveTodolistAC(todoListID)
        dispatch(action)


    }

    function changeTodoListFilter(filter: FilterValuesType, todoListsID: string) {
        const action = ChangeTodoListFilterAC(todoListsID, filter)
        dispatch(action)

    }

    function addTodoList(title: string) {
        const action = AddTodoListAC(title)
        dispatch(action)


    }

    function changeTodoListTitle(title: string, todoListsID: string) {
        const action = ChangeTodoListTitleAC(todoListsID, title)
        dispatch(action)
    }


    //UI:
    function getFilteredTasks(tl: TodoListType) {

        switch (tl.filter) {
            case "active":
                return tasks[tl.id].filter(t => !t.isDone)
            case "completed":
                return tasks[tl.id].filter(t => t.isDone)
            default:
                return tasks[tl.id]
        }
    }

    const todoListComponents = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={5} style={{padding: "20px"}}>
                    <TodoList title={tl.title}
                              tasks={getFilteredTasks(tl)}
                              removeTask={removeTask}
                              removeTodoList={removeTodoList}
                              changeTaskStatus={changeTaskStatus}
                              filter={tl.filter}
                              todoListID={tl.id}
                              addTask={addTask}
                              changeTaskTitle={changeTaskTitle}
                              changeTodoListFilter={changeTodoListFilter}
                              changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>

        )
    })
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0px"}}>
                    <AddItemForm addItemForm={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );

}


export default AppWithRedux;

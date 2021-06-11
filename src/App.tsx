import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./addItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = 'all' | 'active' | 'completed'


function App() {

    // BLL:
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"},

    ])

    const [tasks, setTasks] = useState<TasksStateType>({
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

    /*  const [filter, setFilter] = useState<FilterValuesType>('all')
      const [tasks, setTasks] = useState<Array<TaskType>>([
          {id: v1(), title: 'HTML', isDone: true},
          {id: v1(), title: 'css', isDone: true},
          {id: v1(), title: 'JS', isDone: false},
          {id: v1(), title: 'React', isDone: false},
          {id: v1(), title: 'Redux', isDone: false},
      ])
  */
    function changeTodoListFilter(filter: FilterValuesType, todoListsID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListsID ? {...tl, filter: filter} : tl))
    }


    function removeTask(taskID: string, todoListsID: string) {
        const copyTasks = {...tasks}
        copyTasks[todoListsID] = tasks[todoListsID].filter(t => t.id !== taskID)
        setTasks(copyTasks)

        //if(filteredTasks !== tasks) {
        // tasks == filteredTasks
        // React.render
    }

    function addTask(title: string, todoListsID: string) {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false
        }

        const copyTasks = {...tasks}
        copyTasks[todoListsID] = [newTask, ...tasks[todoListsID]]
        setTasks(copyTasks)
    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListsID: string) {
        const copyTasks = {...tasks}
        copyTasks[todoListsID] = tasks[todoListsID].map(t => t.id === taskID ? {...t, isDone: isDone} : t)
        setTasks(copyTasks)
        /*const updatedTasks = tasks.map(t => t.id === taskID ? {...t, isDone: isDone} : t)
        setTasks(updatedTasks)*/
    }
    function changeTaskTitle(taskID: string, title: string, todoListsID: string) {
        const copyTasks = {...tasks}
        copyTasks[todoListsID] = tasks[todoListsID].map(t => t.id === taskID ? {...t, title} : t)
        setTasks(copyTasks)
        /*const updatedTasks = tasks.map(t => t.id === taskID ? {...t, isDone: isDone} : t)
        setTasks(updatedTasks)*/
    }


    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }

    function addTodoList(title: string) {
        let newTodoListID = v1();
        let newTodolist: TodoListType = {
            id: newTodoListID,
            title,
            filter: "all"
        }

        setTodoLists([...todoLists, newTodolist])
        setTasks({...tasks, [newTodoListID]: []});

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
                <TodoList title={tl.title}
                          tasks={getFilteredTasks(tl)}
                          removeTask={removeTask}
                          removeTodoList={removeTodoList}
                          changeTaskStatus={changeTaskStatus}
                          filter={tl.filter}
                          todoListID={tl.id}
                          key={tl.id}
                          addTask={addTask}
                          changeTaskTitle={changeTaskTitle}
                          changeTodoListFilter={changeTodoListFilter}
                />

        )
    })
    return (
        <div className="App">
            <AddItemForm addItemForm={addTodoList} />
            {todoListComponents}
        </div>
    );

}


export default App;

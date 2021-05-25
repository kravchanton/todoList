import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

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
                          changeTaskStatus={changeTaskStatus}
                          filter={tl.filter}
                          todoListID={tl.id}
                          key={tl.id}
                          addTask={addTask}
                          changeTodoListFilter={changeTodoListFilter}
                />

        )
    })
    return (
        <div className="App">
            {todoListComponents}
        </div>
    );
    /* return (
         <div className="App">
             <TodoList title={"What to learn"}
                       tasks={getFilteredTasks()}
                       removeTask={removeTask}
                       changeTaskStatus={changeTaskStatus}
                       filter={filter}
                       addTask={addTask}
                       changeTodoListFilter={changeTodoListFilter}
             />


         </div>
     );*/
};


export default App;

import {TasksStateType, TodoListType} from "../App";
import {AddTodoListAC, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

let  startTasksState: TasksStateType = {};
let  startTodolistsState: Array<TodoListType> = [];

beforeEach(() => {
    startTasksState = {};
    startTodolistsState = []
})

test('ids should be equals', () => {


    const action = AddTodoListAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todoListId);
    expect(idFromTodolists).toBe(action.todoListId);
});

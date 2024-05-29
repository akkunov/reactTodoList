import {createSlice} from "@reduxjs/toolkit";


const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('todos');
        if (serializedState === null) {
            throw Error(undefined);
        }
        return JSON.parse(serializedState);
    } catch (e) {
        console.warn("Не удалось загрузить данные из localStorage", e);
        return undefined;
    }
};

const data = loadFromLocalStorage() || [];

const  initialState=  {
    data,
    isLoading: false,
    isAuth: false
}
const TodoSlice = createSlice({
    name: "todo",
    initialState,
    reducers:{
        createTodo: (state, action) => {
            const newTodo = action.payload;
            state.data.push(newTodo);
        },
        addTodo :(state, action) => {
            const {parentId, newTodos} = action.payload
            const todoBlock = state.data.find(items => items.id == parentId);
            todoBlock.todoItems.push(newTodos)
        },
        removeTodo: (state, action) => {
            const removed = state.data.filter(item => item.id !== action.payload);
            state.data = removed
        },
        updateTodoTitle : (state, action) => {
            const {id, value} = action.payload;
            const todoBlock = state.data.find(items => items.id == id);
            todoBlock.name = value;
        },
        updateTodoValue:(state, action)=>{
            const {parentId, id, value} = action.payload
            const todoBlock = state.data.find(items => items.id == parentId);
            const todoChild = todoBlock.todoItems.find(items => items.id == id);
            todoChild.title = value
        }
    }
})

export const {addTodo,
    removeTodo,
    updateTodoValue,
    createTodo,
    updateTodoTitle } = TodoSlice.actions;
export default TodoSlice.reducer
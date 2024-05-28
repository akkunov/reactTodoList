import {createSlice} from "@reduxjs/toolkit";

const TodoSlice = createSlice({
    name: "todo",
    initialState: [],

    reducers:{
        createTodo: (state, action) => {
            const newTodo = action.payload;
            state.push(newTodo)
        },
        addTodo :(state, action) => {
            const {parentId, newTodos} = action.payload
            const todoBlock = state.find(items => items.id == parentId);
            todoBlock.todoItems.push(newTodos)
        },
        removeTodo: (state, action) => {
            const removed = state.filter(item => item.id !== action.payload);
            state = removed
            console.log(removed);
        },
        updateTodoTitle : (state, action) => {
            const {id, value} = action.payload;
            const todoBlock = state.find(items => items.id == id);
            todoBlock.name = value;
        },
        updateTodoValue:(state, action)=>{
            const {parentId, id, value} = action.payload
            const todoBlock = state.find(items => items.id == parentId);
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
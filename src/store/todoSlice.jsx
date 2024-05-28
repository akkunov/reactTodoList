import {createSlice} from "@reduxjs/toolkit";

const initialState = [];
const TodoSlice = createSlice({
    name: "todo",
    initialState,
    reducers:{
        addTodo :(state, action) => {

        },
        removeTodo: (state, action) => {

        },
        updateTodo:(state, action)=>{}
    }
})

export const {addTodo, removeTodo, updateTodo } = TodoSlice.actions;
export default TodoSlice.reducer
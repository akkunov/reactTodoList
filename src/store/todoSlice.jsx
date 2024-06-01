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
    reducers: {
        createTodo: (state, action) => {
            const newTodo = action.payload;
            state.data.push(newTodo);
        },
        addTodo: (state, action) => {
            const { parentId, newTodos } = action.payload;
            const todoBlock = state.data.find(items => items.id === parentId);
            todoBlock.todoItems.push(newTodos);
        },
        removeTodo: (state, action) => {
            const removed = state.data.filter(item => item.id !== action.payload);
            state.data = removed;
        },
        updateTodoTitle: (state, action) => {
            const { id, value } = action.payload;
            const todoBlock = state.data.find(items => items.id === id);
            todoBlock.name = value;
        },
        updateTodoValue: (state, action) => {
            const { parentId, id, value } = action.payload;
            const todoBlock = state.data.find(items => items.id === parentId);
            const todoChild = todoBlock.todoItems.find(items => items.id === id);
            todoChild.title = value;
        },
        updateTodoOrder: (state, action) => {
            const { sourceBoard, sourceItem, destinationBoard, destinationItem } = action.payload;
            const sourceBoardData = state.data[sourceBoard];
            const destinationBoardData = state.data[destinationBoard];
            const [movedItem] = sourceBoardData.todoItems.splice(sourceItem, 1);
            destinationBoardData.todoItems.splice(destinationItem, 0, movedItem);
        },
        pushEmptyBoard: (state, action) => {
            const {sourceBoard, sourceItem, destinationBoard } = action.payload
            const sourceBoardData = state.data[sourceBoard];
            const destinationBoardData = state.data[destinationBoard];
            const [movedItem] = sourceBoardData.todoItems.splice(sourceItem, 1);
            destinationBoardData.todoItems.push(movedItem);
        },
        removeTodoFromBlock: (state, action) =>{
            const {parentId, itemId} = action.payload;
            const board = state.data.find(board => board.id == parentId);
            board.todoItems = board.todoItems.filter(items => items.id !== itemId);
        },
        saveToLocalStorage: (state) => {
            localStorage.setItem('todos', JSON.stringify(state.data));
        }
    }
});

export const {
    addTodo,
    removeTodo,
    updateTodoValue,
    createTodo,
    updateTodoTitle,
    updateTodoOrder,
    saveToLocalStorage,
    removeTodoFromBlock,
    pushEmptyBoard
} = TodoSlice.actions;

export default TodoSlice.reducer;
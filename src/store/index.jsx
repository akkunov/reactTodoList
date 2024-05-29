import {configureStore} from "@reduxjs/toolkit";
import todoReducer from './todoSlice.jsx';


const saveTodoToLocalStorage = store => next => action => {
    const result = next(action);
    const splitedActionType = action.type.split('/')[0];
    if (splitedActionType == 'todo') {
        localStorage.setItem('todos', JSON.stringify(store.getState().todo.data));
    }

    return result;
};


export const store  = configureStore({
    reducer: {
        todo: todoReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(saveTodoToLocalStorage)
})
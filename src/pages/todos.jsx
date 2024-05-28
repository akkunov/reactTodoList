import React from 'react';
import TodoItemsContainer from "../components/todoItemsContainer/todoItemsContainer.jsx";
import {useDispatch, useSelector} from "react-redux";
import {createTodo} from "../store/todoSlice.jsx";

function Todos(props) {
    const todos = useSelector(state => state.todos);

    const {...otherProps} = props;
    const dispatch = useDispatch();
    function handleClick (){
        const newTodo = {name:"Untitled", id: Date.now().toString(), todoItems:[]}
        dispatch(createTodo(newTodo));
    }
    return (
        <div className={'container'}>
            {todos?.map((items,index )=>  <TodoItemsContainer {...items} {...otherProps} key={items.id}/> )}
            <button className={'button'} onClick={handleClick}>new todo</button>
        </div>
    );
}

export default Todos;
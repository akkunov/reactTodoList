import React, {useState} from 'react';
import Board from "../components/board/board.jsx";


import {useDispatch, useSelector} from "react-redux";
import {createTodo} from "../store/todoSlice.jsx";

function Todos(props) {
    const todos = useSelector(state => state.todo.data);
    const  [currentBoard, setCurrentBoard]= useState(null)
    const  [currentItem, setCurrentItem]= useState(null)

    const menuItems = [{
        name: 'Delete',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 6L5 14C5 15.8613 5 16.7919 5.24472 17.5451C5.73931 19.0673 6.93273 20.2607 8.45492 20.7553C9.20808 21 10.1387 21 12 21V21C13.8613 21 14.7919 21 15.5451 20.7553C17.0673 20.2607 18.2607 19.0673 18.7553 17.5451C19 16.7919 19 15.8613 19 14V6M5 6H3M5 6L9 6M19 6H21M19 6H15M9 6V6C9 5.06812 9 4.60218 9.15224 4.23463C9.35523 3.74458 9.74458 3.35523 10.2346 3.15224C10.6022 3 11.0681 3 12 3V3C12.9319 3 13.3978 3 13.7654 3.15224C14.2554 3.35523 14.6448 3.74458 14.8478 4.23463C15 4.60218 15 5.06812 15 6V6M9 6L15 6M9.5 9.5L9.5 16.5M14.5 9.5L14.5 16.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        ),
    }];

    const dispatch = useDispatch();
    function crateNewBoard (){
        const newTodo = {name:"Untitled", id: Date.now().toString(), todoItems:[]}
        dispatch(createTodo(newTodo));
    }
    return (
        <div className={'container'}>
            {todos?.map((items, boardIndex )=>  <Board
                {...items}
                boardIndex={boardIndex}
                menuItems={menuItems}
                currentBoard={currentBoard}
                setCurrentBoard={ setCurrentBoard}
                currentItem={currentItem}
                setCurrentItem={setCurrentItem}
                key={items.id}/> )}
            <button className={'button'} onClick={crateNewBoard}>New todo</button>
        </div>
    );
}

export default Todos;
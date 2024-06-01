import React, { useState } from 'react';
import css from './board.module.css';
import TodoItem from "../todoItem/TodoItem.jsx";
import DotMenu from "../menu";
import { useDispatch } from "react-redux";
import {addTodo, pushEmptyBoard, removeTodo, updateTodoOrder, updateTodoTitle} from "../../store/todoSlice.jsx";

function Board(props) {
    const { name,
        id,
        todoItems,
        menuItems,
        currentItem,
        currentBoard,
        setCurrentBoard,
        setCurrentItem,
        boardIndex,
        ...otherProps } = props;
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const [value, setValue] = useState(name);
    const [placeholder, setPlaceholder] = useState(false);
    function handleClickButton(parentId) {
        const newTodos = {
            id: Date.now().toString(),
            title: 'Untitled'
        }
        dispatch(addTodo({ parentId, newTodos }));
    }

    function handleChange(id, e) {
        const value = e.target.value;
        setValue(value);
        dispatch(updateTodoTitle({ id, value }));
    }

    function handleClick() {
        setIsEdit(true);
    }

    function handleBlur() {
        setIsEdit(false);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setIsEdit(false);
        }
    };

    function removeTodos() {
        dispatch(removeTodo(id));
    }
    function dropOverHandler(e){
        e.preventDefault();
        setPlaceholder(true);
    }
    function dropHandler(e, board){
        e.preventDefault();
        if(todoItems.length == 0){
            dispatch(pushEmptyBoard({
                sourceBoard:currentBoard,
                sourceItem:currentItem,
                destinationBoard: board
            }))
        }
        setPlaceholder(false);

    }
    return (
        <div
            className={css.container}
            onDragOver={e =>dropOverHandler (e)}
            onDrop={ e => dropHandler(e, boardIndex)}
        >
            <header className={css.header}>
                {isEdit ? <input
                        type="text"
                        value={value}
                        onChange={e => handleChange(id, e)}
                        onSubmit={handleBlur}
                        onBlur={handleBlur}
                        autoFocus
                        className={css.nameInput}
                        onKeyDown={handleKeyDown}
                    />
                    : <span
                        className={css.header__title}
                        onClick={handleClick}>
                        {name}
                    </span>
                }

                <DotMenu callback={removeTodos} menuItems={menuItems} />
                <span className={css.taskCount}>{todoItems.length}</span>
            </header>
            {todoItems.length != 0 && todoItems?.map((items, itemIndex) => (
                <TodoItem
                    key={items.id}
                    currentItem={currentItem}
                    currentBoard={currentBoard}
                    setCurrentBoard={setCurrentBoard}
                    setCurrentItem={setCurrentItem}
                    boardIndex={boardIndex}
                    parentId={id}
                    itemIndex={itemIndex}
                    menuItems={menuItems}
                    {...items}
                    {...otherProps}
                />
            ))}

            <button className={css.addNew__todo} onClick={() => handleClickButton(id)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="#373A40" />
                </svg>
            </button>
        </div>
    );
}

export default Board;

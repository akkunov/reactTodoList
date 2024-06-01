import React, { useState } from 'react';
import css from './TodoItem.module.css';
import { useDispatch } from "react-redux";
import { removeTodoFromBlock, updateTodoOrder, updateTodoValue } from "../../store/todoSlice.jsx";
import DotMenu from "../menu/index.jsx";

function TodoItem(props) {
    const {
        parentId,
        title,
        id,
        currentBoard,
        currentItem,
        setCurrentBoard,
        boardIndex,
        itemIndex,
        menuItems,
        setCurrentItem
    } = props;
    const [isEdit, setIsEdit] = useState(false);
    const [value, setValue] = useState(title);
    const [isDragging, setIsDragging] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);
    const [placeholder, setPlaceholder] = useState(false)

    const dispatch = useDispatch();

    function handleChange(parentId, id, value) {
        setValue(value);
        dispatch(updateTodoValue({ parentId, id, value }));
    }

    function handleDelete() {
        setIsRemoving(true); // включаем анимацию удаления
        setTimeout(() => {
            dispatch(removeTodoFromBlock({ parentId, itemId: id }));
        }, 300); // задержка, соответствующая продолжительности CSS-транзиции
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



    function dragStartHandler(e, board, item) {
        setCurrentBoard(board);
        setCurrentItem(item);
        setIsDragging(true);
    }

    function dragOverHandler(e) {
        e.preventDefault();

        setPlaceholder(true);
    }

    function dragEndHandler(e) {
        setTimeout(() => {
            setPlaceholder(false);
        }, 300); // задержка, соответствующая продолжительности CSS-транзиции

        setIsDragging(false);
    }

    function dragLeaveHandler(e) {
        setTimeout(() => {
            setPlaceholder(false);
        }, 300); // задержка, соответствующая продолжительности CSS-транзиции

    }

    function dropHandler(e, board, item) {
        e.preventDefault();
        dispatch(
            updateTodoOrder({
                sourceBoard: currentBoard,
                sourceItem: currentItem,
                destinationBoard: board,
                destinationItem: item
            })
        );
        setTimeout(() => {
            setPlaceholder(false);
        }, 300); // задержка, соответствующая продолжительности CSS-транзиции
    }

    return (
        <>
            <div
                className={`${css.container} ${isDragging ? css.dragging : ''} ${isRemoving ? css.removing : ''}`}
                draggable
                onDragStart={e => dragStartHandler(e, boardIndex, itemIndex)}
                onDragOver={e => dragOverHandler(e)}
                onDragEnd={e => dragEndHandler(e)}
                onDragLeave={e => dragLeaveHandler(e)}
                onDrop={e => dropHandler(e, boardIndex, itemIndex)}>
                <div className={css.titleContainer}>
                    {isEdit ? <input
                            value={value}
                            className={css.todoItem__input}
                            onChange={(e) => handleChange(parentId, id, e.target.value)}
                            onBlur={handleBlur}
                            autoFocus
                            onKeyDown={handleKeyDown}
                        /> :
                        <span
                            className={css.todoItem__title}
                            onClick={() => handleClick()}>
                    {title}
                </span>
                    }
                    <DotMenu callback={handleDelete} menuItems={menuItems} />

                </div>
            </div>
            {placeholder ? <div className={"placeholder"}></div> : ''}
        </>

    )
}

export default TodoItem;

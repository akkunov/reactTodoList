import React, {useState} from 'react';
import css from './TodoItem.module.css';

import {useDispatch} from "react-redux";
import {updateTodoValue} from "../../store/todoSlice.jsx";


function TodoItem(props) {
    const {parentId, title, id} = props
    const [isEdit, setIsEdit] = useState(false);
    const [value, setValue] = useState(title);
    const dispatch = useDispatch();

    function handleChange (parentId, id, value){
            setValue(value);
            dispatch(updateTodoValue({parentId, id, value}))
    }

    function handleClick (){
        setIsEdit(true);
    }
    function handleBlur(){
        setIsEdit(false);
    }
    const handleKeyDown = (event) => {
        if(event.key == 'Enter'){
            setIsEdit(false)
        }
    };

    return (
        <div className={css.container}>
            {isEdit ? <input
                    value={value}
                    className={css.todoItem__input}
                    onChange={(e) => handleChange(parentId, id, e.target.value) }
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

        </div>

    );
}

export default TodoItem;
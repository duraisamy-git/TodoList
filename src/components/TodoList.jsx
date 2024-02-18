import React, { useEffect, useState } from 'react';
import "./todolist.css";
import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editIndex,setEditIndex ] = useState(null);
    const [editValue, setEditValue] = useState('');

    
    useEffect(()=>{
        localStorage.setItem('todos', (todos));
    }, [todos]);

    const addTodo = ()=>{
        if(inputValue.trim() !== ""){
            if(editIndex !== null){
                const newTodos = [...todos];
                newTodos[editIndex] = inputValue;
                setTodos(newTodos);
                setEditIndex(null);
            }else{
                setTodos([...todos, inputValue]);
            }
            setInputValue('');
    }
};

    const removeTodo = (index) =>{
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    const editTodo = (index)=>{
        setEditIndex(index);
        setEditValue(todos[index]);
    };


  return (
    <div className='todo-container'>
        <h1>Todo List</h1>
        <div className='todo-input'>
        <input 
        type="text" 
        value={inputValue}
        onChange={(e)=>
            setInputValue(e.target.value)
        }
        placeholder='Enter a new task...'
        />
        
        <button onClick={addTodo} type='submit'> {editIndex !== null ? 'Update Task': 'Add Task'} </button>
        {editIndex !== null && (<button onClick={()=>{setEditIndex(null);
        setInputValue("");}}>Cancel</button>)}
        </div>
        <ul>
            {todos.map((todo, index)=>(
                <li className='todo-item' key={index}>
                    {index === editIndex ? (
                        
                         <input 
                         type='text'
                        
                         value={editValue}
                         onChange={(e)=>setEditValue(e.target.value)}
                         />
                    ):(
                      todo
                    )}
                    {index !== editIndex && (
                        <div className='icon'>
                            <input type="checkbox" className='check'  />
                            <FaRegEdit className='edit' onClick={()=>editTodo(index)} />
                            <FaTrash className='delete' onClick={()=>removeTodo(index)}/>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    </div>
  );
}

export default TodoList

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, removeTodo } from '../actions';
import './Todo.css'; // Import the CSS file

export const Todo = () => {
  const [inputData, setInputData] = useState('');
  const [selectedNotes, setSelectedNotes] = useState([]);
  const list = useSelector((state) => state.todoReducers.list);
  console.log(list);
  const dispatch = useDispatch();

  // Load data from local storage when the component mounts
  useEffect(() => {
    const storedList = localStorage.getItem('todoList');
    if (storedList !== "[]") {
      dispatch({ type: 'LOAD_TODO_LIST', payload: JSON.parse(storedList) });
    }
  }, [dispatch]);

  // Save data to local storage whenever the todo list changes
  useEffect(() => {
    if(list.length >0) {

      localStorage.setItem('todoList', JSON.stringify(list));
    }
  }, [list]);

  const toggleSelectNote = (id) => {
    if (selectedNotes.includes(id)) {
      setSelectedNotes(selectedNotes.filter(noteId => noteId !== id));
    } else {
      setSelectedNotes([...selectedNotes, id]);
    }
  };

  return (
    <div className='main-div'>
      <div className="child-div">
        <div className='heading'>
          <h1>Add Your List Here</h1>
        </div>
        <div className='addItems'>
          <input
            className="input-field"
            type='text'
            placeholder='Add Items...'
            value={inputData}
            onChange={(event) => setInputData(event.target.value)}
          />
          <i
            className="fa-solid fa-plus add-btn"
            title="Add Item"
            onClick={() => {
              dispatch(addTodo(inputData));
              setInputData('');
            }}
          ></i>
        </div>

        <div className='showItems'>
          {list.map((elem) => (
            <div className={`eachItem ${selectedNotes.includes(elem.id) ? 'selected' : ''}`} key={elem.id}>
              <input className='checkbox'
                type="checkbox"
                checked={selectedNotes.includes(elem.id)}
                onChange={() => toggleSelectNote(elem.id)}
              />
              <h3 style={{ textDecoration: selectedNotes.includes(elem.id) ? 'line-through' : 'none' }}>{elem.data}</h3>
              <i
                className='far fa-trash-alt delete-btn'
                title='Delete Item'
                onClick={() => dispatch(deleteTodo(elem.id))}
              ></i>
            </div>
          ))}
        </div>

        <div className='check-btn'>
          <button className='btn effect04' data-sm-link-text="remove All" onClick={() => dispatch(removeTodo())}>
            <span className='btn'>Remove All</span>
          </button>
        </div>
      </div>
    </div>
  );
};














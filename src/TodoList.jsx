import React, { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa'; 
import { MdDelete } from 'react-icons/md'; 
import PomodoroTimer from './PomodoroTimer'; 
import './TodoList.css'; 

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingIndex, setEditingIndex] = useState(null); 
  
  const [editingValue, setEditingValue] = useState(''); 

  const addTodo = () => {
    if (inputValue) {
      const newTodo = { text: inputValue, completed: false };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const toggleComplete = (index) => {
    const newTodos = todos.map((todo, idx) => 
      idx === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, idx) => idx !== index);
    setTodos(newTodos);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingValue(todos[index].text);
  };

  const saveEdit = () => {
    const updatedTodos = todos.map((todo, idx) => 
      idx === editingIndex ? { ...todo, text: editingValue } : todo
    );
    setTodos(updatedTodos);
    setEditingIndex(null); 
    setEditingValue(''); 
  };

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div className="todo-container">
      <PomodoroTimer />

      <input 
        type="text" 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
        placeholder="Жаңа заметка енгізіңіз..."
      />
      <button onClick={addTodo}>Қосу</button>
      
      <ul>
        
        {activeTodos.map((todo, index) => (
          <li key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <input 
              type="checkbox" 
              checked={todo.completed} 
              onChange={() => toggleComplete(todos.indexOf(todo))}
            />
            <span style={{ 
              textDecoration: todo.completed ? 'line-through' : 'none', 
              marginLeft: '10px', 
              flexGrow: 1 
            }}>
              {editingIndex === index ? (
                <input 
                  type="text" 
                  value={editingValue} 
                  onChange={(e) => setEditingValue(e.target.value)} 
                  onBlur={saveEdit} 
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      saveEdit();
                    }
                  }}
                />
              ) : (
                todo.text
              )}
            </span>
            
            <div style={{ display: 'flex', alignItems: 'center' }}>
             
              <FaEdit 
                onClick={() => startEditing(index)} 
                style={{ marginLeft: '10px', cursor: 'pointer', color: 'blue' }} 
              />
              
              <MdDelete 
                onClick={() => deleteTodo(index)} 
                style={{ marginLeft: '10px', cursor: 'pointer', color: 'red' }} 
              />
            </div>
          </li>
        ))}
      </ul>

      <ul>
       
        {completedTodos.map((todo, index) => (
          <li key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <input 
              type="checkbox" 
              checked={todo.completed} 
              onChange={() => toggleComplete(todos.indexOf(todo))}
            />
            <span style={{ 
              textDecoration: todo.completed ? 'line-through' : 'none', 
              marginLeft: '10px', 
              flexGrow: 1 
            }}>
              {editingIndex === index ? (
                <input 
                  type="text" 
                  value={editingValue} 
                  onChange={(e) => setEditingValue(e.target.value)} 
                  onBlur={saveEdit} 
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      saveEdit();
                    }
                  }}
                />
              ) : (
                todo.text
              )}
            </span>
            
            <div style={{ display: 'flex', alignItems: 'center' }}>
              
              <FaEdit 
                onClick={() => startEditing(index)} 
                style={{ marginLeft: '10px', cursor: 'pointer', color: 'blue' }} 
              />
              
              <MdDelete 
                onClick={() => deleteTodo(index)} 
                style={{ marginLeft: '10px', cursor: 'pointer', color: 'red' }} 
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;

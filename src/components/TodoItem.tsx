import React from 'react';
import './TodoItem.css';
import Checkbox from '@mui/material/Checkbox';
import { Todo } from '../types';

interface Props {
  todo: Todo;
  toggleTodo: (id: number) => void;
}

const TodoItem: React.FC<Props> = ({ todo, toggleTodo }) => {
    const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        toggleTodo(todo.id);
    };

  return (
    <li onClick={() => toggleTodo(todo.id)}>
      <Checkbox
        checked={todo.completed}
        onChange={handleToggle}
        
      />
      <span className={`liText ${todo.completed ? 'completed' : ''}`}
       style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
    </li>
  );
};

export default TodoItem;

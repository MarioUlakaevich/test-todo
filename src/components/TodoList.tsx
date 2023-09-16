import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css'
import { Todo } from '../types';

interface Props {
  todos: Todo[];
  toggleTodo: (id: number) => void;
}

const TodoList: React.FC<Props> = ({ todos, toggleTodo }) => {
  return (
    <div className='list'>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

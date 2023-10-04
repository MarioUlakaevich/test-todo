import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import InputField from './components/InputField';
import { Todo, FilterType } from './types';
import './App.css'

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(JSON.parse(sessionStorage.getItem('todos') || ""));
  const [filter, setFilter] = useState<FilterType>(FilterType.All);
  const [activeTodosCount, setActiveTodosCount] = useState<number>(0);

  useEffect(() => {
    sessionStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const count = todos.filter((todo) => !todo.completed).length;
    setActiveTodosCount(count);
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case FilterType.Active:
        return todos.filter((todo) => !todo.completed);
      case FilterType.Completed:
        return todos.filter((todo) => todo.completed);
      case FilterType.All:
      default:
        return todos;
    }
  };

  return (
    <div className='main'>
      <div className='name'>todos</div>
      <InputField addTodo={addTodo} />
      <TodoList todos={getFilteredTodos()} toggleTodo={toggleTodo} />
      <div className='footer'>
        <p className='counter'>{`${activeTodosCount} items left`}</p>
        <div className='filter'>
          <button className={filter === FilterType.All ? 'all active-filter' : 'all'}
          onClick={() => setFilter(FilterType.All)}>All</button>
          <button className={filter === FilterType.Active ? 'active active-filter' : 'active'} 
          onClick={() => setFilter(FilterType.Active)}>Active</button>
          <button className={filter === FilterType.Completed ? 'completed active-filter' : 'completed'}
          onClick={() => setFilter(FilterType.Completed)}>Completed</button>
        </div>
        <button className='clear' onClick={clearCompleted}>Clear Completed</button>
      </div>
    </div>
  );
};

export default App;

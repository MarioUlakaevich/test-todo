import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

test('renders ToDo App title', () => {
  render(<App />);
  const title = screen.getByText(/todos/i);
  expect(title).toBeInTheDocument();
});

test('can add a new todo item', () => {
  render(<App />);
  fireEvent.change(screen.getByPlaceholderText('What needs to be done?'), {
    target: { value: 'New task' },
  });
  fireEvent.keyDown(screen.getByPlaceholderText('What needs to be done?'), {
    key: 'Enter', 
    code: 'Enter' 
  });
  expect(screen.getByText('New task')).toBeInTheDocument();
});

test('can toggle a todo item', () => {
  render(<App />);
  fireEvent.change(screen.getByPlaceholderText('What needs to be done?'), {
    target: { value: 'Toggle me' },
  });
  fireEvent.keyDown(screen.getByPlaceholderText('What needs to be done?'), {
    key: 'Enter', 
    code: 'Enter' 
  });
  const todoItem = screen.getByText('Toggle me');
  fireEvent.click(todoItem);
  expect(todoItem).toHaveStyle('text-decoration: line-through;');
});

test('can clear completed tasks', () => {
  render(<App />);
  fireEvent.change(screen.getByPlaceholderText('What needs to be done?'), {
    target: { value: 'Clear me' },
  });
  fireEvent.keyDown(screen.getByPlaceholderText('What needs to be done?'), {
    key: 'Enter', 
    code: 'Enter' 
  });
  const todoItem = screen.getByText('Clear me');
  fireEvent.click(todoItem); // Mark as completed
  fireEvent.click(screen.getByText('Clear Completed'));
  expect(todoItem).not.toBeInTheDocument();
});

test('displays the correct count of active todos', () => {
  render(<App />);
  fireEvent.change(screen.getByPlaceholderText('What needs to be done?'), {
    target: { value: 'Task 1' },
  });
  fireEvent.keyDown(screen.getByPlaceholderText('What needs to be done?'), {
    key: 'Enter', 
    code: 'Enter' 
  });
  expect(screen.getByText('1 items left')).toBeInTheDocument();
  fireEvent.change(screen.getByPlaceholderText('What needs to be done?'), {
    target: { value: 'Task 2' },
  });
  fireEvent.keyDown(screen.getByPlaceholderText('What needs to be done?'), {
    key: 'Enter', 
    code: 'Enter' 
  });
  expect(screen.getByText('2 items left')).toBeInTheDocument();
});


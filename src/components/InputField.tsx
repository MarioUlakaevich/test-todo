import React, { useState } from 'react';
import './InputField.css';

interface Props {
  addTodo: (text: string) => void;
}

const InputField: React.FC<Props> = ({ addTodo }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    
    if (e.key === 'Enter' && input.trim() !== '') {
        addTodo(input.trim());
        setInput('');
    }
  };

  return (
    <div className="input-field-container">
      <input
        type="text"
        className="input-field"
        placeholder="What needs to be done?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleSubmit}
      />
    </div>
  );
};

export default InputField;


import React, { useState } from 'react';

export const InputList = ({ addList, setStatusFilter }) => {
  const [inputText, setInputText] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addList(inputText);
    setInputText('');
  };

  const handleSearch = () => {
    setStatusFilter(status);
  };

  return (
    <div className='grid grid-cols-2 m-3'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Enter Task'
          className='textcolor p-4 border-2'
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit" className='rounded-full text-xl font-medium buttoncolor p-3 m-1'>
          ADD
        </button>
      </form>
      <div>
        <input
          type="text"
          placeholder="Check Status"
          className="p-4 border-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <button onClick={handleSearch} className='rounded-full text-xl font-medium buttoncolor p-3 m-1'>
          SEARCH
        </button>
      </div>
    </div>
  );
};

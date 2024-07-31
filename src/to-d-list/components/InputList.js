import React, { useState } from 'react';
// import '../../App.css';

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
      <form className='text-end' onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Enter Task'
          className='textcolor p-4 border-2 rounded-lg'
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit" className='text-xl font-medium buttoncolor  dark:bg-violet-500 p-3 m-2 rounded-lg'>
          ADD
        </button>
      </form>
      <div>
        {/* <input
          type="text"
          placeholder="Check Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-4 border-2 textcolor rounded-lg"
        /> */}
       
        <select value={status} className='textcolor p-3 rounded-lg'
          onChange={(e) => setStatus(e.target.value)}>
        <option value='Incomplete'>Incomplete</option>
        <option value='Complete'>Complete</option>
        </select>
        <button className='buttoncolor  dark:bg-violet-500 text-xl font-medium p-3 m-2 rounded-lg' onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};
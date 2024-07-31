import React, { useState  } from 'react';
import { Lists } from './Lists';
import { InputList } from './InputList';


export const Layout = () => {
  const [listTodo, setListTodo] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');

  const addList = (inputText) => {
    if (inputText.trim() !== '') {
      const newTask = { item: inputText, status: 'Incomplete' };
      setListTodo([...listTodo, newTask]);
    }
  };

  const updateStatus = (index, newStatus) => {
    const updatedList = [...listTodo];
    updatedList[index].status = newStatus;
    setListTodo(updatedList);
  };

  const deleteTask = (index) => {
    const updatedList = [...listTodo];
    updatedList.splice(index, 1);
    setListTodo(updatedList);
  };

  const editTask = (index, newText) => {
    const updatedList = [...listTodo];
    updatedList[index].item = newText;
    setListTodo(updatedList);
  };

  return (
    <>
      <div className='flex justify-center p-5'>
        <h1 className='textcolor text-2xl font-medium'>To-DO-LIST</h1>
      </div>
      <InputList addList={addList} setStatusFilter={setStatusFilter} />
      <Lists items={listTodo} statusFilter={statusFilter} updateStatus={updateStatus} deleteTask={deleteTask} editTask={editTask} />
    </>
  );
};
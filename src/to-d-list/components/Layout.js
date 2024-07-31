import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addList, updateStatus, deleteTask, setStatusFilter } from '../../todoSlice';
import { Lists } from './Lists';
import { InputList } from './InputList';

export const Layout = () => {
  const dispatch = useDispatch();
  const listTodo = useSelector((state) => state.todos.listTodo);
  const statusFilter = useSelector((state) => state.todos.statusFilter);

  return (
    <>
      <div className='flex justify-center p-5'>
        <h1 className='textcolor text-2xl font-medium'>To-DO-LIST</h1>
      </div>
      <InputList
        addList={(inputText) => dispatch(addList(inputText))}
        setStatusFilter={(status) => dispatch(setStatusFilter(status))}
      />
      <Lists
        items={listTodo}
        statusFilter={statusFilter}
        updateStatus={(index, newStatus) => dispatch(updateStatus({ index, newStatus }))}
        deleteTask={(index) => dispatch(deleteTask(index))}
      />
    </>
  );
};

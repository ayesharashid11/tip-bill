
import React, { useState, useEffect } from 'react';

export const Lists = ({ items, statusFilter, updateStatus }) => {
  const [status, setStatus] = useState('');

  useEffect(() => {
    setStatus(statusFilter);
  }, [statusFilter]);

  const handleChange = (index, e) => {
    const updatedStatus = e.target.value;
    updateStatus(index, updatedStatus);
  };

  const filteredItems = items.filter((item) => {
    const lowerCaseItemStatus = item.status.toLowerCase();
    const lowerCaseStatus = status.toLowerCase();

    if (status === '') {
      return false; // Don't show filtered tasks if no status is selected
    } else if (lowerCaseItemStatus === lowerCaseStatus) {
      return true;
    } else {
      return false;
    }
  });

  return (
    <div className='grid grid-cols-2'>
      <div className='m-3 p-5 w-[70%] backcolor rounded-lg'>
        <div className="flex">
          <div className='w-[58%]'>
            <h1 className='text-lg font-medium'>Title</h1>
            {items.map((item, index) => (
              <div key={index}>
                <div>{item.item}</div>
                <select 
                  value={item.status} 
                  onChange={(e) => handleChange(index, e)}
                >
                  <option value="Incomplete">Incomplete</option>
                  <option value="Complete">Complete</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <h2 className='text-lg font-medium'>Filtered Tasks</h2>
        {filteredItems.length === 0 && <p>No tasks found for the selected status</p>}
        {filteredItems.map((filteredItem, index) => (
          <div key={index} className='m-3 p-5 w-[70%] backcolor rounded-lg'>
            <div className="flex">
              <div className='w-[58%]'>
                <h1 className='text-lg font-medium'>Title</h1>
                <div>{filteredItem.item}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

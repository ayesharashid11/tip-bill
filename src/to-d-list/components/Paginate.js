import React from 'react';
const Paginate = ({ listPerPage, totalLists, paginate }) => {
   const pageNumbers = [];
 
   for (let i = 1; i <= Math.ceil(totalLists / listPerPage); i++) {
      pageNumbers.push(i);
   }
//  console.log("=========", pageNumbers);
//  console.log("total List ", totalLists);
//  console.log("page p", listPerPage);

   return (
      <div >
         <ul className='flex gap-3 text-xl font-medium cursor-pointer justify-center '>
            {pageNumbers.map((number) => (
               <li
                  key={number}
                  onClick={() => paginate(number)}
                  className='active:bg-slate-400 rounded-lg p-3 buttoncolor dark:bg-violet-500'
               >
                  {number}
               </li>
            ))}
         </ul>
      </div>
   );
};
 
export default Paginate;
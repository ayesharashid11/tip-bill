import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listTodo: [],
  statusFilter: '',
  currentPage: 1,
  listPerPage: 3,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addList: (state, action) => {
      const newTask = { item: action.payload, status: 'Incomplete' };
      state.listTodo.push(newTask);
    },
    updateStatus: (state, action) => {
      const { index, newStatus } = action.payload;
      state.listTodo[index].status = newStatus;
    },
    deleteTask: (state, action) => {
      state.listTodo.splice(action.payload, 1);
    },
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
    },
    editTask: (state, action) => {
      const { index, newText } = action.payload;
      state.listTodo[index].item = newText;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setListPerPage: (state, action) => {
      state.listPerPage = action.payload;
    }
  },
});

export const { addList, updateStatus, deleteTask, setStatusFilter, editTask, setCurrentPage, setListPerPage } = todoSlice.actions;

export default todoSlice.reducer;

<Route path="/dashboard/:userId" element={<Dashboard />} />

import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api', // API base URL
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => ({
        url: '/users/register',
        method: 'POST',
        body: user,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/users/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
    }),
    findUser: builder.query({
      query: (id) => `/users/${id}`,
    }),
    getAllUsers: builder.query({
      query: () => '/users',
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useDeleteUserMutation,
  useFindUserQuery,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} = apiSlice;



import React, { useState } from 'react';
import { useRegisterUserMutation } from './api/apiSlice';

const Register = () => {
  const [registerUser] = useRegisterUserMutation();
  const [user, setUser] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(user).unwrap();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" onChange={handleChange} value={user.name} />
      <input type="email" name="email" onChange={handleChange} value={user.email} />
      <input type="password" name="password" onChange={handleChange} value={user.password} />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from './api/apiSlice';

const Login = () => {
  const [loginUser] = useLoginUserMutation();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(credentials).unwrap();
      localStorage.setItem('token', response.token); 
      navigate(`/dashboard/${response.userId}`); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" onChange={handleChange} value={credentials.email} />
      <input type="password" name="password" onChange={handleChange} value={credentials.password} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetAllUsersQuery,
} from './api/apiSlice';

const Dashboard = () => {
  const { userId } = useParams();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const { data: users, error, isLoading } = useGetAllUsersQuery();
  const [userData, setUserData] = useState({ name: '', email: '' });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await updateUser({ id: userId, data: userData }).unwrap();
      alert('User updated successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(userId).unwrap();
      alert('User deleted successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Welcome, User {userId}</h1>

      <div>
        <h2>Update User</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={userData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
        />
        <button onClick={handleUpdate}>Update User</button>
      </div>

      <div>
        <h2>Delete User</h2>
        <button onClick={handleDelete}>Delete User</button>
      </div>

      <div>
        <h2>All Users</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>An error occurred: {error.message}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

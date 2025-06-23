import React, { useState } from 'react';
import api from '../api/axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('user/token', { email, password });
      const token = res.data.token;

      localStorage.setItem('token', token);

    } catch (err) {
      console.error(err);

      const message =
      err.response?.data?.detail || 
      err.response?.data?.message ||
      'Login failed';

      alert(message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;

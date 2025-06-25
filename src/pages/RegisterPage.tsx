import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';

const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('customer');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = register({ name, email, password, userType });
    if (success) {
      navigate('/login');
    } else {
      setError('Registration failed. Try a different email.');
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          />
          <select
            value={userType}
            onChange={e => setUserType(e.target.value)}
            className="w-full border rounded px-2 py-1"
          >
            <option value="customer">Customer</option>
            <option value="shopkeeper">Shopkeeper</option>
          </select>
          {error && <div className="text-red-500">{error}</div>}
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded">
            Sign Up
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default RegisterPage;
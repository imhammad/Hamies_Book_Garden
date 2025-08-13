import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function AuthModal({ onClose, onAuthSuccess }) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (isSignup) {
      if (!username.trim()) {
        setErrorMsg("Please enter a username");
        return;
      }
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username }
        }
      });
      if (error) {
        setErrorMsg(error.message);
      } else {
        alert('Signup successful! Check your email to confirm.');
        if (onAuthSuccess) onAuthSuccess(data.user);
        onClose();
      }
    } else {
      const { error, data } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setErrorMsg(error.message);
      } else {
        alert('Login successful!');
        if (onAuthSuccess) onAuthSuccess(data.user);
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isSignup ? 'Sign Up' : 'Login'}
        </h2>
        <form onSubmit={handleAuth} className="flex flex-col space-y-4">
          {isSignup && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
              className="p-3 border rounded"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border rounded"
          />
          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
          >
            {isSignup ? 'Create Account' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="ml-2 text-blue-600 hover:underline"
          >
            {isSignup ? 'Login' : 'Sign Up'}
          </button>
        </p>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function AuthModal({ onClose, onAuthSuccess }) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const resetFields = () => {
    setEmail("");
    setPassword("");
    setUsername("");
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      if (isSignup) {
        if (!username.trim()) {
          setErrorMsg("Please enter a username");
          setLoading(false);
          return;
        }

        const { error, data } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username },
          },
        });

        if (error) {
          setErrorMsg("Signup failed. " + error.message);
          resetFields();
        } else {
          setSuccessMsg("Signup successful! Please check your email to confirm.");
          if (onAuthSuccess) onAuthSuccess(data.user);

          setTimeout(() => {
            onClose();
            resetFields();
          }, 1500); // short delay so user sees the success msg
        }
      } else {
        const { error, data } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setErrorMsg("Incorrect email or password.");
          resetFields();
        } else {
          setSuccessMsg("Login successful! Redirecting...");
          if (onAuthSuccess) onAuthSuccess(data.user);

          setTimeout(() => {
            onClose();
            resetFields();
          }, 1000);
        }
      }
    } catch (err) {
      setErrorMsg("Unexpected error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isSignup ? "Sign Up" : "Login"}
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
            autoFocus
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
          {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white p-3 rounded transition 
              ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
          >
            {loading ? "Processing..." : isSignup ? "Create Account" : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            onClick={() => {
              setIsSignup(!isSignup);
              resetFields();
              setErrorMsg("");
              setSuccessMsg("");
            }}
            className="ml-2 text-blue-600 hover:underline"
          >
            {isSignup ? "Login" : "Sign Up"}
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

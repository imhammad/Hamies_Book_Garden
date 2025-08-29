import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function AuthModal({ onClose, onAuthSuccess }) {
  const [isSignup, setIsSignup] = useState(false);
  const [isForgot, setIsForgot] = useState(false); // new state for forgot password
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
      if (isForgot) {
        // Forgot password flow
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: "http://localhost:3000/reset-password", // change to your deployed URL
        });
        if (error) {
          setErrorMsg("Failed to send reset email: " + error.message);
        } else {
          setSuccessMsg("Password reset email sent! Please check your inbox.");
          resetFields();
          setTimeout(() => {
            setIsForgot(false); // go back to login screen
          }, 2000);
        }
      } else if (isSignup) {
        // Signup
        if (!username.trim()) {
          setErrorMsg("Please enter a username");
          setLoading(false);
          return;
        }
        const { error, data } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { username } },
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
          }, 1500);
        }
      } else {
        // Login
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
          {isForgot ? "Reset Password" : isSignup ? "Sign Up" : "Login"}
        </h2>

        <form onSubmit={handleAuth} className="flex flex-col space-y-4">
          {/* Username only for signup */}
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

          {/* Email field */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border rounded"
          />

          {/* Password only for login/signup (not forgot) */}
          {!isForgot && (
            <input
              type="password"
              placeholder="Password"
              value={password}
              required={!isForgot}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 border rounded"
            />
          )}

          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
          {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white p-3 rounded transition 
              ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
          >
            {loading
              ? "Processing..."
              : isForgot
              ? "Send Reset Email"
              : isSignup
              ? "Create Account"
              : "Login"}
          </button>
        </form>

        {/* Links under form */}
        {!isSignup && !isForgot && (
          <p className="mt-3 text-center">
            <button
              onClick={() => {
                setIsForgot(true);
                resetFields();
                setErrorMsg("");
                setSuccessMsg("");
              }}
              className="text-blue-600 hover:underline text-sm"
            >
              Forgot Password?
            </button>
          </p>
        )}

        <p className="mt-4 text-center text-sm">
          {isForgot ? (
            <button
              onClick={() => {
                setIsForgot(false);
                resetFields();
              }}
              className="text-blue-600 hover:underline"
            >
              Back to Login
            </button>
          ) : isSignup ? (
            <>
              Already have an account?
              <button
                onClick={() => {
                  setIsSignup(false);
                  resetFields();
                  setErrorMsg("");
                  setSuccessMsg("");
                }}
                className="ml-2 text-blue-600 hover:underline"
              >
                Login
              </button>
            </>
          ) : (
            <>
              Don’t have an account?
              <button
                onClick={() => {
                  setIsSignup(true);
                  resetFields();
                  setErrorMsg("");
                  setSuccessMsg("");
                }}
                className="ml-2 text-blue-600 hover:underline"
              >
                Sign Up
              </button>
            </>
          )}
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

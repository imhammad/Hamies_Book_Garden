
import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabaseClient';

export default function AnimatedAuthModel({ onClose, onAuthSuccess }) {
  const [isSignup, setIsSignup] = useState(false);
  const [isForgot, setIsForgot] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const resetFields = () => {
    setEmail('');
    setPassword('');
    setUsername('');
  };

  async function handleAuth(e) {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (isForgot) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window?.location?.origin + '/reset-password',
        });
        if (error) setErrorMsg('Failed to send reset email: ' + error.message);
        else {
          setSuccessMsg('Password reset email sent! Please check your inbox.');
          resetFields();
          setTimeout(() => setIsForgot(false), 1600);
        }
      } else if (isSignup) {
        if (!username.trim()) {
          setErrorMsg('Please enter a username');
          setLoading(false);
          return;
        }
        const { error, data } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { username } },
        });
        if (error) {
          setErrorMsg('Signup failed. ' + error.message);
          resetFields();
        } else {
          setSuccessMsg('Signup successful! Please check your email to confirm.');
          if (onAuthSuccess) onAuthSuccess(data?.user);
          setTimeout(() => {
            onClose?.();
            resetFields();
          }, 1500);
        }
      } else {
        const { error, data } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          setErrorMsg('Incorrect email or password.');
          resetFields();
        } else {
          setSuccessMsg('Login successful! Redirecting...');
          if (onAuthSuccess) onAuthSuccess(data?.user);
          setTimeout(() => {
            onClose?.();
            resetFields();
          }, 900);
        }
      }
    } catch (err) {
      setErrorMsg('Unexpected error. Please try again.');
    }
    setLoading(false);
  }

  // Triangle panel animation (right side): shape + flip
  const clipLogin = 'polygon(60% 0%, 100% 0%, 100% 100%, 35% 100%)';
  const clipSignup = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'; // full cover

  const panelVariants = useMemo(
    () => ({
      login: { rotateY: 0, clipPath: clipLogin, transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] } },
      flipping: { rotateY: 180, transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] } },
      signup: { rotateY: 0, clipPath: clipSignup, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } },
    }),
    []
  );

  const [phase, setPhase] = useState('login'); // 'login' -> 'flipping' -> 'signup'

  function goSignup() {
    setIsSignup(true);
    setIsForgot(false);
    setErrorMsg('');
    setSuccessMsg('');
    // run fancy flip sequence
    setPhase('flipping');
    setTimeout(() => setPhase('signup'), 680);
  }
  function goLogin() {
    setIsSignup(false);
    setIsForgot(false);
    setErrorMsg('');
    setSuccessMsg('');
    setPhase('login');
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-4xl rounded-2xl border border-violet-500/40 bg-[#0a0014] shadow-[0_0_40px_rgba(168,85,247,0.35)] overflow-hidden">
        {/* Glow border */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />

        {/* Gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-purple-700/20 to-fuchsia-700/20" />

        {/* Right Diagonal Panel */}
        <motion.div
          key="panel"
          initial={false}
          animate={phase}
          variants={panelVariants}
          style={{ transformStyle: 'preserve-3d' }}
          className="absolute inset-0 origin-right"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-700 via-purple-700 to-fuchsia-700" />
          {/* Right-side content (welcome panel) */}
          <div className="absolute inset-0 flex items-center justify-end pr-10 pl-52">
            <div className="text-right text-white drop-shadow-sm">
              <h2 className="text-4xl font-extrabold tracking-tight">WELCOME<br/>BACK!</h2>
              <p className="mt-3 max-w-xs text-sm opacity-80">
                Lorem ipsum, dolor sit amet consectetur adipisicing.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Left form area */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2">
          {/* Form column */}
          <div className="relative z-10 p-8 sm:p-10 text-white">
            <h3 className="mb-6 text-3xl font-extrabold">{isForgot ? 'Reset Password' : isSignup ? 'Sign Up' : 'Login'}</h3>

            <form onSubmit={handleAuth} className="space-y-6">
              {isSignup && (
                <div>
                  <label className="mb-2 block text-sm opacity-80">Username</label>
                  <div className="flex items-center gap-3 border-b border-white/40 pb-2">
                    <span className="opacity-70">👤</span>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Your username"
                      required
                      className="w-full bg-transparent outline-none placeholder-white/50"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm opacity-80">Email</label>
                <div className="flex items-center gap-3 border-b border-white/40 pb-2">
                  <span className="opacity-70">📧</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    autoFocus
                    className="w-full bg-transparent outline-none placeholder-white/50"
                  />
                </div>
              </div>

              {!isForgot && (
                <div>
                  <label className="mb-2 block text-sm opacity-80">Password</label>
                  <div className="flex items-center gap-3 border-b border-white/40 pb-2">
                    <span className="opacity-70">🔒</span>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full bg-transparent outline-none placeholder-white/50"
                    />
                  </div>
                </div>
              )}

              {errorMsg && <p className="text-sm text-rose-400">{errorMsg}</p>}
              {successMsg && <p className="text-sm text-emerald-400">{successMsg}</p>}

              <button
                type="submit"
                disabled={loading}
                className={`w-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 font-semibold shadow-lg transition ${
                  loading ? 'opacity-50' : 'hover:brightness-110'
                }`}
              >
                {loading ? 'Processing…' : isForgot ? 'Send Reset Email' : isSignup ? 'Create Account' : 'Login'}
              </button>
            </form>

            {/* Links */}
            {!isSignup && !isForgot && (
              <p className="mt-4 text-sm">
                <button onClick={() => setIsForgot(true)} className="underline/30 underline-offset-4 hover:underline">
                  Forgot Password?
                </button>
              </p>
            )}

            <div className="mt-5 text-sm">
              {isForgot ? (
                <button onClick={goLogin} className="underline/30 underline-offset-4 hover:underline">
                  Back to Login
                </button>
              ) : isSignup ? (
                <>
                  Already have an account?
                  <button onClick={goLogin} className="ml-2 underline/30 underline-offset-4 hover:underline">
                    Login
                  </button>
                </>
              ) : (
                <>
                  Don’t have an account?
                  <button onClick={goSignup} className="ml-2 underline/30 underline-offset-4 hover:underline">
                    Sign Up
                  </button>
                </>
              )}
            </div>

            <button onClick={onClose} className="absolute right-4 top-4 text-white/70 transition hover:text-white">✕</button>
          </div>

          {/* spacer column to match visual layout (right panel sits above) */}
          <div className="h-full min-h-[440px]" />
        </div>
      </div>
    </div>
  );
}

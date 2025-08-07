import React, { useState } from 'react';
import AuthModal from './AuthModal';

function SignUpButton() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div>
      <button
        onClick={() => setShowAuthModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Login / Sign Up
      </button>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  );
}

export default SignUpButton;

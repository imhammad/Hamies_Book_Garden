import React, { useState } from 'react';
import AnimatedAuthModel from './AnimatedAuthModel';

function SignUpButton() {
  const [showAnimatedAuthModel, setShowAnimatedAuthModel] = useState(false);

  return (
    <div>
      <button
        onClick={() => setShowAnimatedAuthModel(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Login / Sign Up
      </button>

      {showAnimatedAuthModel && <AnimatedAuthModel onClose={() => setShowAnimatedAuthModel(false)} />}
    </div>
  );
}

export default SignUpButton;

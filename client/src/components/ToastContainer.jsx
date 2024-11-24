import React, { useState } from "react";
import Toast from "./Toast";

const ToastContainer = ({ message, isVisible, setIsVisible }) => {
  
  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div>
      {/* <button 
                onClick={showToast} 
                className="bg-blue-500 text-white p-2 rounded"
            >
                Show Toast
            </button> */}
      {isVisible && <Toast message={message} onClose={handleClose} />}
    </div>
  );
};

export default ToastContainer;

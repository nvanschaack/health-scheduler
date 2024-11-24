import React from 'react';

const Toast = ({ message, onClose }) => {
    return (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg transform transition-transform duration-300">
            <p>{message}</p>
            <button onClick={onClose} className="ml-4 text-white font-bold">×</button>
        </div>
    );
};

export default Toast;
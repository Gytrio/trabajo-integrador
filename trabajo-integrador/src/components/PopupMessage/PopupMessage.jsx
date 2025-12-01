import React from 'react';
import { ToastContainer as PopupMessageContainer } from 'react-toastify';
import './PopupMessage.css';

const PopupMessage = () => (
  <PopupMessageContainer
    className="popup-message-container"
    position="bottom-right"
    theme="dark"
  />
);

export default PopupMessage;

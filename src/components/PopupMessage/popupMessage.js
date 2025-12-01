import { toast as popupMessageDriver } from 'react-toastify';

export const PopupMessage = {
  success: (message, options) => popupMessageDriver.success(message, options),
  error: (message, options) => popupMessageDriver.error(message, options),
  info: (message, options) => popupMessageDriver.info(message, options),
  warning: (message, options) => popupMessageDriver.warn(message, options),
};

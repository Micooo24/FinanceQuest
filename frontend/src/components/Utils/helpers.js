import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const authenticate = (data, next) => {
    if (window !== 'undefined') {
        // console.log('authenticate', response)
        localStorage.setItem('authToken', JSON.stringify(data.token));
        localStorage.setItem('user', JSON.stringify(data.user));
    }
    next();
};

export const getToken = () => {
  if (window !== "undefined") {
    if (localStorage.getItem("authToken")) {
      return JSON.parse(localStorage.getItem("authToken"));
    } else {
      return false;
    }
  }
};
export const getTheEmailFromToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    // Decode JWT payload
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decodedPayload = JSON.parse(atob(base64));

    console.log("Decoded Payload:", decodedPayload); // Debug the payload

    // Try different keys for the user ID
    return (
      decodedPayload.user_id || decodedPayload.id || decodedPayload.sub || null
    );
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

// access user name from session storage
export const getUser = () => {
    if (window !== 'undefined') {
        if (sessionStorage.getItem('user')) {
            return JSON.parse(sessionStorage.getItem('user'));
        } else {
            return false;
        }
    }
};

// remove token from session storage
export const logout = next => {
    if (window !== 'undefined') {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
    }
    next();
};

export const errMsg = (message = '') => toast.error(message, {
    position: 'bottom-right'
});
export const successMsg = (message = '') => toast.success(message, {
    position: 'bottom-right'
});
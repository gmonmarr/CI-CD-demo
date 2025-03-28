// src/utils/tokenUtils.js

// Save token to sessionStorage
export const saveToken = (token) => {
  if (token) {
    sessionStorage.setItem('authToken', token);
    console.log('Token stored in session:', token);
  } else {
    console.warn("Attempted to save an empty token.");
  }
};

// Get token from sessionStorage
export const getToken = () => {
  const token = sessionStorage.getItem('authToken');
  if (token) {
    console.log('Token retrieved from session.');
  } else {
    console.log('No token found in session.');
  }
  return token;
};

// Remove token from sessionStorage
export const removeToken = () => {
  sessionStorage.removeItem('authToken');
  console.log('Token removed from session.');
};

// Check if token exists in sessionStorage and validate it with the backend
export const isTokenValid = async (token) => {
  if (!token) {
    console.log("No token provided");
    return false;
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/login/authenticateToken`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.log(`Token validation failed. Status: ${response.status}`);
      if (response.status === 401) {
        console.log('Token might be expired or invalid.');
      }
      return false; // Token is invalid or expired
    }

    // If the response is ok, we assume the token is valid.
    try {
      const data = await response.json();
      console.log("Token validation response:", data);
    } catch (jsonError) {
      console.warn("Token validation response could not be parsed, assuming token is valid");
    }
    console.log("Token is valid");
    return true;
  } catch (error) {
    console.error('Error verifying token:', error);
    return false;
  }
};

// Login user with email and password, and save the token if successful
export const loginUser = async (email, password) => {
  console.log("loginUser function called");

  try {
    const url = `${import.meta.env.VITE_API_URL}/login`;
    console.log("Sending request to:", url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      console.error("HTTP Error:", response.status, response.statusText);
      return { success: false, message: `Error ${response.status}: ${response.statusText}` };
    }

    let data;
    try {
      data = await response.json();
      console.log("API Response:", data);
    } catch (jsonError) {
      console.error("Error parsing JSON:", jsonError);
      return { success: false, message: "Error parsing response data" };
    }

    if (data?.token) {
      saveToken(data.token);
      console.log("Token stored in session:", data.token);
      return { success: true, message: "Login successful" };
    } else {
      console.warn("Login failed:", data?.message || "Invalid credentials");
      return { success: false, message: data?.message || "Invalid credentials" };
    }
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: error.message };
  }
};

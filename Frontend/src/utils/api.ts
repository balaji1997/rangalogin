import axios from 'axios';

// Create an Axios instance
const API = axios.create({
  baseURL: 'http://localhost:9090/api', // Base URL for backend API
  headers: {
    'Content-Type': 'application/json', // Default header for JSON
  },
});

// Function to handle generic API errors
const handleApiError = (error: any) => {
  if (error.response) {
    // Server responded with a status other than 2xx
    console.error('API Error Response:', error.response.data);
    throw new Error(error.response.data.message || 'API error occurred');
  } else if (error.request) {
    // No response was received from server
    console.error('API No Response:', error.request);
    throw new Error('No response from server. Please try again.');
  } else {
    // Something went wrong in setting up the request
    console.error('API Request Setup Error:', error.message);
    throw new Error(error.message || 'Unexpected error occurred');
  }
};

// Function to register a new user
export const registerUser = async (name: string, email: string, password: string) => {
  try {
    const response = await API.post('/users/register', { name, email, password });
    return response.data; // Return response data
  } catch (error) {
    handleApiError(error); // Handle errors using the utility function
  }
};

// Function to log in a user
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await API.post('/users/login', { email, password });
    return response.data; // Return response data
  } catch (error) {
    handleApiError(error); // Handle errors using the utility function
  }
};

// Add other API functions as needed
export const fetchUserProfile = async (userId: string) => {
  try {
    const response = await API.get(`/users/${userId}`);
    return response.data; // Return user profile data
  } catch (error) {
    handleApiError(error);
  }
};

// Default export of the API instance
export default API;


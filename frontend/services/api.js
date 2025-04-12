import axios from "axios";
import { create } from "zustand";
import {jwtDecode} from "jwt-decode";


const API_URL ="https://project-manager-backend-nh9o.onrender.com/api";

// Set up Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Include credentials (cookies) in requests
});

// Add a request interceptor to include the JWT token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Ensure the key matches what you use in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  signup: async (email, password, username) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post(
        `/auth/signup`,
        { email, password, username },
        { withCredentials: true }
      );

      // console.log("Full response:", response); // Debugging
      // console.log("Received token:", response.data.token); // Check if the token exists

      if (!response.data.token) {
        throw new Error("token missing in response!");
      }

      localStorage.setItem("token", response.data.token); // ✅ Ensure correct key name
      // console.log("Stored token:", localStorage.getItem("token")); // Debugging

      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error signing up",
        isLoading: false,
      });
      console.error("Signup Error:", error);
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/auth/login", { email, password });
      // console.log("Full response:", response); // Debugging
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        // console.log("Token stored in local storageis:", response.data.token);

        // Decode token to get userId
        const decoded = jwtDecode(response.data.token);
        const userId = decoded.user_id; // Extract user_id from the token
        localStorage.setItem("userId", userId); // Save userId to localStorage
        // console.log("Logged in successfully. User ID:", userId);

        // Store user data in Zustand
        set({                          // ✅ Use set() to update state
          user: response.data.user,
          isAuthenticated: true,
          error: null,
          isLoading: false,
        });

      }
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error logging in",
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("userId"); // Remove userId on logout
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },

  // verifyEmail: async (code) => {
  //   set({ isLoading: true, error: null });
  //   try {
  //     const response = await api.post(`/auth/verify-email`, {
  //       code,
  //     });
  //     // console.log("response", response);

  //     set({
  //       user: response.data.user,
  //       isAuthenticated: true,
  //       isLoading: false,
  //     });
  //     return response.data;
  //   } catch (error) {
  //     set({
  //       error: error.response.data.message || "Error verifying email",
  //       isLoading: false,
  //     });
  //     throw error;
  //   }
  // },
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        set({
          user: null,
          isAuthenticated: false,
          isCheckingAuth: false,
        });
        return;
      }
  
      // Check if token is expired
      const decoded = jwtDecode(token);
      const isExpired = decoded.exp * 1000 < Date.now(); // Check if token is expired
      if (isExpired) {
        console.log("Token is expired");
        localStorage.removeItem("token"); // Clear expired token
        set({
          user: null,
          isAuthenticated: false,
          isCheckingAuth: false,
        });
        return;
      }
  
      // Send request to check-auth endpoint
      const response = await api.get("/auth/check-auth", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.data.success) {
        set({
          user: response.data.user,
          isAuthenticated: true,
          isCheckingAuth: false,
        });
      } else {
        localStorage.removeItem("token"); // Clear invalid token
        set({
          user: null,
          isAuthenticated: false,
          isCheckingAuth: false,
        });
      }
    } catch (error) {
      localStorage.removeItem("token"); // Clear token on error
      set({
        user: null,
        isAuthenticated: false,
        isCheckingAuth: false,
        error: null,
      });
    }
  },

  // forgotPassword: async (email) => {
  //   set({ isLoading: true, error: null });
  //   try {
  //     const response = await api.post(`/auth/forgot-password`, {
  //       email,
  //     });
  //     // console.log("response", response);
  //     set({ message: response.data.message, isLoading: false });
  //   } catch (error) {
  //     set({
  //       isLoading: false,
  //       error:
  //         error.response.data.message || "Error sending reset password email",
  //     });
  //     throw error;
  //   }
  // },
  // resetPassword: async (token, password) => {
  //   set({ isLoading: true, error: null });
  //   try {
  //     const response = await api.post(`auth/reset-password/${token}`,
  //       { password }
  //     );
  //     set({ message: response.data.message, isLoading: false });
  //   } catch (error) {
  //     set({
  //       isLoading: false,
  //       error: error.response.data.message || "Error resetting password",
  //     });
  //     throw error;
  //   }
  // },
}));

// Excel API
export const uploadExcel = (file) => {

  const userId = localStorage.getItem("userId"); // Get userId from localStorage
  const formData = new FormData();
  formData.append("file", file);
  formData.append("userId", userId); // Add userId to the FormData
  return api.post("/projects/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const downloadExcel = (division) =>
  api.get("/projects/download", { params: { division }, responseType: "blob" });

//Project API

export const addProject = async (newproject) => {
  try {
    // console.log("newproject", newproject);
    const userId = localStorage.getItem("userId"); // Get userId from localStorage
    const response = await api.post(`/projects/addproject`, { ...newproject, userId });
    // console.log("Full API Response:", response); // Logs the full response object
    return response.data.data;
  } catch (error) {
    console.error(
      "Error creating project:",
      error.response?.data?.error || error.message
    );
    throw new Error(error.response?.data?.error || "Failed to create project");
  }
};

export const getProjects = async () => {
  try {
    const userId = localStorage.getItem("userId"); // Get userId from localStorage
    const response = await api.get("/projects/getProjects", { params: { userId } });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching projects:",
      error.response?.data?.error || error.message
    );
    throw new Error(error.response?.data?.error || "Failed to fetch projects");
  }
};


export const updateProject = async (id, projectData) => {
  try {
    const response = await api.put(`/projects/${id}`, projectData);
    return response.data.data;
  } catch (error) {
    console.error(
      "Error updating project:",
      error.response?.data?.error || error.message
    );
    throw new Error(error.response?.data?.error || "Failed to update project");
  }
};

export const deleteProject = async (id) => {
  try {
    const response = await api.delete(`/projects/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(
      "Error deleting project:",
      error.response?.data?.error || error.message
    );
    throw new Error(error.response?.data?.error || "Failed to delete project");
  }
};

export const searchProjects = async (searchTerm) => {
  try {
    const response = await api.get(`/projects`, {
      params: { search: searchTerm },
    });
    return response.data.data;
  } catch (error) {
    console.error(
      "Error searching projects:",
      error.response?.data?.error || error.message
    );
    throw new Error(error.response?.data?.error || "Failed to search projects");
  }
};

export const useProfileStore = create((set) => ({
  isLoading: false,
  error: null,
  profile: null,

  fetchProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      
      const response = await api.get('/users/profile');
      // console.log("response", response.data);
      
      set({ profile: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Failed to fetch profile",
        isLoading: false 
      });
      throw error;
    }
  },

  updateProfile: async (profileData) => {
    set({ isLoading: true, error: null });
    try {
      // console.log("profileData", profileData);
      const response = await api.post('/users/profile', profileData);
      // console.log("response", response.data);
      
      set({ profile: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to update profile",
        isLoading: false
      });
      throw error;
    }
  }
}));


export default api;

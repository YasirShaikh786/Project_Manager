import axios from "axios";
import { create } from "zustand";

const API_URL = "http://localhost:5000/api"; // Backend URL

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
    console.log("Request Config:", config); // Debugging: Log the request config
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

      console.log("Full response:", response); // Debugging
      console.log("Received token:", response.data.token); // Check if the token exists

      if (!response.data.token) {
        throw new Error("token missing in response!");
      }

      localStorage.setItem("token", response.data.token); // ✅ Ensure correct key name
      console.log("Stored token:", localStorage.getItem("token")); // Debugging

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

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        set({
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

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/verify-email`, {
        code,
      });
      console.log("response", response);

      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },
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

      const response = await api.get("/auth/check-auth");

      if (response.data.success) {
        set({
          user: response.data.user,
          isAuthenticated: true,
          isCheckingAuth: false,
        });
      }
    } catch (error) {
      localStorage.removeItem("token");
      set({
        user: null,
        isAuthenticated: false,
        isCheckingAuth: false,
        error: null,
      });
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, {
        email,
      });
      console.log("response", response);
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error.response.data.message || "Error sending reset password email",
      });
      throw error;
    }
  },
  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${API_URL}/auth/reset-password/${token}`,
        { password }
      );
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error resetting password",
      });
      throw error;
    }
  },
}));

// Excel API
export const uploadExcel = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post("/projects/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const downloadExcel = (division) =>
  api.get("/projects/download", { params: { division }, responseType: "blob" });

//Project API

export const createProject = async (projectData) => {
  try {
    const response = await api.post(`/projects`, projectData);
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
    const response = await api.get(`/projects`);
    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching projects:",
      error.response?.data?.error || error.message
    );
    throw new Error(error.response?.data?.error || "Failed to fetch projects");
  }
};

export const getProjectById = async (id) => {
  try {
    const response = await api.get(`/projects/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching project:",
      error.response?.data?.error || error.message
    );
    throw new Error(error.response?.data?.error || "Failed to fetch project");
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
      console.log("response", response.data);
      
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
      console.log("profileData", profileData);
      const response = await api.post('/users/profile', profileData);
      console.log("nakjdfakjsda", response.data);
      
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

// Profile API

// export const fetchProfile = async () => {
// 	const token = localStorage.getItem("token"); // Retrieve token from storage

// 	if (!token) {
// 	  console.error("No token found in localStorage. Please log in.");
// 	  throw new Error("No token found. Please log in.");
// 	}

// 	console.log("Auth token Before Request:", token); // Debugging

// 	try {
// 	  const response = await api.get(`/users/profile`, {
// 		headers: {
// 		  Authorization: `Bearer ${token}`, // Ensure it's in the right format
// 		},
// 		withCredentials: true, // If your backend uses cookies
// 	  });

// 	  console.log("Auth token After Request:", token); // Debugging
// 	  return response.data;
// 	} catch (error) {
// 	  console.error("Error fetching profile:", error);

// 	  if (error.response?.status === 401) {
// 		// Handle unauthorized error - maybe redirect to login
// 		throw new Error("Please login again to continue.");
// 	  }

// 	  throw new Error("Failed to fetch profile. Please try again later.");
// 	}
//   };

//   // Save Profile
//   export const saveProfile = async (profileData) => {
// 	const token = localStorage.getItem("token"); // Retrieve token from storage

// 	if (!token) {
// 	  console.error("No token found in localStorage. Please log in.");
// 	  throw new Error("No token found. Please log in.");
// 	}

// 	try {
// 	  const response = await api.put(`/users/profile`,
// 		profileData,
// 		{
// 		  headers: {
// 			Authorization: `Bearer ${token}`,
// 		  },
// 		  withCredentials: true, // If your backend uses cookies
// 		}
// 	  );

// 	  return response.data;
// 	} catch (error) {
// 	  console.error("Error saving profile:", error);

// 	  if (error.response?.status === 401) {
// 		// Handle unauthorized error - maybe redirect to login
// 		throw new Error("Please login again to continue.");
// 	  }

// 	  throw new Error("Failed to save profile. Please try again later.");
// 	}
//   };

export default api;

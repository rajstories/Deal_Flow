import axios from 'axios';

// Create a central Axios instance
const API = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 15000, // Reasonable timeout
});

// Response Interceptor to handle errors globally
API.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Log the error to the console as requested
        console.error('API Service Error:', error.response || error.message);

        // Propagate the error so calling components can handle UI feedback
        return Promise.reject(error);
    }
);

/**
 * Fetch dashboard statistics
 * GET /dashboard/stats
 */
export const fetchDashboardStats = async () => {
    const response = await API.get('/dashboard/stats');
    return response.data;
};

/**
 * Fetch portfolio data
 * GET /portfolio
 */
export const fetchPortfolio = async () => {
    const response = await API.get('/portfolio');
    return response.data;
};

/**
 * Fetch recent activity
 * GET /activity
 */
export const fetchRecentActivity = async () => {
    const response = await API.get('/activity');
    return response.data;
};

/**
 * Analyze a pitch deck
 * POST /analyze
 * Handles multipart/form-data for file uploads
 */
export const analyzePitchDeck = async (formData) => {
    // Axios processing multipart/form-data automatically if data is FormData
    // But setting header explicitly ensures clarity and correctness if config overrides exist
    const response = await API.post('/analyze', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// --- Backward Compatibility / Helper Exports (Optional based on previous refactors) ---
// If the previous components are still using these names, we can alias them or update components.
// For now, I will add aliases to ensure the app doesn't break while we transition to the new naming convention.

export const getDashboardMetrics = fetchDashboardStats;
export const getAgentActivity = fetchRecentActivity;
export const getLatestAnalysis = async () => {
    // If there isn't a direct replacement in the new spec, we can keep the old endpoint or map it.
    // Assuming 'fetchDashboardStats' might contain this data, or we keep a specific endpoint.
    // I will keep the original endpoint call but use the new API instance.
    const response = await API.get('/analysis/latest');
    return response.data;
};

export default API;

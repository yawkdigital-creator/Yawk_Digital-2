// API Configuration
// In development, use localhost. In production, use the deployed backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Debug logging (only in development)
if (import.meta.env.DEV) {
  console.log('API_BASE_URL:', API_BASE_URL);
  console.log('VITE_API_URL from env:', import.meta.env.VITE_API_URL);
}

export const API_ENDPOINTS = {
  submitForm: `${API_BASE_URL}/api/strategy-call/submit`,
  getSubmissions: (limit = 100) => `${API_BASE_URL}/api/strategy-call/submissions?limit=${limit}`,
  getSubmission: (id: string) => `${API_BASE_URL}/api/strategy-call/submissions/${id}`,
  updateStatus: (id: string) => `${API_BASE_URL}/api/strategy-call/submissions/${id}/status`,
  health: `${API_BASE_URL}/api/health`,
  // Testimonials
  submitTestimonial: `${API_BASE_URL}/api/testimonials/submit`,
  getTestimonials: (status = 'all') => `${API_BASE_URL}/api/testimonials?status=${status}`,
  getApprovedTestimonials: `${API_BASE_URL}/api/testimonials/approved`,
  updateTestimonialStatus: (id: string) => `${API_BASE_URL}/api/testimonials/${id}/status`,
  deleteTestimonial: (id: string) => `${API_BASE_URL}/api/testimonials/${id}`,
  editTestimonial: (id: string) => `${API_BASE_URL}/api/testimonials/${id}`,
};

export default API_BASE_URL;

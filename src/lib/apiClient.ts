/**
 * Centralized API Client for Karmadude
 * All API endpoints are configured here for easy management
 * 
 * Environment variables (defined in .env file):
 * - VITE_API_BASE_URL: The base URL for the API server
 */

// Read from environment variables
const ENV_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const API_BASE_URL = `${ENV_API_BASE_URL}/api`;

// Export values for use throughout the app
export const BASE_URL = ENV_API_BASE_URL;
export const ASSETS_BASE = `${ENV_API_BASE_URL}/`;


// API Endpoints
export const API_ENDPOINTS = {
    STUDENT_INQUIRIES: `${API_BASE_URL}/student-inquiries`,
    CONTACTS: `${API_BASE_URL}/contacts`,
    ONBOARDING: `${API_BASE_URL}/onboarding`,
    QUOTATIONS: `${API_BASE_URL}/quotations`,
    STUDENTS: `${API_BASE_URL}/students`,
    TEAM_MEMBERS: `${API_BASE_URL}/team-members`,
    CULTURE_GALLERY: `${API_BASE_URL}/culture-gallery`,
    CULTURE_BENEFITS: `${API_BASE_URL}/culture-benefits`,
    JOBS: `${API_BASE_URL}/jobs`,
    JOB_APPLICATIONS: `${API_BASE_URL}/job-applications`,
    WORKS: `${API_BASE_URL}/works`,
    WORK_CATEGORIES: `${API_BASE_URL}/work-categories`,
    UPLOAD: `${ENV_API_BASE_URL}/api/upload`,
    ANALYTICS_TRACK: `${API_BASE_URL}/analytics/track`,
} as const;

// Generic API response type
interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    message?: string;
    code?: string;
    duplicate_fields?: string[];
}

// Generic POST request handler
export async function apiPost<T = unknown>(
    endpoint: string,
    data: Record<string, unknown>
): Promise<ApiResponse<T>> {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': import.meta.env.VITE_API_KEY || 'karmadude_api_key_secure_2025',
            },
            body: JSON.stringify(data),
        });


        const result = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: result.message || 'Request failed',
                code: result.code,
                duplicate_fields: result.duplicate_fields,
            };
        }

        // Return the API response structure directly
        return {
            success: result.success ?? true,
            data: result.data ?? result,
            message: result.message
        };
    } catch (error) {
        console.error('API Error:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Network error occurred',
        };
    }
}

// Generic GET request handler
export async function apiGet<T = unknown>(endpoint: string): Promise<ApiResponse<T>> {
    try {
        const response = await fetch(endpoint, {
            headers: {
                'x-api-key': import.meta.env.VITE_API_KEY || 'karmadude_api_key_secure_2025',
            },
        });

        const result = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: result.message || 'Request failed',
            };
        }

        return {
            success: result.success ?? true,
            data: result.data ?? result,
            message: result.message
        };
    } catch (error) {
        console.error('API Error:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Network error occurred',
        };
    }
}

// Convenience functions for each endpoint
export const api = {
    studentInquiries: {
        create: (data: Record<string, unknown>) => apiPost(API_ENDPOINTS.STUDENT_INQUIRIES, data),
    },
    contacts: {
        create: (data: Record<string, unknown>) => apiPost(API_ENDPOINTS.CONTACTS, data),
    },
    onboarding: {
        create: (data: Record<string, unknown>) => apiPost(API_ENDPOINTS.ONBOARDING, data),
    },
    quotations: {
        create: (data: Record<string, unknown>) => apiPost(API_ENDPOINTS.QUOTATIONS, data),
    },
    students: {
        create: (data: Record<string, unknown>) => apiPost(API_ENDPOINTS.STUDENTS, data),
        getAll: () => apiGet(API_ENDPOINTS.STUDENTS),
    },
    teamMembers: {
        getAll: () => apiGet(API_ENDPOINTS.TEAM_MEMBERS),
        getOne: (id: string) => apiGet(`${API_ENDPOINTS.TEAM_MEMBERS}/${id}`),
    },
    culture: {
        getGallery: () => apiGet(API_ENDPOINTS.CULTURE_GALLERY),
        getBenefits: () => apiGet(API_ENDPOINTS.CULTURE_BENEFITS),
    },
    jobs: {
        getAll: () => apiGet(API_ENDPOINTS.JOBS),
    },
    jobApplications: {
        create: (data: Record<string, unknown>) => apiPost(API_ENDPOINTS.JOB_APPLICATIONS, data),
    },
    works: {
        getAll: () => apiGet(API_ENDPOINTS.WORKS),
    },
    workCategories: {
        getAll: () => apiGet(API_ENDPOINTS.WORK_CATEGORIES),
    },
    UPLOAD: API_ENDPOINTS.UPLOAD,
    analytics: {
        track: (data: Record<string, unknown>) => apiPost(API_ENDPOINTS.ANALYTICS_TRACK, data),
    },
};

export default api;

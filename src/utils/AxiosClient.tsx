import axios from 'axios';
import KeychainService from "../utils/KeychainService";
import SessionManager from "../utils/SessionManager";
import { useAuth } from '../context/AuthContext';

const apiClient = axios.create({
    baseURL: 'https://api.suzueyume.id.vn',
});

apiClient.interceptors.request.use(async (config) => {
    const tokens: { accessToken?: string; refreshToken?: string } | null = await KeychainService.getTokens() as { accessToken?: string; refreshToken?: string } | null;
    if (tokens?.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
    
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            console.log('Refreshing token...');

        if (error.config.url?.includes('/refresh')) {
            const {logout} = useAuth();
            logout();
            return Promise.reject(error);
        }
  
        try {
            const tokens = await KeychainService.getTokens();
            if (tokens?.refreshToken) {
                const refreshResponse = await apiClient.post('/refresh', {
                    refreshToken: tokens?.refreshToken,
                });
    
                const { accessToken, refreshToken } = refreshResponse.data;
    
                // Lưu token mới vào Keychain
                await KeychainService.saveTokens(accessToken, refreshToken);
                console.log('Token refreshed.');
    
                // Thêm token mới vào request và gửi lại
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return apiClient(originalRequest);
            }
        } catch (refreshError) {
            console.error('Error refreshing token:', refreshError);
            return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
);  

export default apiClient;

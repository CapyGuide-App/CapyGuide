import axios from 'axios';
import KeychainService from '../utils/KeychainService';
import SessionManager from '../utils/SessionManager';
import apiClient from '../utils/AxiosClient';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const handleError = error => {
  if (error.response) {
    // Server responded with a status code outside the 2xx range
    console.error(
      'Error response:',
      error.response.data.message || error.response.data || error.message,
    );
    return error.response.data.message || 'An error occurred';
  } else if (error.request) {
    // No response was received from the server
    console.error('No response received:', error.message);
    return 'Unable to reach the server. Please try again later.';
  } else {
    // Request setup error
    console.error('Request error:', error.message);
    return 'An unexpected error occurred.';
  }
};

export const fetchGoogleLogin = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const {idToken} = userInfo.data;
    const response = await axios.post(
      'https://api.suzueyume.id.vn/login/google',
      {googleIdToken: idToken},
    );
    const {accessToken, refreshToken} = response.data;
    await KeychainService.saveTokens(accessToken, refreshToken);
    const userId = response.data.userId;
    await SessionManager.saveUserSession(userId);
    console.log('Google login successful!');
  } catch (error) {
    console.error(
      'Google login failed:',
      error.response?.data || error.message,
    );
  }
};

export const fetchData = async (source, type, signal, options = {}) => {
  const maxRetries = 3;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const response = await apiClient.get('/nearby', {
        ...options,
        params: {
          ...options.params,
          long: source.coords.longitude,
          lat: source.coords.latitude,
          type: type,
        },
        signal: signal,
        timeout: 5000,
      });
      return response.data;
    } catch (error) {
      retries++;
      if (error.name === 'AbortError' || error.name === 'CanceledError') {
        return;
      } else {
        if (retries >= maxRetries) {
          const message = handleError(error);
          console.error('Request failed:', message);
          throw new Error(message);
        }
      }
    }
  }
};

export const fetchLogin = async (username, password) => {
  try {
    const response = await axios.post('https://api.suzueyume.id.vn/login', {
      username,
      password,
    });
    const {accessToken, refreshToken} = response.data;
    await KeychainService.saveTokens(accessToken, refreshToken);
    const userId = response.data.userId;
    await SessionManager.saveUserSession(userId);

    console.log('Login successful!');
  } catch (error) {
    const message = handleError(error);
    console.error('Login failed:', message);
    throw new Error(message);
  }
};

export const fetchRegister = async (displayname, username, password, email) => {
  try {
    const response = await axios.post('https://api.suzueyume.id.vn/register', {
      displayname,
      username,
      password,
      email,
    });

    // Lưu token vào Keychain
    const {accessToken, refreshToken} = response.data;
    await KeychainService.saveTokens(accessToken, refreshToken);
    const userId = response.data.userId;
    await SessionManager.saveUserSession(userId);

    console.log('Register successful!');
  } catch (error) {
    console.error('Register failed:', error.response?.data || error.message);
  }
};

export const fetchProfile = async () => {
  try {
    const response = await apiClient.get('/profile');
    return response.data;
  } catch (error) {
    const message = handleError(error);
    console.error('Failed to fetch profile:', message);
    throw new Error(message);
  }
};

export const fetchUpdateProfile = async (profileData, avatar) => {
  try {
    const formData = new FormData();
    formData.append('displayname', profileData.displayname || '');
    formData.append('username', profileData.username || '');
    formData.append('bio', profileData.bio || '');
    if (
      avatar &&
      avatar.uri &&
      avatar.type &&
      avatar.type.startsWith('image/')
    ) {
      formData.append('avatar', {
        uri: avatar.uri,
        type: avatar.type,
        name: avatar.fileName || 'avatar',
      });
    }
    const response = await apiClient.post('/profile/update', formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
    return response.data;
  } catch (error) {
    const message = handleError(error);
    // 409 Conflict: Username already exists
    if (error.response?.status === 409) {
      throw new Error('Username already exists');
    }
    console.error('Failed to update profile:', message);
    throw new Error(message);
  }
};

export const fetchReviewsOfPOI = async (poiId, signal, params) => {
  if (!poiId) {
    return;
  }
  try {
    const response = await apiClient.get(`/poi/${poiId}/reviews`, {
      params: params,
      signal: signal,
    });
    console.log('Fetched reviews:', response.data);
    return response.data.review;
  } catch (error) {
    const message = handleError(error);
    console.error('Failed to fetch reviews:', message);
    throw new Error(message);
  }
};

export const fetchPOI = async (poiId, signal) => {
  try {
    const response = await apiClient.get(`/poi/${poiId}`, {signal: signal});
    return response.data;
  } catch (error) {
    const message = handleError(error);
    console.error('Failed to fetch POI:', message);
    throw new Error(message);
  }
};

export const reloadData = async (request, saveData, setStatus) => {
  setStatus && setStatus('loading');
  request &&
    request
      .then(data => {
        if (data) {
          saveData && saveData(data);
          setStatus && setStatus('success');
        }
      })
      .catch(error => {
        if (error.name === 'CanceledError' || error.name === 'AbortError') {
          console.log('Request was canceled');
        } else {
          setStatus && setStatus('error');
          console.error(error);
        }
      });
};

export const fetchDeletePost = async postId => {
  try {
    const response = await apiClient.post(`/blog/${postId}/delete`);
    return response.data;
  } catch (error) {
    const message = handleError(error);
    console.error('Failed to delete post:', message);
    throw new Error(message);
  }
};

export const fetchUpdatePost = async (postId, title, titleImage, elements) => {
  try {
    const formData = new FormData();
    formData.append('title', title);
    {
      titleImage?.fileName &&
        formData.append('title_image', {
          uri: titleImage.uri,
          type: titleImage.type,
          name: titleImage.fileName || 'titleImage',
        });
    }
    formData.append('elements', JSON.stringify(elements));

    elements.forEach((el, index) => {
      if (el.type.startsWith('image') || el.type.startsWith('video')) {
        if (el.fileName) {
          formData.append(`media`, {
            uri: el.uri,
            type: el.type,
            name: el.fileName,
          });
        }
      }
    });

    const response = await apiClient.post(`/blog/${postId}/update`, formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
    return response.data;
  } catch (error) {
    const message = handleError(error);
    console.error('Failed to update post:', message);
    throw new Error(message);
  }
};

export const fetchCreatePost = async (title, titleImage, elements) => {
  try {
    const formData = new FormData();
    formData.append('title', title);
    {
      titleImage &&
        formData.append('title_image', {
          uri: titleImage.uri,
          type: titleImage.type,
          name: titleImage.fileName || 'titleImage',
        });
    }

    formData.append('elements', JSON.stringify(elements));

    elements.forEach((el, index) => {
      if (el.type.startsWith('image') || el.type.startsWith('video')) {
        formData.append(`media`, {
          uri: el.uri,
          type: el.type,
          name: el.fileName || `media${index}`,
        });
      }
    });

    const response = await apiClient.post('/post/create', formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
    return response.data;
  } catch (error) {
    const message = handleError(error);
    console.error('Failed to create post:', message);
    throw new Error(message);
  }
};

export const fetchBlogs = async (params, signal) => {
  try {
    const response = await apiClient.get('/blog', {
      params: params,
      signal: signal,
    });
    return response.data;
  } catch (error) {
    const message = handleError(error);
    console.error('Failed to fetch blog posts:', message);
    throw new Error(message);
  }
};

export const fetchBlog = async (blogId, signal) => {
  try {
    const response = await apiClient.get(`/blog/${blogId}`, {signal: signal});
    return response.data;
  } catch (error) {
    const message = handleError(error);
    console.error('Failed to fetch blog post:', message);
    throw new Error(message);
  }
};

export const fetchReactionBlog = async (blogId, type, status) => {
  try {
    const response = await apiClient.post(`/blog/${blogId}/${type}`, {status});
    return response.data;
  } catch (error) {
    const message = handleError(error);
    console.error('Failed to react to blog post:', message);
    throw new Error(message);
  }
};

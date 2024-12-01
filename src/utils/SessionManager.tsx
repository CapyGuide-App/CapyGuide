import AsyncStorage from '@react-native-async-storage/async-storage';

const SessionManager = {
  // Save user session data
  async saveUserSession(userData: any) {
    try {
      const jsonData = JSON.stringify(userData);
      await AsyncStorage.setItem('user_session', jsonData);
    } catch (error) {
      console.error('Error saving user session:', error);
    }
  },

  // Retrieve user session data
  async getUserSession() {
    try {
      const jsonData = await AsyncStorage.getItem('user_session');
      return jsonData != null ? JSON.parse(jsonData) : null;
    } catch (error) {
      console.error('Error retrieving user session:', error);
      return null;
    }
  },

  // Clear user session data
  async clearUserSession() {
    try {
      await AsyncStorage.removeItem('user_session');
    } catch (error) {
      console.error('Error clearing user session:', error);
    }
  },
};

export default SessionManager;

import * as Keychain from 'react-native-keychain';

const KeychainService = {
    /**
     * Save token (access and refresh tokens) securely
     * @param {string} accessToken 
     * @param {string} refreshToken 
     */
    saveTokens: async (accessToken: string, refreshToken: string) => {
        try {
            await Keychain.setGenericPassword(
                'authToken',
                JSON.stringify({ accessToken, refreshToken })
            );
            console.log('Tokens saved securely.');
        } catch (error) {
            console.error('Error saving tokens:', error);
        }
    },

    /**
     * Retrieve tokens securely
     * @returns {Object|null} tokens {accessToken, refreshToken} or null
     */
    getTokens: async (): Promise<object | null> => {
        try {
          const credentials = await Keychain.getGenericPassword();
          if (credentials) {
            const tokens = JSON.parse(credentials.password);
            return tokens; // Ensure tokens is an object with accessToken and refreshToken
          } else {
            console.log('No tokens found.');
            return null;
          }
        } catch (error) {
          console.error('Error retrieving tokens:', error);
          return null;
        }
    },      

    /**
     * Clear tokens (logout)
     */
    clearTokens: async () => {
        try {
        await Keychain.resetGenericPassword();
            console.log('Tokens cleared.');
        } catch (error) {
            console.error('Error clearing tokens:', error);
        }
    },
};

export default KeychainService;

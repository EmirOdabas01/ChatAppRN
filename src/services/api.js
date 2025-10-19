import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL =
  'https://chatapiapi-g8cacedmf6b0gsdw.spaincentral-01.azurewebsites.net/api';

export const api = {
  user: {
    register: async nickname => {
      try {
        console.log(
          'API Call:',
          `${BASE_URL}/User/Register?nickname=${encodeURIComponent(nickname)}`,
        );

        const response = await fetch(
          `${BASE_URL}/User/Register?nickname=${encodeURIComponent(nickname)}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        console.log('Response Status:', response.status);
        console.log('Response OK:', response.ok);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('HTTP Error:', response.status, errorText);
          throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
        }

        const result = await response.text();
        console.log('Raw Response:', result);

        if (!result) {
          throw new Error('Empty response from server');
        }

        const userId = parseInt(result.trim(), 10);
        console.log('Parsed UserId:', userId);

        if (isNaN(userId)) {
          throw new Error(`Invalid user ID received: ${result}`);
        }

        return { id: userId };
      } catch (error) {
        console.error('Register API error:', error);
        throw error;
      }
    },

    getUserMessages: async userId => {
      try {
        const response = await fetch(
          `${BASE_URL}/User/GetUserMessages?id=${userId}`,
        );
        if (!response.ok) throw new Error('Failed to fetch messages');
        return await response.json();
      } catch (error) {
        console.error('Get user messages error:', error);
        throw error;
      }
    },
  },

  message: {
    getAll: async () => {
      try {
        const response = await fetch(`${BASE_URL}/Message/GetAll`);
        if (!response.ok) throw new Error('Failed to fetch all messages');
        return await response.json();
      } catch (error) {
        console.error('Get all messages error:', error);
        throw error;
      }
    },

    create: async (userId, text) => {
      try {
        const response = await fetch(`${BASE_URL}/Message/Create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
            text: text,
          }),
        });

        if (!response.ok) throw new Error('Failed to create message');
        return await response.json();
      } catch (error) {
        console.error('Create message error:', error);
        throw error;
      }
    },
  },
};

export const storage = {
  getUserId: async () => {
    try {
      const id = await AsyncStorage.getItem('userId');
      return id ? parseInt(id, 10) : null;
    } catch (error) {
      console.error('Error getting user ID:', error);
      return null;
    }
  },

  setUserId: async id => {
    try {
      await AsyncStorage.setItem('userId', id.toString());
    } catch (error) {
      console.error('Error setting user ID:', error);
    }
  },

  getNickname: async () => {
    try {
      return await AsyncStorage.getItem('nickname');
    } catch (error) {
      console.error('Error getting nickname:', error);
      return null;
    }
  },

  setNickname: async nickname => {
    try {
      await AsyncStorage.setItem('nickname', nickname);
    } catch (error) {
      console.error('Error setting nickname:', error);
    }
  },

  clearUser: async () => {
    try {
      await AsyncStorage.multiRemove(['userId', 'nickname']);
    } catch (error) {
      console.error('Error clearing user data:', error);
    }
  },
};

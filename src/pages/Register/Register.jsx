import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import { api, storage } from '../../services/api';
import styles from './Register.styles';

const Register = () => {
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (!nickname.trim()) {
      Alert.alert('Error', 'Pls enter a nickname');
      return;
    }

    setLoading(true);
    try {
      console.log('Sending request with nickname:', nickname);

      const response = await api.user.register(nickname.trim());

      console.log('API Response received:', response);

      if (response && response.id) {
        await storage.setUserId(response.id);
        await storage.setNickname(nickname.trim());

        navigation.navigate('Chat');
      } else {
        Alert.alert('Error', 'Failed to register');
      }
    } catch (error) {
      console.error('Register error:', error);
      Alert.alert('Error', error.message || 'An Error occur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Chat App</Text>
        <Text style={styles.subtitle}>Enter nickname to continiue</Text>

        <View style={styles.inputGroup}>
          <Input
            value={nickname}
            onChange={setNickname}
            placeholder="Enter Nickname"
            disabled={loading}
          />
        </View>

        <Button
          onPress={handleSubmit}
          disabled={!nickname.trim() || loading}
          variant="primary"
        >
          {loading ? 'Saving...' : 'Register'}
        </Button>
      </View>
    </View>
  );
};

export default Register;

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MessageList from '../../components/Chat/MessageList/MessageList';
import MessageInput from '../../components/Chat/MessageInput/MessageInput';
import Button from '../../components/common/Button/Button';
import { api, storage } from '../../services/api';
import styles from './Chat.styles';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentNickname, setCurrentNickname] = useState('');

  const navigation = useNavigation();
  const scrollViewRef = useRef(null);

  const fetchMessages = async () => {
    if (!isConnected) return;

    try {
      const messagesData = await api.message.getAll();
      setMessages(messagesData);
    } catch (error) {
      console.error('Loading Error:', error);
    }
  };

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userId = await storage.getUserId();
        const nickname = await storage.getNickname();

        if (!userId || !nickname) {
          navigation.navigate('Register');
          return;
        }

        setCurrentUserId(userId);
        setCurrentNickname(nickname);
      } catch (error) {
        console.error('Error loading user data:', error);
        navigation.navigate('Register');
      }
    };

    loadUserData();
    fetchMessages();

    const interval = setInterval(fetchMessages, 300);

    return () => clearInterval(interval);
  }, [navigation]);

  const handleSendMessage = async text => {
    if (!currentUserId) {
      Alert.alert('Error', 'User not Found pls try again');
      navigation.navigate('Register');
      return;
    }

    setLoading(true);
    try {
      await api.message.create(currentUserId, text);
      await fetchMessages();
    } catch (error) {
      console.error('Message sending error:', error);
      Alert.alert('Error', 'Failed to send Message, pls try again');
    } finally {
      setLoading(false);
    }
  };

  const handleHistoryClick = () => {
    navigation.navigate('History');
  };

  const handleLogout = async () => {
    try {
      await storage.clearUser();
      navigation.navigate('Register');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Text style={styles.welcome}>
            Welcome, {currentNickname || 'Usr'}!
          </Text>
        </View>
        <View style={styles.buttons}>
          <Button variant="secondary" onPress={handleHistoryClick}>
            History
          </Button>
          <Button variant="secondary" onPress={handleLogout}>
            Log Out
          </Button>
        </View>
      </View>

      <View style={styles.chatContainer}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.messageListWrapper}
          contentContainerStyle={styles.messageListContent}
          showsVerticalScrollIndicator={false}
        >
          <MessageList messages={messages} currentUserId={currentUserId} />
        </ScrollView>

        <View style={styles.inputContainer}>
          <MessageInput onSendMessage={handleSendMessage} disabled={loading} />
        </View>
      </View>

      <View style={styles.connectionStatus}>
        <View
          style={[
            styles.status,
            isConnected ? styles.connected : styles.disconnected,
          ]}
        >
          <Text style={styles.statusText}>
            {isConnected ? '🟢 Online' : '🔴 Offline'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Chat;

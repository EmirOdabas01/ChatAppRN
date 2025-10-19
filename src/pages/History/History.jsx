import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MessageList from '../../components/Chat/MessageList/MessageList';
import Button from '../../components/common/Button/Button';
import { api, storage } from '../../services/api';
import styles from './History.styles';

const History = () => {
  const [userMessages, setUserMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentNickname, setCurrentNickname] = useState('');

  const navigation = useNavigation();

  const fetchUserMessages = async () => {
    try {
      const userId = await storage.getUserId();
      const nickname = await storage.getNickname();

      if (!userId) {
        navigation.navigate('Register');
        return;
      }

      setCurrentUserId(userId);
      setCurrentNickname(nickname || 'User');

      setLoading(true);
      const messages = await api.user.getUserMessages(userId);
      setUserMessages(messages);
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      Alert.alert('Error', 'Message Loading Error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserMessages();
  }, []);

  const handleBackToChat = () => {
    navigation.navigate('Chat');
  };

  const handleLogout = async () => {
    try {
      await storage.clearUser();
      navigation.navigate('Register');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getTotalMessages = () => {
    return userMessages.length;
  };

  const getSentimentStats = () => {
    const stats = {
      Pozitif: 0,
      Negatif: 0,
      Nötr: 0,
    };

    userMessages.forEach(message => {
      if (message.sentiment && stats.hasOwnProperty(message.sentiment)) {
        stats[message.sentiment]++;
      }
    });

    return stats;
  };

  const sentimentStats = getSentimentStats();

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Text style={styles.title}>Message History</Text>
          <View style={styles.userDetails}>
            <Text style={styles.nickname}>{currentNickname}</Text>
          </View>
        </View>
        <View style={styles.buttons}>
          <Button variant="secondary" onPress={handleBackToChat}>
            Return Chat
          </Button>
          <Button variant="secondary" onPress={handleLogout}>
            Log Out
          </Button>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.statsScroll}
        contentContainerStyle={styles.statsContent}
      >
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{getTotalMessages()}</Text>
          <Text style={styles.statLabel}>Total Messages</Text>
        </View>
      </ScrollView>

      <View style={styles.messagesSection}>
        <Text style={styles.sectionTitle}>My Messages</Text>
        {userMessages.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No Messages Yet</Text>
            <Button onPress={handleBackToChat} variant="primary">
              Send Your First Message
            </Button>
          </View>
        ) : (
          <View style={styles.messageListContainer}>
            <MessageList
              messages={userMessages}
              currentUserId={currentUserId}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default History;

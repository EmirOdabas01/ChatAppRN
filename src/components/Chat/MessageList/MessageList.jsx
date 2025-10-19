import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './MessageList.styles';

const MessageList = ({ messages = [], currentUserId }) => {
  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getSentimentStyle = sentiment => {
    switch (sentiment) {
      case 'Pozitif':
        return [styles.sentiment, styles.positive];
      case 'Negatif':
        return [styles.sentiment, styles.negative];
      case 'Nötr':
        return [styles.sentiment, styles.neutral];
      default:
        return styles.sentiment;
    }
  };

  const isOwnMessage = message => {
    return currentUserId && message.userId === currentUserId;
  };

  if (messages.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyStateText}>No Messages</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.messageList}
      contentContainerStyle={styles.messageListContent}
      showsVerticalScrollIndicator={false}
    >
      {messages.map(message => {
        const ownMessage = isOwnMessage(message);

        return (
          <View
            key={message.id}
            style={[
              styles.messageItem,
              ownMessage ? styles.ownMessage : styles.otherMessage,
            ]}
          >
            <View
              style={[
                styles.messageContent,
                ownMessage
                  ? styles.ownMessageContent
                  : styles.otherMessageContent,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  ownMessage ? styles.ownMessageText : styles.otherMessageText,
                ]}
              >
                {message.text}
              </Text>

              <View style={styles.messageMeta}>
                <Text
                  style={[
                    styles.time,
                    ownMessage
                      ? styles.ownMessageMeta
                      : styles.otherMessageMeta,
                  ]}
                >
                  {formatDate(message.createdAt)}
                  {message.userNickName && (
                    <Text style={styles.userName}>
                      {' '}
                      • {message.userNickName}
                    </Text>
                  )}
                </Text>

                {message.sentiment && (
                  <View style={getSentimentStyle(message.sentiment)}>
                    <Text style={styles.sentimentText}>
                      {message.sentiment}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default MessageList;

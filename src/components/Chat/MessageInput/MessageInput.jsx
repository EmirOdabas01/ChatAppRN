import React, { useState } from 'react';
import { View } from 'react-native';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import styles from './MessageInput.styles';

const MessageInput = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <View style={styles.messageInput}>
      <View style={styles.inputContainer}>
        <Input
          value={message}
          onChange={setMessage}
          placeholder="Enter Message..."
          multiline={true}
          numberOfLines={3}
          style={styles.textInput}
          onSubmitEditing={handleSubmit}
          blurOnSubmit={false}
        />
      </View>
      <Button
        onPress={handleSubmit}
        disabled={!message.trim() || disabled}
        variant="primary"
        style={styles.sendButton}
      >
        Send
      </Button>
    </View>
  );
};

export default MessageInput;

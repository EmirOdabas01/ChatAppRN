import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  messageInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e1e5e9',
    gap: 12,
  },
  inputContainer: {
    flex: 1,
  },
  textInput: {
    maxHeight: 100,
    textAlignVertical: 'top',
  },
  sendButton: {
    minWidth: 80,
    height: 44,
  },
});

export default styles;

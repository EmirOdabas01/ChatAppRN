import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  messageList: {
    flex: 1,
  },
  messageListContent: {
    padding: 16,
  },
  messageItem: {
    marginBottom: 8, // Daha az boşluk
    flexDirection: 'row',
  },
  ownMessage: {
    justifyContent: 'flex-end',
  },
  otherMessage: {
    justifyContent: 'flex-start',
  },
  messageContent: {
    borderRadius: 12,
    padding: 10,
    maxWidth: width * 0.75,
    minWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  ownMessageContent: {
    backgroundColor: '#007bff',
    borderBottomRightRadius: 4,
  },
  otherMessageContent: {
    backgroundColor: '#f8f9fa',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 6,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  ownMessageText: {
    color: 'white',
  },
  otherMessageText: {
    color: '#333',
  },
  messageMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  time: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
    flexShrink: 1,
  },
  otherMessageMeta: {
    color: '#6c757d',
  },
  userName: {
    fontSize: 9,
    fontStyle: 'italic',
    marginLeft: 4,
  },
  sentiment: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 6,
  },
  sentimentText: {
    fontSize: 9,
    fontWeight: '500',
  },
});

export default styles;

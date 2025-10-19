import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  primary: {
    backgroundColor: '#007bff',
  },
  secondary: {
    backgroundColor: '#6c757d',
  },
  disabled: {
    backgroundColor: '#cccccc',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: 'white',
  },
  disabledText: {
    color: '#666666',
  },
});

export default styles;

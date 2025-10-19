import React from 'react';
import { TextInput } from 'react-native';
import styles from './Input.styles';

const Input = ({
  value,
  onChange,
  placeholder = '',
  type = 'text',
  style = {},
  ...props
}) => {
  const getKeyboardType = () => {
    switch (type) {
      case 'email':
        return 'email-address';
      case 'number':
        return 'numeric';
      case 'phone':
        return 'phone-pad';
      default:
        return 'default';
    }
  };

  const getSecureTextEntry = () => {
    return type === 'password';
  };

  return (
    <TextInput
      style={[styles.input, style]}
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      keyboardType={getKeyboardType()}
      secureTextEntry={getSecureTextEntry()}
      placeholderTextColor="#a0a4a8"
      {...props}
    />
  );
};

export default Input;

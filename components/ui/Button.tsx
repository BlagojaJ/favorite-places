import { StyleSheet, Text, Pressable } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/colors';

type ButtonProps = {
  children: string;
  onPress: () => void;
};

const Button = ({ children, onPress }: ButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    backgroundColor: Colors.primary800,
    color: Colors.primary50,
    elevation: 2,
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    borderRadius: 4,
  },
  pressed: { opacity: 0.7 },
  text: { textAlign: 'center', fontSize: 16 },
});

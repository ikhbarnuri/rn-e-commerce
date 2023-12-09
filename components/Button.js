import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants';

const Button = ({ title, onPress, isValid }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={styles.btnStyle(isValid === false ? COLORS.gray : COLORS.primary)}
    >
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnText: {
    fontFamily: 'bold',
    color: COLORS.white,
    fontSize: 20,
  },
  btnStyle: (backgroundColor) => ({
    height: 50,
    width: '100%',
    marginVertical: 20,
    backgroundColor: backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  }),
});
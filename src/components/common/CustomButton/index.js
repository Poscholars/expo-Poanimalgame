import { useTheme } from '@react-navigation/native';
import React from 'react';
import {View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import {moderateScale} from 'react-native-size-matters'

import styles from './styles';

const CustomButton = ({
  title,
  secondary,
  primary,
  danger,
  disabled,
  loading,
  onPress,
  style,
  onPressIn,
  children, 
  ...props
}) => {

  const {colors} = useTheme()
  const getBgColor = () => {
    if (disabled) {
      return "grey" 
    }
    if (primary) {
      return colors.green;
    }
    if (danger) {
      return "red";
    }

    if (secondary) {
      return "green";
    }
  };
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      onPressIn = {onPressIn}
      activeOpacity={0.98} 
      delayPressIn={0} 
      style={[styles.wrapper, {backgroundColor: getBgColor()}, style]}
      {...props}
      >
      <View style={[styles.loaderSection]}>
        {loading && (
          <ActivityIndicator
            color={colors.green}
          />
        )}
        {title && (
          <Text
            style={{
              fontSize:moderateScale(14,0.1),
              fontWeight:"bold",
              color: disabled ? 'black' : "white",
              paddingLeft: loading ? 5 : 0,
              
            }}>
            {loading ? 'Please wait...' : title}
          </Text>
        )}
      </View>
      {children}
    </TouchableOpacity>
  );
};

export default React.memo(CustomButton)

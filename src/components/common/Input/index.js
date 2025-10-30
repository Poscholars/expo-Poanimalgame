import React from 'react';
import {View, Text, TextInput} from 'react-native';
import styles from './styles';
import { moderateScale } from 'react-native-size-matters';
import { useTheme } from '@react-navigation/native';

const Input = ({
  onChangeText,
  iconPosition,
  icon,
  style,
  value,
  label,
  error,
  ...props
}) => {
  const [focused, setFocused] = React.useState(false);

  const {colors} = useTheme()

  const getFlexDirection = () => {
    if (icon && iconPosition) {
      if (iconPosition === 'left') {
        return 'row';
      } else if (iconPosition === 'right') {
        return 'row-reverse';
      }
    }
  };

  const getBorderColor = () => {
    if (error) {
      return "red"
    }

    if (focused) {
      return "blue";
    } else {
      return colors.green;
    }
  };
  return (
    <View style={styles.inputContainer}>
      {label && <Text style={{fontSize:moderateScale(14,0.2),color:colors.textcolor}}>{label}</Text>}

      <View
        style={[
          styles.wrapper,
          {alignItems: icon ? 'center' : 'baseline'},
          {borderColor: getBorderColor(), flexDirection: getFlexDirection()},
        ]}>
        <View>{icon && icon}</View>

        <TextInput
          style={[styles.textInput,{color:colors.textcolor}, style]}
          placeholderTextColor="grey"
          onChangeText={onChangeText}
          value={value}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
          {...props}
        />
      </View>

      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default React.memo(Input)

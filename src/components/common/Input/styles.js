
import { ScaledSheet } from 'react-native-size-matters';

export default ScaledSheet.create({
  wrapper: {
    height: '42@ms0.1',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: '5@ms',
    marginTop: '5@ms',
  },

  inputContainer: {
    paddingVertical: '12@ms0.2',
  },

  textInput: {
    flex: 1,
    width: '100%',
    fontSize: '14@ms0.1',
    color:"black"
    
  },

  error: {
    color: "red",
    paddingTop: '2@ms0.1',
    fontSize: '12@ms0.1',
  },
  
});

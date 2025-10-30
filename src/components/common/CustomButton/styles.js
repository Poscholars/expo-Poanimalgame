
import { ScaledSheet } from 'react-native-size-matters';

export default ScaledSheet.create({
  wrapper: {
    height: '42@ms',
    paddingHorizontal: '5@ms',
    marginVertical: '5@ms',
    borderRadius: '4@ms',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  loaderSection: {
    flexDirection: 'row',
  },

  textInput: {
    flex: 1,
    width: '100%',
  },

  error: {
    color: "red",
    paddingTop: '4@ms',
    fontSize: '12@ms',
  },
});

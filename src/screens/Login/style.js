import {StyleSheet} from 'react-native';
import color from '../../components/common/color';

//const {width, height} = Dimensions.get('screen');
const style = (width, height) => StyleSheet.create({
  container: {
    height: height,
    flex: 1,
  },
  topBg: {
    width: width,
    height: height * 0.2,
    resizeMode: 'cover',
  },
  scrollview: {
    flex: 1,
    backgroundColor: color.white,
    marginTop: -width * 0.2,
    borderTopRightRadius: width * 0.05,
    borderTopLeftRadius: width * 0.05,
    overflow: 'hidden',
    padding: width * 0.03,
  },
  logo: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
  },
  loginText: {
    fontFamily: 'poppins-Bold',
    fontSize: 25,
    color: color.steel,
  },
  createNew: {
    fontSize: 14,
    color: color.steel,
    textAlign: 'center',
    marginVertical: width * 0.025,
  },
  footer: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.primaryGreen,
  },
  footerText: {
    fontSize: 14,
    color: color.black,
  },
  dashedLine: {
    flex: 1,
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
   
  },
  dashedText: {
    textAlign: 'center',
    paddingHorizontal: 8,
    fontSize: 20
  },
});

export default style;


// import { StyleSheet } from "react-native";

// const Style = (width, height, isPortrait) => {
//     return StyleSheet.create({
//         container: {
//             flex: 1,
//             backgroundColor: "#ffffff", // Set background color to white
//             padding: 20, // Add padding for better spacing          
//         },
//         textInputContainer: {
//             width: "100%", // Set width to 100% to fill the container
//             marginBottom: 20 // Add margin bottom for spacing
//         },
//         textInput: {
//             fontFamily: 'Lato-Regular',
//             borderRadius: 10,
//             borderWidth: 1,
//             fontSize: 22,
//             paddingHorizontal: 15, // Add horizontal padding for better appearance
//             height: 50,
//             marginBottom: 10 // Add margin bottom for spacing
//         },
//         description: {
//             fontFamily: 'Lato-Regular',
//             fontSize: 22
//         },
//         mapView: {
//             height: height * 0.4,
//             width: width,
//             alignItems:'center'

//         },
//         touchView:{
//             padding:15,
//             marginVertical:10,
//             flexDirection:'row',
//             alignItems:'center'
//         },
//         touchViewText:{
//             fontFamily: 'Lato-Regular',
//             fontSize: 22
//         }
//     });
// };

// export default Style;

import {StyleSheet} from 'react-native';
import color from '../../components/common/color';

const style = (width, height) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    textInput: {
      fontFamily: 'Lato-Regular',
      borderRadius: 8,
      fontSize: 16,
      borderWidth: 1,
      borderColor: color.primaryGreen,
      width: width * 0.9,
      backgroundColor: color.secondaryGreen,
      height: 50,
      margin: 10,
      alignSelf: 'center',
    },
    description: {
      fontSize: 16,
      fontFamily: 'Lato-Regular',
    },
    mapView: {
      height: height * 0.4,
      width: width,
      justifyContent: 'center',
      alignItems: 'center',
    },
    TouchView: {
      padding: 15,
      marginVertical: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    touchText: {
      fontSize: 18,
      fontFamily: 'Lato-Bold',
    },
    iconView: {
      borderRadius: 8,
      padding: 10,
      marginRight: 10,
      backgroundColor: color.primaryGreen,
    },
  });

export default style;

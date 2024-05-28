/**
 * @format
 */
import 'react-native-gesture-handler'
import {AppRegistry} from 'react-native';
import App from './src/screens/app';
// import Waw from './waw';
import {name as appName} from './app.json';


AppRegistry.registerComponent(appName, () => App);

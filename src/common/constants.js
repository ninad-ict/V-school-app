import AsyncStorage from '@react-native-async-storage/async-storage';

//export default APP_URL = 'https://lessons.vopa.in/vopa/api/';
 const APP_URL = 'http://dev.vopa.in/vopa/api/'; // dev

 export default APP_URL;
 export  let SEPARATE_URL = 'http://dev.vopa.in/'; // dev (separate)
 //export  let SEPARATE_URL = 'https://lessons.vopa.in/content/api/'; // prod (separate)

export const sizes = {
  labelFontSize: 13,
  inputFontSize: 14,
  hintFontSize: 12,
  subHeadingFontSize: 18,
  headingFontSize: 24,
  appBarText: 16,
};

export const colors = {
  label: '#666666',
  link: '#3827B4',
  purple: '#3827B4',
  orange: '#FF890F',
  white: '#FFFFFF',
  success: 'green',
  danger: 'red',
  black: '#000000',
  lightBlue: '#109CFA',
  lightPurple: '#994CFB',
  transparent: '#D9FFFFFF',
};

export const themes = {
  one: '#893BB9',
  two: '#FFDE2C',
  three: '#2766FC',
  four: '#F64A65',
};

export const fonts = {
  mukta: 'NotoSansRegular',
};

export const getThemeColor = async () => {
  const themeColor = await AsyncStorage.getItem('theme');
  return themeColor || themes.one;
}
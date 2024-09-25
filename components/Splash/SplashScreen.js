import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      {/* ('../../assets/logo.png */}
      <Image source={require('../../assets/Icon.png')} style={styles.logo} />
      {/* <Text style={styles.message}>የትም-Share</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
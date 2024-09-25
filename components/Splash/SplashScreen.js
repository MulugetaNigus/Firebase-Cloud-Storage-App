import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
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
  // message: {
  //   fontSize: 30,
  //   marginTop: 20,
  //   fontWeight: "800",
  //   color: "grey"
  // },
});

export default SplashScreen;

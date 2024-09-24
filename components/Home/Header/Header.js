import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';

const Header = () => {

  return (
    <SafeAreaView>
      <StatusBar backgroundColor='lightblue'/>
      {/* main view */}
      <View style={styles.container}>

         {/* user info */}
         <View style={styles.profile}>
            {/* profile pic */}
            <View>
            <FontAwesome5 name="user" size={28} color="black" />
            </View>
            {/* user name */}
            <View style={styles.userInfo}>
              <Text style={styles.welcomeTxt}>welcome</Text>
              <Text style={styles.userEmail}>email@gmail.com</Text>
            </View>
         </View>

         {/* dark mode controller */}
         <View style={styles.darkModeController}>
             <Feather name="moon" size={24} color="black" />
         </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    // marginHorizontal: 15,
    marginVertical: 20,
    backgroundColor: "lightblue", 
    borderBottomLeftRadius: 30, 
    borderBottomRightRadius: 30,
    padding: 30

  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    alignSelf: 'flex-start', // Added to align the profile component to the left
  },
  userInfo: {
    flexDirection: "column"
  },
  welcomeTxt: {
    fontWeight: "500",
    fontSize: 20,
    color: "grey"
  },
  darkModeController: {
    alignSelf: 'flex-end', // Added to align the dark mode controller to the right
  },
  userEmail: {
    fontWeight: "500",
    color: "grey",
    fontSize: 15
  }
});

export default Header;

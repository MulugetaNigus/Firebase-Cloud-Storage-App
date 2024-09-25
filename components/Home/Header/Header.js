import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";

const Header = ({ darkMode, setDarkMode }) => {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="lightblue" />
      {/* main view */}
      <View style={styles.container}>
        {/* user info */}
        <View style={styles.profile}>
          {/* profile pic */}
          <View>
            {/* profile pic */}
            <Image
              source={require("../../../assets/profile.jpg")}
              resizeMode="contain"
              style={{ width: 50, height: 50, borderRadius: 100 }}
            />
            {/* <FontAwesome5 name="user" size={23} color="black" /> */}
          </View>
          {/* user name */}
          <View style={styles.userInfo}>
            <Text style={styles.welcomeTxt}>
              ሰላም እንደት ነህ {""} <Text style={{ fontSize: 22 }}>🙌</Text>
            </Text>
            <Text style={styles.userEmail}>Mulugeta Nigus</Text>
          </View>
        </View>

        {/* dark mode controller */}
        <View style={styles.darkModeController}>
          {darkMode ? (
            <Entypo
              name="light-up"
              size={24}
              color="black"
              onPress={() => setDarkMode(!darkMode)}
            />
          ) : (
            <Feather
              name="moon"
              size={24}
              color="black"
              onPress={() => setDarkMode(!darkMode)}
            />
          )}
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
    marginVertical: 1,
    backgroundColor: "lightblue",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    padding: 20,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    alignSelf: "flex-start", // Added to align the profile component to the left
  },
  userInfo: {
    flexDirection: "column",
  },
  welcomeTxt: {
    fontWeight: "500",
    fontSize: 16,
    color: "grey",
  },
  darkModeController: {
    alignSelf: "flex-end", // Added to align the dark mode controller to the right
  },
  userEmail: {
    fontWeight: "500",
    color: "grey",
    fontSize: 18,
  },
});

export default Header;

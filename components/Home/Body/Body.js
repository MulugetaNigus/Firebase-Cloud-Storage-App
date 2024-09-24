import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import Header from "../Header/Header";
import { StatusBar } from "expo-status-bar";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import UserActivity from "../../UserActivity/UserActivity";
// import AntDesign from '@expo/vector-icons/AntDesign';

const Body = () => {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="lightblue" />
      <ScrollView>
        {/* header components */}
        <Header />
        <View style={styles.ChooseTxt}>
          <Text style={styles.choosetxt}>
            <MaterialIcons name="category" size={25} color="grey" /> Choose
            Oprations
          </Text>
        </View>
        <View style={styles.container}>
          <Pressable
            android_ripple={{ color: "white" }}
            style={styles.uploadBtn}
          >
            <Text style={styles.uploadTxt}>
              <AntDesign name="upload" size={22} color="grey" /> {"  "} Upload
            </Text>
          </Pressable>
          <Pressable
            android_ripple={{ color: "white" }}
            style={styles.downloadBtn}
          >
            <Text style={styles.uploadTxt}>
              <AntDesign name="download" size={22} color="grey" />
              {"  "}
              Download
            </Text>
          </Pressable>
        </View>
        {/* user activity components */}
        <UserActivity />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
    marginHorizontal: 15,
    gap: 5,
  },
  ChooseTxt: {
    marginHorizontal: 15,
    marginBottom: -10
  },
  choosetxt: {
    fontSize: 25,
    fontWeight: "bold",
    color: "grey",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadBtn: {
    backgroundColor: "lightblue",
    padding: 15,
    borderRadius: 10,
    width: "50%",
    alignItems: "center",
  },
  uploadTxt: {
    fontSize: 18,
    fontWeight: "bold",
    color: "grey",
  },
  downloadBtn: {
    backgroundColor: "lightblue",
    padding: 15,
    borderRadius: 10,
    width: "50%",
    alignItems: "center",
  },
});

export default Body;

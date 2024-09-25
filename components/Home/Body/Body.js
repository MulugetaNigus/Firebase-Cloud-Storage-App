import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import Header from "../Header/Header";
import { StatusBar } from "expo-status-bar";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from '@expo/vector-icons/Feather';
import UserActivity from "../../UserActivity/UserActivity";
// import { app } from "../../Config/firebaseConfig";

// import AntDesign from '@expo/vector-icons/AntDesign';
import * as DocumentPicker from 'expo-document-picker'

// components
import Modals from "../../Modals/Modals";
import DModals from "../../Modals/DModals";

const Body = () => {

  const [file, setFile] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [darkMode , setDarkMode] = useState(false);

  const hanletoUpload = async () => {
    // console.log("hi");
    setModalVisible(true);
  };

  const hanletoDownload = async () => {};

  const handleChooseFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*", // Allow picking of any file type
    });

    if (!result.canceled) {
      console.log(result);
      setFile(result);
      setModalVisible(true);
    }
  }; 

  return (
    <SafeAreaView style={{ backgroundColor: darkMode ? "#262626" : null, flex: 1 }}>
      <StatusBar backgroundColor="lightblue" />
      <ScrollView>
    <Modals setModalVisible={setModalVisible} modalVisible={modalVisible} />
    <DModals modalVisible2={modalVisible2} setModalVisible2={setModalVisible2} />

        {/* header components */}
        <Header setDarkMode={setDarkMode} darkMode={darkMode}/>
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
            onPress={() => hanletoUpload()}
          >
            <Text style={styles.uploadTxt}>
            <Feather name="file-plus" size={22} color="grey" /> {"  "} Upload File
            </Text>
          </Pressable>
          <Pressable
            android_ripple={{ color: "white" }}
            style={styles.downloadBtn}
            onPress={() => setModalVisible2(true)}
          >
            <Text style={styles.uploadTxt}>
              <AntDesign name="download" size={22} color="grey" />
              {"  "}
              Download File
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
    marginBottom: -10,
    marginTop: 15,
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
    fontSize: 16,
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

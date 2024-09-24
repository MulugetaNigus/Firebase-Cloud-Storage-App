import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  Modal,
} from "react-native";
import Header from "../Header/Header";
import { StatusBar } from "expo-status-bar";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from '@expo/vector-icons/Feather';
import UserActivity from "../../UserActivity/UserActivity";

// import AntDesign from '@expo/vector-icons/AntDesign';
import * as DocumentPicker from 'expo-document-picker'

// components
import Modals from "../../Modals";
import Store from "../../Store/Store";

const Body = () => {

  const [file, setFile] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const hanletoUpload = async () => {
    // console.log("hi");
    setModalVisible(true);
  };

//   const uploadImage = async () => {
//     const blob = await new Promise((resolve, reject) => {
//       const xhr = new XMLHttpRequest();
//       xhr.onload = function () {
//         resolve(xhr.response);
//       };
//       xhr.onerror = function (e) {
//         console.log(e);
//         reject(new TypeError("Network request failed"));
//       };
//       xhr.responseType = "blob";
//       xhr.open("GET", file, true);
//       xhr.send(null);
//     });

//     const filename = file.substring(file.lastIndexOf("/") + 1);
//     const storageRef = ref(storage, `images/${filename}`);

//     uploadBytes(storageRef, blob)
//       .then((snapshot) => {
//         console.log("Uploaded a blob or file!");
//         getDownloadURL(snapshot.ref).then((downloadURL) => {
//           console.log("File available at", downloadURL);
//         });
//       })
//       .catch((error) => {
//         console.error("Error uploading file: ", error);
//       });
//   };

  // hanle to download the file
  
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
    <SafeAreaView>
      <StatusBar backgroundColor="lightblue" />
      <ScrollView>
    <Modals setModalVisible={setModalVisible} modalVisible={modalVisible} />

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
            onPress={() => hanletoUpload()}
          >
            <Text style={styles.uploadTxt}>
            <Feather name="file-plus" size={22} color="grey" /> {"  "} Upload File
            </Text>
          </Pressable>
          <Pressable
            android_ripple={{ color: "white" }}
            style={styles.downloadBtn}
            onPress={() => hanletoDownload()}
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

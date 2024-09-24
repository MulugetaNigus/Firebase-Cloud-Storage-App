import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  ActivityIndicator,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
// firebase packages
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../firebaseConfig";
import Store from "./Store/Store";
import * as SecureStore from 'expo-secure-store'

const Modals = ({ modalVisible, setModalVisible }) => {
  const [file, setFile] = useState(null);
  const [isUoloading, setisUploading] = useState(false);

  const hanletoUploadFiles = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*", // Allow picking of any file type
    });

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      setFile(result);
    }
  };

  const uploadFile = async () => {
    setisUploading(true);
    try {
      if (!file) {
        setisUploading(false);
        return Alert.alert("Alert", "No file selected !");
      }
  
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          setisUploading(false);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", file.assets[0].uri, true);
        xhr.send(null);
      });
  
      const filename = file.assets[0].uri.substring(
        file.assets[0].uri.lastIndexOf("/") + 1
      );
      const storage = getStorage();
      const storageRef = ref(storage, `MyFile/${filename}`);
  
      await uploadBytes(storageRef, blob)
        .then((snapshot) => {
          console.log("Uploaded a blob or file!");
          setisUploading(false);
  
          getDownloadURL(snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
  
            // Alert the user when the file is successfully uploaded
            setisUploading(false);
            Alert.alert("CONFIRMATION", "File Uploaded Successfully !!!");
            setModalVisible(false);
            setFile(null);
  
            // Store the file download link in the device using SecureStore
            try {
              await SecureStore.setItemAsync("00000", downloadURL);  // Key and Value
              console.log("Download URL stored successfully.");
            } catch (error) {
              console.error("Error saving URL to SecureStore: ", error);
            }
          });
        })
        .catch((error) => {
          setisUploading(false);
          console.error("Error uploading file: ", error);
        });
    } catch (error) {
      setisUploading(false);
      Alert.alert("Warning", "Something went wrong, please try again !");
      console.log(error);
    }
  };
  

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //   Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredViews}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Choose Your File !</Text>
            <View style={styles.Divider}></View>

            <Pressable
              onPress={() => hanletoUploadFiles()}
              style={styles.FileChooserBtn}
            >
              <Text style={styles.choosefiletxt}>Choose File</Text>
            </Pressable>

            {/* selected filename here */}
            {file && (
              <Text style={styles.selectedFileName}>{file?.assets[0].uri}</Text>
            )}
            <Pressable
              onPress={() => uploadFile()}
              style={styles.FileChooserBtn2}
            >
              <Text style={styles.choosefiletxt2}>
                {isUoloading ? (
                  <ActivityIndicator size={21} color={"red"} />
                ) : (
                  "Upload File"
                )}
              </Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                setFile(null);
              }}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    flexDirection: "column",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    // alignItems: "flex-start",
    marginTop: 160,
    flexDirection: "column",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "lightblue",
  },
  textStyle: {
    color: "grey",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  modalText: {
    fontSize: 28,
    color: "grey",
    fontWeight: "500",
    marginBottom: 5,
    textAlign: "left",
  },
  Divider: {
    width: "100%",
    height: 0.3,
    backgroundColor: "black",
  },
  FileChooserBtn: {
    width: "100%",
    padding: 15,
    backgroundColor: "grey",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "grey",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  FileChooserBtn2: {
    width: "100%",
    padding: 15,
    backgroundColor: "lightblue",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "lightblue",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  choosefiletxt: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
  },
  choosefiletxt2: {
    fontSize: 18,
    color: "grey",
    fontWeight: "800",
  },
  selectedFileName: {
    marginHorizontal: 5,
    marginTop: 5,
    fontWeight: "300",
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "red",
    backgroundColor: "red",
    color: "white",
    fontWeight: "bold",
  },
});

export default Modals;

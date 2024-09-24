import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";
// firebase packages
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../firebaseConfig";

const Modals = ({ modalVisible, setModalVisible }) => {
  const [file, setFile] = useState(null);

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
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", file.assets[0].uri, true);
      xhr.send(null);
    });

    const filename = file.assets[0].uri.substring(file.assets[0].uri.lastIndexOf("/") + 1);
    const storage = getStorage();
    const storageRef = ref(storage, `MyFile/${filename}`);

    uploadBytes(storageRef, blob)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!");
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          // alert the user when the successfully file upload oprations
          Alert.alert("CONFIRMATION" , 'File Uploded Successfully !!!');
          // and add the activity indicator fot the file upload btn while procesing
          // and think another thing should be refined and test
        });
      })
      .catch((error) => {
        console.error("Error uploading file: ", error);
      });
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
            {file && <Text style={styles.selectedFileName}>{file?.assets[0].uri}</Text>}
            <Pressable
              onPress={() => uploadFile()}
              style={styles.FileChooserBtn2}
            >
              <Text style={styles.choosefiletxt2}>Upload File</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setModalVisible(!modalVisible); setFile(null) }}
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
    fontSize: 25,
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
    fontWeight: "600"
  },
  choosefiletxt2: {
    fontSize: 18,
    color: "grey",
    fontWeight: "800"
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
    fontWeight: 'bold'
  }
});

export default Modals;

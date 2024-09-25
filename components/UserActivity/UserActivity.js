import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator,
  ScrollView,
  ToastAndroid,
} from "react-native";
import Constants from "expo-constants";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  getMetadata,
} from "firebase/storage";
import * as Linking from "expo-linking";
import { app } from "../../firebaseConfig";
import * as Clipboard from 'expo-clipboard';

function UserActivity() {
  const [refreshControl, setrefreshControl] = useState(false);
  const [fileUrls, setFileUrls] = useState([]);

  useEffect(() => {
    getAllFilesDownloadURLs();
  }, []);

  // get the link
  const getAllFilesDownloadURLs = async () => {
    const storage = getStorage();
    const storageRef = ref(storage, "MyFile/");

    try {
      // List all files in the 'MyFile/' directory
      const result = await listAll(storageRef);

      // Iterate over each file and get its download URL
      const urls = await Promise.all(
        result.items.map(async (itemRef) => {
          const downloadURL = await getDownloadURL(itemRef);
          return downloadURL; // return the download URL to accumulate in the array
        })
      );

      // Set the array of URLs to the state at once
      setFileUrls(urls);

      // console.log("All file URLs:", urls);
    } catch (error) {
      console.error("Error listing files and getting URLs:", error);
      Alert.alert("Error", "Failed to retrieve file download links.");
    }
  };

  // handle download the file
  const handledownload = async (url) => {
    await Linking.openURL(url);
  };

  // copy the link and fetch the copyed link
  const copyToClipboard = async (url) => {
    await Clipboard.setStringAsync(url);
  };

  return (
    // main view
    <ScrollView>
      <View>
        {/* text */}
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Text style={styles.ActivityTxt}>
            <Feather name="activity" size={25} color="grey" />
            {"  "}
            Recent Activity
            {"    "}
            <Pressable
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                getAllFilesDownloadURLs();
                ToastAndroid.show("Refresing...", ToastAndroid.SHORT);
              }}
            >
              <Ionicons name="refresh" size={22} color="grey" />
            </Pressable>
          </Text>
        </View>
        {/* upload history */}
        <View style={styles.uploadSec}>
          <View style={styles.selectedVal}>
            <Text style={styles.selected}>
              <MaterialCommunityIcons
                name="selection-multiple"
                size={20}
                color="black"
              />{" "}
              Browse and download your file !
            </Text>
          </View>
        </View>
        {/* download history */}
        {fileUrls?.length > 0 &&
          fileUrls.map((url, index) => (
            <Pressable
              key={url}
              android_ripple={{ color: "white" }}
              // handledownload
              onPress={() =>
                Alert.alert("Download !", "Do you want to download?", [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  { text: "OK", onPress: () => handledownload(url) },
                ])
              }
            >
              <View style={styles.historyCard}>
                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "grey" }}
                >
                  <MaterialCommunityIcons
                    name="file-document-outline"
                    size={25}
                    color="grey"
                  />
                  {"  "}
                  {index + 1 + ", " + url.toString().slice(0, 25) + "..."}
                  {/* {url.ref} */}
                </Text>
                <MaterialIcons name="cloud-download" size={25} color="green" />
                <Text>{" | "}</Text>
                <Feather name="copy" size={24} color="black" onPress={ () => copyToClipboard(url)} />
              </View>
            </Pressable>
          ))}
        {/* {!fileUrls?.length && (
          <ActivityIndicator size={30} style={{ marginTop: 50 }} />
        )} */}
        {fileUrls?.length == [] && (
          <Text style={styles.noFile}>
            No file stored Yet
            {"  "}
            <FontAwesome6 name="file-circle-xmark" size={24} color="grey" />
          </Text>
        )}
        <View style={{ marginBottom: 20 }}></View>
      </View>
    </ScrollView>
  );
}

export default UserActivity;

const styles = StyleSheet.create({
  ActivityTxt: {
    fontSize: 25,
    fontWeight: "900",
    color: "grey",
    marginHorizontal: 15,
    marginTop: 50,
  },
  uploadSec: {
    marginTop: 10,
    marginBottom: 3,
  },
  selectedVal: {
    marginHorizontal: 15,
  },
  selected: {
    fontSize: 15,
    color: "grey",
    fontWeight: "400",
  },
  historyCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 15,
    marginTop: 10,
    borderWidth: 0.4,
    borderColor: "lightgrey",
    padding: 20,
    borderRadius: 5,
    backgroundColor: "lightblue",
  },
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  noFile: {
    marginTop: 120,
    borderWidth: 1,
    borderColor: "lightblue",
    padding: 18,
    borderRadius: 10,
    backgroundColor: "lightblue",
    fontSize: 14,
    color: "grey",
    alignSelf: "center",
    marginHorizontal: 15,
    fontWeight: "bold",
  },
});

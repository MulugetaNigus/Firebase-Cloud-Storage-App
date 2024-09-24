import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  TextInput,
  ActivityIndicator,
} from "react-native";
import Constants from "expo-constants";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import * as Linking from "expo-linking";

function UserActivity() {
  const [selectedActivity, setselectedActivity] = useState("Upload");
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

      console.log("All file URLs:", urls);
    } catch (error) {
      console.error("Error listing files and getting URLs:", error);
      Alert.alert("Error", "Failed to retrieve file download links.");
    }
  };

  // handle download the file
  const handledownload = async (url) => {
    await Linking.openURL(url);
  };

  return (
    // main view
    <View>
      {/* text */}
      <View>
        <Text style={styles.ActivityTxt}>
          <Feather name="activity" size={25} color="grey" />
          {"  "}
          Recent Activity
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
              <Text style={{ fontSize: 16, fontWeight: "500", color: "grey" }}>
                <Fontisto name="date" size={20} color="black" />
                {"  "}
                {index + 1}
                {/* {fileUrls?.length} */}
              </Text>
              <MaterialIcons name="navigate-next" size={25} color="black" />
            </View>
          </Pressable>
        ))}
      {!fileUrls?.length && (
        <ActivityIndicator size={30} style={{ marginTop: 50 }} />
      )}
      <View style={{ marginBottom: 20 }}></View>
    </View>
  );
}

export default UserActivity;

const styles = StyleSheet.create({
  ActivityTxt: {
    fontSize: 22,
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
});

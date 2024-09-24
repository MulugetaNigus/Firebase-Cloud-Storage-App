import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Picker } from "@react-native-picker/picker";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

function UserActivity() {
  const [selectedActivity, setselectedActivity] = useState("Upload");

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
        {/* <Text>Upload History</Text> */}
        <Picker
          onValueChange={(e) => setselectedActivity(e)}
          selectedValue={selectedActivity}
          style={{ fontSize: 22 }}
        >
          <Picker.Item label="Upload" value="Upload" />
          <Picker.Item label="Download" value="Download" />
        </Picker>
        <View style={styles.selectedVal}>
          <Text style={styles.selected}>
            <MaterialCommunityIcons
              name="selection-multiple"
              size={20}
              color="black"
            />{" "}
            Selected activitys: {selectedActivity}
          </Text>
        </View>
      </View>
      {/* download history */}
      <Pressable
        android_ripple={{ color: "white" }}
        onPress={() => Alert.alert("Hi", "Hello")}
      >
        <View style={styles.historyCard}>
          <Text style={{ fontSize: 16, fontWeight: "500", color: "grey" }}>
            <Fontisto name="date" size={20} color="black" />
            {"  "}
            {new Date().toLocaleDateString()}
          </Text>
          <MaterialIcons name="navigate-next" size={25} color="black" />
        </View>
      </Pressable>
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
  uploadSec: {},
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
});

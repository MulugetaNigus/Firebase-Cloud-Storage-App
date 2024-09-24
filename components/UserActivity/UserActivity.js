import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Picker } from '@react-native-picker/picker';

function UserActivity() {
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
        <Picker>
          <Picker.Item label="Upload" value="Upload" />
          <Picker.Item label="Download" value="Download" />
        </Picker>
      </View>
      {/* download history */}
      <View></View>
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
});

import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import * as SecureStore from "expo-secure-store";

const Store = ({ key, value }) => {
    
  // fire this when successfully upload the file
  useEffect(() => {
    save();
  }, []);

  const save = async () => {
    await SecureStore.setItemAsync(key, value);
  };

  return <View style={styles.container}></View>;
};

export default Store;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 10,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    marginTop: 34,
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  textInput: {
    height: 35,
    borderColor: "gray",
    borderWidth: 0.5,
    padding: 4,
  },
});

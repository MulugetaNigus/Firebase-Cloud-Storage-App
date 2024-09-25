import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import * as Linking from "expo-linking";

const DModals = ({ modalVisible2, setModalVisible2 }) => {
  const [text, setText] = useState("");

  const handleDownload = async () => {
    await Linking.openURL(text);
    setText("");
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setText(text);
  };

  return (
    <Modal
      visible={modalVisible2}
      transparent
      animationType="slide"
      onRequestClose={() => setModalVisible2(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={() => fetchCopiedText()}>
            <Text style={styles.modalTitle}>
              Download Files {"    "}
              <FontAwesome6 name="paste" size={22} color="black" />
            </Text>
          </TouchableOpacity>

          <TextInput
            style={styles.modalInput}
            placeholder="Enter file Url Here"
            value={text}
            onChangeText={setText}
          />
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={handleDownload}
          >
            <Text style={styles.downloadButtonText}>Download</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 10,
    width: "90%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  downloadButton: {
    alignItems: "center",
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  downloadButtonText: {
    color: "white",
    fontSize: 16,
    padding: 5,
    fontWeight: "bold",
  },
});

export default DModals;

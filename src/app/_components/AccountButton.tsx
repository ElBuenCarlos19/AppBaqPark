import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { UserModal } from "./userModal";

export default function AccountButton() {
  const [UserModalVisible, setUserModalVisible] = useState(false);
  const handleAccountPress = () => {
    setUserModalVisible(true);
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.accountButton} onPress={handleAccountPress} activeOpacity={0.7}>
          <Ionicons
            style={styles.iconAccount}
            name="person-outline"
            size={32}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <UserModal visible={UserModalVisible} setVisible={setUserModalVisible} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 10,
    top: 5,
    zIndex: 10,
  },
  accountButton: {
    backgroundColor: "#000",
    borderRadius: 100,
    padding: 10,
    display: "flex",
  },
  iconAccount: {
    color: "white",
    fontSize: 32,
  },
});

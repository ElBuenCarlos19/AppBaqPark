import { useModalContext } from "./userModalDisplayContext";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { UserModal } from "./userModal";

export default function AccountButton() {
  const {open} = useModalContext();

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.accountButton} onPress={open} activeOpacity={0.7}>
          <Ionicons
            style={styles.iconAccount}
            name="person-outline"
            size={32}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <UserModal />
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

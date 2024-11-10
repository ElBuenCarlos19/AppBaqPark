import { StyleSheet, View } from "react-native";

export const SkeletonItem = () => (
    <View style={styles.skeletonItem}>
      <View style={styles.skeletonIcon} />
      <View style={styles.skeletonInfo}>
        <View style={styles.skeletonText} />
        <View style={[styles.skeletonText, { width: "60%" }]} />
      </View>
    </View>
  );

  const styles = StyleSheet.create({
    skeletonItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
    },
    skeletonIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "#E8F5E9",
      marginRight: 10,
    },
    skeletonInfo: {
      flex: 1,
    },
    skeletonText: {
      height: 16,
      backgroundColor: "#E8F5E9",
      marginBottom: 5,
    },
  });
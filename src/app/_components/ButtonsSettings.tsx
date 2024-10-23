import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

export default function ButtonsSettings() {
  return (
    <>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => console.log("Pressed")}
          icon="book-open-variant"
          textColor="black"
          buttonColor="#C1D96C"
        >
          Politicas de Privacidad
        </Button>
        <Button
          onPress={() => console.log("Pressed")}
          icon="alert-circle"
          textColor="black"
          buttonColor="#C1D96C"
        >
          Reportar Errores
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "70%",
    marginTop: 40,
    gap: 10,
  },
});

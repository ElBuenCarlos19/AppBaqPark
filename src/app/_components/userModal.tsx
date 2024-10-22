import {
  View,
  Modal,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import 'react-native-url-polyfill/auto';
import { useAuthentication } from "../auth/AuthenticationContext";
import {useModalContext} from './userModalDisplayContext'
import Login from "./Login";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

const UserModal = () => {
  const {visible,close} = useModalContext();
  const {session, signOut} = useAuthentication();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={close}
    >
      <View style={styles.modalBackground}>
        {session ? (
          <View style={styles.modalContainer}>
            <Ionicons name="person-outline" size={32} color="black" />
            <Text style={styles.titleText}>{`Hola usuario`}</Text>
            <Text>{"email"}</Text>
            <Text>{"edad"}</Text>
            <Text>{"peso"}</Text>

            <View style={styles.spacer} />

            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>{"Actualizar Información"}</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.closeButton]}
              onPress={() => signOut()}
            >
              <Text style={styles.buttonText}>Cerrar sesion</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.closeButton]}
              onPress={close}
            >
              <Text style={styles.buttonText}>Cerrar</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.modalContainer}>
            <Text style={styles.titleText}>{"LOGIN"}</Text>
            <Text>
              aun no tienes cuenta? {""}
              <Link style={styles.register} href="/_components/SignUp">
                Registrate
              </Link>
            </Text>
            <Login styles={styles}/>
            <View style={styles.spacer} />
            <Pressable
              style={[styles.button, styles.closeButton]}
              onPress={close}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </Pressable>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    height: 350,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  register: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  spacer: {
    flexGrow: 1, // Ocupa el espacio restante
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: "#f44336",
    marginTop: 10,
  },
  input: {
    height: 40,
    width: "90%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export { UserModal };

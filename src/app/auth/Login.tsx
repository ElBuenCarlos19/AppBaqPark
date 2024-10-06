import { Button, Text, TextInput, View } from "react-native";

export default function Login() {
  return (
    <View>
      <Text>Login</Text>
      <TextInput placeholder="Email" />
      <TextInput placeholder="Password" />
      <Button title="Login" />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  input: {
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
  },
  button: {
    margin: 10,
  },
};

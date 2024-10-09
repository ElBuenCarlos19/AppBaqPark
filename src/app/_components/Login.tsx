import { Pressable, Text, TextInput } from "react-native";
import { useLoginAuthentication } from "../auth/LoginAuthentication";
export default function Login({styles}) {
  const { data, handleInput, loading, signInWithEmail } = useLoginAuthentication();
  return (
    <>
      <Text>Login</Text>
      <TextInput style={styles.input} placeholder="Email"
      value={data.email}
      onChangeText={(text) => handleInput("email", text)} />
      <TextInput style={styles.input} placeholder="Password"
      secureTextEntry={true}
      value={data.password}
      onChangeText={(text) => handleInput("password", text)} />
      <Pressable style={[styles.button]}
      disabled={loading}
      onPress={()=>{signInWithEmail()}}
      >
        <Text style={styles.buttonText}>Iniciar sesion</Text>
      </Pressable>
    </>
  );
}

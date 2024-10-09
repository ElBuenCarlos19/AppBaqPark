import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { useLoginAuthentication } from '../auth/LoginAuthentication';
import { useRouter } from 'expo-router';

const SignUp = () => {
    const router = useRouter();
    const { data, handleInput, signUpWithEmail } = useLoginAuthentication();

    const handleSignUp = () => {
        if(data.email !== '' || data.password !== '' || data.confirmPassword !== ''){
        if (data.password !== data.confirmPassword) {
            Alert.alert("Error", "Las contraseñas no coinciden.");
            return;
        }
        if(data.password.length < 6){
            Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres.");
            return;
        }
        if(!data.email.includes('@')){
            Alert.alert("Error", "Correo invalido.");
        }
        signUpWithEmail();
        }
        else{
            Alert.alert("Error", "Por favor llena todos los campos.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                placeholder="Email"
                value={data.email}
                onChangeText={(text) => handleInput("email", text)}
                style={styles.input}
            />
            <TextInput
                placeholder="Contraseña"
                value={data.password}
                onChangeText={(text) => handleInput("password", text)}
                secureTextEntry={true}
                style={styles.input}
            />
            <TextInput
                placeholder="Confirmar Contraseña"
                value={data.confirmPassword}
                onChangeText={(text) => handleInput("confirmPassword", text)}
                secureTextEntry={true}
                style={styles.input}
            />
            <Pressable style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Registrarse</Text>
            </Pressable>
            <Pressable onPress={() => router.back()}>
                <Text style={styles.linkText}>¿Ya tienes cuenta?</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        width: "90%",
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    button: {
        backgroundColor: "#007BFF",
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    linkText: {
        color: "#007BFF",
        marginTop: 10,
    },
});

export default SignUp;

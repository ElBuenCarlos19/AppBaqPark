
import {View, Modal, Pressable, StyleSheet, Text} from "react-native";
import {Ionicons} from "@expo/vector-icons";

const UserModal = ({visible, setVisible}) => {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                setVisible(false);
            }}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Ionicons
                        name="person-outline"
                        size={32}
                        color="black"
                    />
                    <Text style={styles.titleText}>{`Hola usuario`}</Text>
                    <Text>{'email'}</Text>
                    <Text>{'edad'}</Text>
                    <Text>{'peso'}</Text>
                    
                    <View style={styles.spacer} />
                    
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>Actualizar Información</Text>
                    </Pressable>
                    <Pressable style={[styles.button, styles.closeButton]} onPress={() => setVisible(false)}>
                        <Text style={styles.buttonText}>Cerrar</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 300,
        height: 400,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    spacer: {
        flexGrow: 1, // Ocupa el espacio restante
    },
    button: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    closeButton: {
        backgroundColor: '#f44336',
        marginTop: 10,
    },
});

export {UserModal};

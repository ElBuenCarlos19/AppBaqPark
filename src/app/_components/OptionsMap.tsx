import { Pressable, StyleSheet, Text, View } from "react-native";

export function OptionsMap({ setShowInfoContainer, showInfoContainer }) {
    return <>
        <View
            style={{
                ...styles.container,
                marginTop: 30,
                flexDirection: "row",
                gap: 30,
                opacity: 0
            }}
        >
            <Pressable
                style={styles.button}
                onPress={() => setShowInfoContainer(!showInfoContainer)}
            >
                <Text style={styles.buttonText}>Buscar</Text>
            </Pressable>
            <Pressable style={styles.button}>
                <Text style={styles.buttonText}>Buscar</Text>
            </Pressable>
        </View>
        <View style={{ marginTop: 30, opacity: 0 }}>
            <Pressable style={styles.buttonList}>
                <Text style={styles.buttonText}>Ver listado de parques</Text>
            </Pressable>
        </View>

    </>
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#022601",
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
        height: 100,
        width: 100,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    buttonList: {
        backgroundColor: "#022601",
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
        height: 50,
        width: 220,
    },
});

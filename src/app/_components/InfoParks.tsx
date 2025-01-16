import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function InfoParks({ setShowInfoContainer, showInfoContainer }) {
    return <>
        <View
            style={{
                ...styles.infoContainer,
                display: showInfoContainer ? "flex" : "none",
            }}
        >
            <Pressable
                style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    padding: 10,
                }}
                onPress={() => setShowInfoContainer(!showInfoContainer)}
            >
                <Text style={{ color: "white", fontSize: 20 }}>X</Text>
            </Pressable>
            <Text style={styles.buttonText}>Titulo del parque</Text>
            <Pressable
                style={{
                    width: 250,
                    height: 50,
                    backgroundColor: "#5B8C11",
                    position: "absolute",
                    top: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                onPress={() => {
                    alert("Rutina iniciada");
                }}
            >
                <Text style={styles.buttonText}>Iniciar Rutina</Text>
            </Pressable>
        </View>
    </>
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
    },
    infoContainer: {
        width: 300,
        height: 400,
        position: "absolute",
        zIndex: 5,
        top: 100,
        left: "auto",
        borderRadius: 12,
        backgroundColor: "#022601",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    }
});
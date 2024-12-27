// GetStartedScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function GetStartedScreen({ navigation }) {
    const handleStart = () => {
        navigation.navigate('Register');
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/image-removebg-preview (2) (1).png')}
                style={styles.illustration}
            />
            <Text style={styles.title}>Welcome to VACCINEGO</Text>
            <Text style={styles.subtitle}>
                Your health is our priority. let's keep you safe and protected.
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleStart}>
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF', 
        padding: 20,
    },
    illustration: {
        width: '100%',
        height: 500, 
        resizeMode: 'contain',
        marginTop: -50,
        marginBottom: -100,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#7E2480', 
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 30,
        textAlign: 'center',
        color: '#555', 
    },
    button: {
        backgroundColor: '#7E2480',
        width: '100%',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,
        marginBottom: 20,
      },
      buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
      }
});
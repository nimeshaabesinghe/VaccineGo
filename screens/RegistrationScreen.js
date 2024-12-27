import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; 

export default function RegistrationScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ username: '', password: '' });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { username: '', password: '' };

    if (!username.trim()) {
      newErrors.username = 'Username is required.';
      isValid = false;
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long.';
      isValid = false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores.';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required.';
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
      isValid = false;
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = 'Password must contain at least one uppercase letter.';
      isValid = false;
    } else if (!/[a-z]/.test(password)) {
      newErrors.password = 'Password must contain at least one lowercase letter.';
      isValid = false;
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = 'Password must contain at least one number.';
      isValid = false;
    } else if (!/[!@#$%^&*]/.test(password)) {
      newErrors.password = 'Password must contain at least one special character.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // const handleRegister = () => {
  //   if (!validateForm()) return;

  //   navigation.navigate('Login', { username });
  // };

  // const handleRegister = () => {
  //   if (!validateForm()) return;

  //   // Store user info in local storage (mock database)
  //   const registeredUsers = JSON.parse(localStorage.getItem('users')) || [];
  //   registeredUsers.push({ username, password });
  //   localStorage.setItem('users', JSON.stringify(registeredUsers));

  //   navigation.navigate('Login', { username });
  // };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      await AsyncStorage.setItem('@username', username);
      await AsyncStorage.setItem('@password', password); // You may want to hash the password
      navigation.navigate('Login', { username });
    } catch (e) {
      console.error("Error saving data to AsyncStorage:", e);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/image-removebg-preview (3).png')}
        style={styles.illustration}
      />
      <Text style={styles.title}>VACCINEGO</Text>
      <Text style={styles.subtitle}>Register Now and Unlock All Features</Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(text) => {
          setUsername(text);
          setErrors({ ...errors, username: '' });
        }}
        style={styles.input}
        placeholderTextColor="#888"
      />
      {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrors({ ...errors, password: '' });
          }}
          style={styles.passwordInput}
          placeholderTextColor="#888"
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIconContainer}
        >
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>
      {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.footerLink}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  illustration: {
    width: '80%',
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#7E2480',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 30,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 5,
    backgroundColor: '#fff',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  eyeIconContainer: {
    paddingHorizontal: 10,
  },
  errorText: {
    width: '100%',
    fontSize: 12,
    color: 'red',
    marginBottom: 10,
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
  },
  footer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
  footerLink: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#7E2480',
  },
});

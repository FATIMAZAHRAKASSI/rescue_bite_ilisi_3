mport React, { useState } from 'react';
import {
 View,
 Text,
 TextInput,
 TouchableOpacity,
 StyleSheet,
} from 'react-native';

const SignUpScreen = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');

 return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.signUpButton}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleSignUpButton}>
        <Text style={styles.googleSignUpButtonText}>Sign up with Google</Text>
      </TouchableOpacity>
    </View>
 );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 50,
 },
 title: {
    fontSize: 24,
    marginBottom: 20,
 },
 input: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingHorizontal: 5,
 },
 signUpButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    marginBottom: 20,
    borderRadius: 5,
 },
 signUpButtonText: {
    color: '#fff',
    textAlign: 'center',
 },
 googleSignUpButton: {
    backgroundColor: '#EA4335',
    paddingVertical: 10,
    borderRadius: 5,
 },
 googleSignUpButtonText: {
    color: '#fff',
    textAlign: 'center',
 },
});

export default SignUpScreen;
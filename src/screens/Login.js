import { View, Text, TextInput, Pressable, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db, my_auth } from '../API/signup';

const Login = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        console.log('Attempting login...');
        // First, authenticate the user
        const userCredential = await signInWithEmailAndPassword(
          my_auth,
          formData.email,
          formData.password
        );
        console.log('Authentication successful');

        // After successful authentication, store additional user data
        const userDoc = doc(collection(db, "users"), userCredential.user.uid);
        await setDoc(userDoc, {
          email: formData.email,
          lastLogin: new Date().toISOString(),
        }, { merge: true });
        
        console.log('User data updated in Firestore');
        setIsLoading(false);
        
        console.log('Navigating to HomeScreen...');
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomeScreen' }],
        });
      } catch (error) {
        console.error("Login error: ", error);
        setIsLoading(false);
        Alert.alert(
          'Login Failed',
          error.code === 'auth/user-not-found' 
            ? 'No account found with this email' 
            : error.code === 'auth/wrong-password'
            ? 'Incorrect password'
            : 'Please check your credentials and try again.'
        );
      }
    }
  };

  return (
    <View style={tw`flex-1 bg-gray-50 p-6 justify-center`}>
      <Text style={tw`text-3xl font-bold text-gray-800 mb-8 text-center`}>
        Welcome Back
      </Text>

      <View style={tw`gap-4`}>
        <View>
          <TextInput
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({...formData, email: text})}
            keyboardType="email-address"
            autoCapitalize="none"
            style={tw`bg-white p-4 rounded-lg border border-gray-300`}
          />
          {errors.email && (
            <Text style={tw`text-red-500 text-sm mt-1`}>{errors.email}</Text>
          )}
        </View>

        <View>
          <TextInput
            placeholder="Password"
            value={formData.password}
            onChangeText={(text) => setFormData({...formData, password: text})}
            secureTextEntry
            style={tw`bg-white p-4 rounded-lg border border-gray-300`}
          />
          {errors.password && (
            <Text style={tw`text-red-500 text-sm mt-1`}>{errors.password}</Text>
          )}
        </View>

        <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={tw`text-[#2980b9] text-right`}>Forgot Password?</Text>
        </Pressable>

        <Pressable
          onPress={handleLogin}
          style={tw`bg-[#2980b9] p-4 rounded-lg mt-4`}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={tw`text-white text-lg text-center font-semibold`}>
              Log In
            </Text>
          )}
        </Pressable>

        <View style={tw`flex-row justify-center items-center mt-4`}>
          <Text style={tw`text-gray-600`}>Don't have an account? </Text>
          <Pressable onPress={() => navigation.navigate('SignUp')}>
            <Text style={tw`text-[#2980b9] font-semibold`}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Login;
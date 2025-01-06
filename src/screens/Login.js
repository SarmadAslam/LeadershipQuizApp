import { View, Text, TextInput, Pressable, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
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
        const userCredential = await signInWithEmailAndPassword(
          my_auth,
          formData.email,
          formData.password
        );

        const userDoc = doc(collection(db, "users"), userCredential.user.uid);
        await setDoc(userDoc, {
          email: formData.email,
          lastLogin: new Date().toISOString(),
        }, { merge: true });
        
        setIsLoading(false);
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomeScreen' }],
        });
      } catch (error) {
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
    <LinearGradient
      colors={['#1a365d', '#2563eb', '#3b82f6']}
      style={tw`flex-1`}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1`}
      >
        <Pressable 
            onPress={() => navigation.goBack()}
            style={tw`absolute top-12 left-6 z-10 flex-row items-center`}
          >
            <MaterialIcons name="arrow-back" size={24} color="white" />
            <Text style={tw`text-white ml-1`}>Back</Text>
          </Pressable>
        <View style={tw`flex-1 px-6 pt-12 pb-8`}>
          {/* Header Section */}
          <View style={tw`items-center mb-8`}>
            <Text style={tw`text-4xl font-bold text-white mb-2 mt-5 pt-8`}>Welcome Back</Text>
            <Text style={tw`text-lg text-white/80 text-center`}>
              Sign in to continue your journey
            </Text>
          </View>

          {/* Login Form */}
          <View style={tw`bg-white/10 rounded-3xl p-6 mb-6`}>
            <View style={tw`mb-4`}>
              <View style={tw`flex-row items-center bg-white/20 rounded-xl px-4 mb-1`}>
                <MaterialIcons name="email" size={20} color="white" />
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  value={formData.email}
                  onChangeText={(text) => setFormData({...formData, email: text})}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={tw`flex-1 p-4 text-white`}
                />
              </View>
              {errors.email && (
                <Text style={tw`text-red-300 text-sm ml-2`}>{errors.email}</Text>
              )}
            </View>

            <View style={tw`mb-2`}>
              <View style={tw`flex-row items-center bg-white/20 rounded-xl px-4 mb-1`}>
                <MaterialIcons name="lock" size={20} color="white" />
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  value={formData.password}
                  onChangeText={(text) => setFormData({...formData, password: text})}
                  secureTextEntry
                  style={tw`flex-1 p-4 text-white`}
                />
              </View>
              {errors.password && (
                <Text style={tw`text-red-300 text-sm ml-2`}>{errors.password}</Text>
              )}
            </View>

            <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={tw`text-white/80 text-right mb-6`}>Forgot Password?</Text>
            </Pressable>

            <Pressable
              onPress={handleLogin}
              style={tw`bg-white rounded-xl p-4`}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#2563eb" />
              ) : (
                <Text style={tw`text-blue-600 text-lg text-center font-semibold`}>
                  Log In
                </Text>
              )}
            </Pressable>
          </View>

          {/* Sign Up Link */}
          <View style={tw`flex-row justify-center items-center`}>
            <Text style={tw`text-white/80`}>Don't have an account? </Text>
            <Pressable onPress={() => navigation.navigate('SignUp')}>
              <Text style={tw`text-white font-semibold`}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default Login;
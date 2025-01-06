import { View, Text, TextInput, Pressable, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import tw from 'twrnc';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db, my_auth } from '../API/signup';

const SignUp = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName || formData.fullName.length < 2) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(
          my_auth,
          formData.email,
          formData.password
        );
  
        const userDoc = doc(collection(db, "users"), userCredential.user.uid);
        await setDoc(userDoc, {
          fullName: formData.fullName,
          email: formData.email,
          createdAt: new Date().toISOString(),
        });
        
        setIsLoading(false);
        
        Alert.alert(
          "Registration Successful",
          "Your account has been created successfully!",
          [
            {
              text: "Go to Login",
              onPress: () => navigation.replace('Login'),
              style: "default"
            },
            {
              text: "Back to Start",
              onPress: () => navigation.replace('Splash'),
              style: "cancel"
            }
          ]
        );
  
      } catch (error) {
        setIsLoading(false);
        Alert.alert(
          'Sign Up Failed',
          error.code === 'auth/email-already-in-use'
            ? 'An account with this email already exists'
            : 'Failed to create account. Please try again.'
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
        <View style={tw`flex-1 px-6 pt-12 pb-8`}>
          {/* Back Button */}
          <Pressable 
            onPress={() => navigation.goBack()}
            style={tw`absolute top-12 left-6 z-10 flex-row items-center`}
          >
            <MaterialIcons name="arrow-back" size={24} color="white" />
            <Text style={tw`text-white ml-1`}>Back</Text>
          </Pressable>

          {/* Header Section */}
          <View style={tw`items-center mb-8 mt-8`}>
            <Text style={tw`text-4xl font-bold text-white mb-2`}>Create Account</Text>
            <Text style={tw`text-lg text-white/80 text-center`}>
              Join our community of leaders
            </Text>
          </View>

          {/* Sign Up Form */}
          <View style={tw`bg-white/10 rounded-3xl p-6 mb-6`}>
            <View style={tw`mb-4`}>
              <View style={tw`flex-row items-center bg-white/20 rounded-xl px-4 mb-1`}>
                <MaterialIcons name="person" size={20} color="white" />
                <TextInput
                  placeholder="Full Name"
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  value={formData.fullName}
                  onChangeText={(text) => setFormData({...formData, fullName: text})}
                  style={tw`flex-1 p-4 text-white`}
                />
              </View>
              {errors.fullName && (
                <Text style={tw`text-red-300 text-sm ml-2`}>{errors.fullName}</Text>
              )}
            </View>

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

            <View style={tw`mb-4`}>
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

            <View style={tw`mb-6`}>
              <View style={tw`flex-row items-center bg-white/20 rounded-xl px-4 mb-1`}>
                <MaterialIcons name="lock" size={20} color="white" />
                <TextInput
                  placeholder="Confirm Password"
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  value={formData.confirmPassword}
                  onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
                  secureTextEntry
                  style={tw`flex-1 p-4 text-white`}
                />
              </View>
              {errors.confirmPassword && (
                <Text style={tw`text-red-300 text-sm ml-2`}>{errors.confirmPassword}</Text>
              )}
            </View>

            <Pressable
              onPress={handleSignUp}
              style={tw`bg-white rounded-xl p-4`}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#2563eb" />
              ) : (
                <Text style={tw`text-blue-600 text-lg text-center font-semibold`}>
                  Sign Up
                </Text>
              )}
            </Pressable>
          </View>

          {/* Login Link */}
          <View style={tw`flex-row justify-center items-center`}>
            <Text style={tw`text-white/80`}>Already have an account? </Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text style={tw`text-white font-semibold`}>Log In</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default SignUp;
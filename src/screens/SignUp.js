import { Alert, View, Text, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import { my_auth } from '../API/signup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import tw from 'twrnc';

const SignUp = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
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
      try {
        const response = await createUserWithEmailAndPassword(
          my_auth,
          formData.email,
          formData.password
        );
        const uid = response.user.uid;
        Alert.alert(
          "Registration Successful",
          "Choose your next step",
          [
            {
              text: "Go to Login",
              onPress: () => navigation.navigate('Login', { userId: uid })
            },
            {
              text: "Back to Start",
              onPress: () => navigation.navigate('Splash')
            }
          ]
        );
      } catch (error) {
        Alert.alert("Sign Up Failed", error.message);
      }
    }
  };

  return (
    <View style={tw`flex-1 bg-gray-50 p-6 justify-center`}>
      <Text style={tw`text-3xl font-bold text-gray-800 mb-8 text-center`}>
        Create Account
      </Text>

      <View style={tw`gap-4`}>
        <View>
          <TextInput
            placeholder="Full Name"
            value={formData.name}
            onChangeText={(text) => setFormData({...formData, name: text})}
            style={tw`bg-white p-4 rounded-lg border border-gray-300`}
          />
          {errors.name && (
            <Text style={tw`text-red-500 text-sm mt-1`}>{errors.name}</Text>
          )}
        </View>

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

        <View>
          <TextInput
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
            secureTextEntry
            style={tw`bg-white p-4 rounded-lg border border-gray-300`}
          />
          {errors.confirmPassword && (
            <Text style={tw`text-red-500 text-sm mt-1`}>{errors.confirmPassword}</Text>
          )}
        </View>

        <Pressable
          onPress={handleSignUp}
          style={tw`bg-[#2980b9] p-4 rounded-lg mt-4`}
        >
          <Text style={tw`text-white text-lg text-center font-semibold`}>
            Sign Up
          </Text>
        </Pressable>

        <View style={tw`flex-row justify-center items-center mt-4`}>
          <Text style={tw`text-gray-600`}>Already have an account? </Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={tw`text-[#2980b9] font-semibold`}>Log In</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
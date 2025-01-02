import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleResetPassword = () => {
    if (!email || !isValidEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'If the email is registered, you will receive a reset link.');
      navigation.navigate('Login');
    }, 2000);
  };

  return (
    <View style={tw`flex-1 justify-center items-center p-5`}>
      <Text style={tw`text-3xl font-bold mb-2.5`}>
        Forgot Password?
      </Text>
      
      <Text style={tw`text-base text-gray-600 mb-5 text-center`}>
        Enter your registered email to receive a password reset link.
      </Text>
      
      <TextInput
        style={tw`w-full p-3 mb-4 border border-gray-300 rounded-lg text-base`}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      
      <TouchableOpacity
        style={tw`w-full py-4 rounded-lg items-center ${loading ? 'bg-gray-400' : 'bg-[#2980b9]'}`}
        onPress={handleResetPassword}
        disabled={loading}
      >
        <Text style={tw`text-white text-base font-bold`}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        style={tw`mt-5`}
      >
        <Text style={tw`text-base text-[#2980b9]`}>
          Back to Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;
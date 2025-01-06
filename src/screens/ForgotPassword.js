import { View, Text, TextInput, Pressable, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import tw from 'twrnc';
import { sendPasswordResetEmail } from 'firebase/auth';
import { my_auth } from '../API/signup';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleResetPassword = async () => {
    if (!email || !isValidEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(my_auth, email);
      Alert.alert(
        'Reset Link Sent',
        'If an account exists with this email, you will receive a password reset link.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#1a365d', '#2563eb', '#3b82f6']}
      style={tw`flex-1`}
    >
      <View style={tw`flex-1 px-6 pt-12 pb-8`}>
        {/* Back Button */}
        <Pressable 
          onPress={() => navigation.goBack()}
          style={tw`flex-row items-center mb-8`}
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
          <Text style={tw`text-white ml-1`}>Back</Text>
        </Pressable>

        <View style={tw`flex-1 justify-center`}>
          {/* Header */}
          <View style={tw`items-center mb-8`}>
            <MaterialIcons name="lock-reset" size={64} color="white" />
            <Text style={tw`text-4xl font-bold text-white mb-2 mt-4`}>
              Forgot Password?
            </Text>
            <Text style={tw`text-lg text-white/80 text-center`}>
              Enter your email to receive a password reset link
            </Text>
          </View>

          {/* Form */}
          <View style={tw`bg-white/10 rounded-3xl p-6 mb-6`}>
            <View style={tw`mb-6`}>
              <View style={tw`flex-row items-center bg-white/20 rounded-xl px-4 mb-1`}>
                <MaterialIcons name="email" size={20} color="white" />
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={tw`flex-1 p-4 text-white`}
                />
              </View>
            </View>

            <Pressable
              onPress={handleResetPassword}
              style={tw`bg-white rounded-xl p-4`}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#2563eb" />
              ) : (
                <Text style={tw`text-blue-600 text-lg text-center font-semibold`}>
                  Send Reset Link
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default ForgotPassword;
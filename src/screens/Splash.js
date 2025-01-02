import { Image, Pressable, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import tw from 'twrnc';

const Splash = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#1a365d', '#2563eb', '#3b82f6']}
      style={tw`flex-1`}
    >
      <View style={tw`flex-1 px-6 pt-12 pb-8`}>
        {/* Top Section with Logo and Title */}
        <View style={tw`items-center mb-8`}>
          <Image 
            source={require("../../assets/images/splash.jpg")}
            style={tw.style(`h-32 w-32 rounded-3xl shadow-lg`, { 
              shadowColor: 'white',
            })}
          />
          <View style={tw`mt-4 items-center`}>
            <Text style={tw`text-4xl font-bold text-white mb-2`}>Leadership IQ</Text>
            <Text style={tw`text-lg text-white/80 text-center`}>
              Unlock Your Leadership Potential
            </Text>
          </View>
        </View>

        {/* Quick Features */}
        <View style={tw`flex-row justify-around mb-8`}>
          <View style={tw`items-center bg-white/10 rounded-2xl p-4 flex-1 mx-2`}>
            <MaterialIcons name="psychology" size={24} color="#4ADE80" />
            <Text style={tw`text-white text-center mt-2 text-sm`}>Smart Analysis</Text>
          </View>
          <View style={tw`items-center bg-white/10 rounded-2xl p-4 flex-1 mx-2`}>
            <MaterialIcons name="insights" size={24} color="#FCD34D" />
            <Text style={tw`text-white text-center mt-2 text-sm`}>Clear Insights</Text>
          </View>
          <View style={tw`items-center bg-white/10 rounded-2xl p-4 flex-1 mx-2`}>
            <MaterialIcons name="auto-graph" size={24} color="#60A5FA" />
            <Text style={tw`text-white text-center mt-2 text-sm`}>Track Growth</Text>
          </View>
        </View>

        {/* Authentication Buttons */}
        <View style={tw`mt-auto`}>
          <View style={tw`flex-row gap-4 mb-4`}>
            <Pressable 
              onPress={() => navigation.navigate("Login")}
              style={tw`bg-white rounded-2xl py-4 flex-1`}
            >
              <Text style={tw`text-blue-600 text-base text-center font-semibold`}>
                Login
              </Text>
            </Pressable>

            <Pressable 
              onPress={() => navigation.navigate("SignUp")}
              style={tw`bg-blue-500 rounded-2xl py-4 flex-1`}
            >
              <Text style={tw`text-white text-base text-center font-semibold`}>
                Sign Up
              </Text>
            </Pressable>
          </View>

          <Pressable 
            onPress={() => navigation.navigate("HomeScreen")}
            style={tw`border border-white/30 rounded-2xl py-4`}
          >
            <Text style={tw`text-white text-base text-center font-semibold`}>
              Continue as Guest
            </Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Splash;
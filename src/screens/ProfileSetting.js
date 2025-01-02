import { Image, Pressable, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import tw from 'twrnc';

const ProfileSetting = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#1a365d', '#2563eb', '#3b82f6']}
      style={tw`flex-1`}
    >
      <View style={tw`flex-1 px-6 pt-12 pb-8`}>
        {/* Header Section with Title */}
        <View style={tw`items-center mb-8`}>
          <Text style={tw`text-4xl font-bold text-white mb-2`}>Settings</Text>
          <Text style={tw`text-lg text-white/80 text-center`}>
            Adjust your preferences
          </Text>
        </View>

        {/* Settings Options */}
        <View style={tw`flex-1`}>
          <View style={tw`bg-white/10 rounded-2xl p-4 mb-4`}>
            <Pressable
              onPress={() => navigation.navigate("Profile")}
              style={tw`flex-row items-center justify-between`}
            >
              <Text style={tw`text-white text-lg`}>Profile</Text>
              <MaterialIcons name="chevron-right" size={24} color="white" />
            </Pressable>
          </View>

          <View style={tw`bg-white/10 rounded-2xl p-4 mb-4`}>
            <Pressable
              onPress={() => navigation.navigate("ChangePassword")}
              style={tw`flex-row items-center justify-between`}
            >
              <Text style={tw`text-white text-lg`}>Change Password</Text>
              <MaterialIcons name="chevron-right" size={24} color="white" />
            </Pressable>
          </View>

          <View style={tw`bg-white/10 rounded-2xl p-4 mb-4`}>
            <Pressable
              onPress={() => navigation.navigate("Notifications")}
              style={tw`flex-row items-center justify-between`}
            >
              <Text style={tw`text-white text-lg`}>Notifications</Text>
              <MaterialIcons name="chevron-right" size={24} color="white" />
            </Pressable>
          </View>

          <View style={tw`bg-white/10 rounded-2xl p-4 mb-4`}>
            <Pressable
              onPress={() => navigation.navigate("Privacy")}
              style={tw`flex-row items-center justify-between`}
            >
              <Text style={tw`text-white text-lg`}>Privacy</Text>
              <MaterialIcons name="chevron-right" size={24} color="white" />
            </Pressable>
          </View>

          {/* Log out Button */}
          <Pressable
            onPress={() => navigation.navigate("Splash")}
            style={tw`bg-red-500 rounded-2xl py-4`}
          >
            <Text style={tw`text-white text-base text-center font-semibold`}>
              Log Out
            </Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
};

export default ProfileSetting;

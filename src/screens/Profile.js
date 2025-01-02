import { Image, Pressable, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import tw from 'twrnc';

const Profile = ({ navigation, user }) => {
  return (
    <LinearGradient
      colors={['#1a365d', '#2563eb', '#3b82f6']}
      style={tw`flex-1`}
    >
      <View style={tw`flex-1 px-6 pt-12 pb-8`}>
        {/* Header Section with Title */}
        <View style={tw`items-center mb-8`}>
          <Text style={tw`text-4xl font-bold text-white mb-2`}>Profile</Text>
          <Text style={tw`text-lg text-white/80 text-center`}>
            View and edit your details
          </Text>
        </View>

        {/* Profile Information */}
        <View style={tw`bg-white/10 rounded-2xl p-6 mb-8`}>
          <View style={tw`items-center mb-4`}>
            {/* <Image
              source={user?.profilePic || require('../../assets/images/default-avatar.png')}
              style={tw`h-32 w-32 rounded-full border-4 border-white shadow-lg`}
            /> */}
            <Text style={tw`text-white text-xl font-bold mt-4`}>{user?.name}</Text>
            <Text style={tw`text-white text-sm opacity-80`}>{user?.email}</Text>
          </View>

          <Pressable
            onPress={() => navigation.navigate("EditProfile")}
            style={tw`bg-blue-500 rounded-2xl py-4 mb-4`}
          >
            <Text style={tw`text-white text-base text-center font-semibold`}>
              Edit Profile
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("ChangePassword")}
            style={tw`bg-gray-700 rounded-2xl py-4 mb-4`}
          >
            <Text style={tw`text-white text-base text-center font-semibold`}>
              Change Password
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("Notifications")}
            style={tw`bg-blue-500 rounded-2xl py-4 mb-4`}
          >
            <Text style={tw`text-white text-base text-center font-semibold`}>
              Notification Settings
            </Text>
          </Pressable>

          {/* Log Out Button */}
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

export default Profile;

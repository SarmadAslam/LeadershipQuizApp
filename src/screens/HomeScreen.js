import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc';

const HomeScreen = ({ navigation, user, onLogout }) => {
  return (
    <View style={tw`flex-1 bg-gray-50`}>
      {/* Gradient Header */}
      <LinearGradient
        colors={['#1a365d', '#2563eb', '#3b82f6']}
        style={tw`px-6 pt-14 pb-8 rounded-b-[40px]`}
      >
        <View style={tw`flex-row justify-between items-center`}>
          {user ? (
            <View style={tw`flex-row items-center`}>
              <TouchableOpacity 
                onPress={() => navigation.navigate('Profile')}
                style={tw`bg-white/20 p-0.5 rounded-2xl`}
              >
                {/* <Image
                  source={require('../assets/images/default-avatar.png')}
                  style={tw`w-12 h-12 rounded-xl`}
                /> */}
              </TouchableOpacity>
              <View style={tw`ml-3`}>
                <Text style={tw`text-white/80 text-sm font-medium`}>Welcome back</Text>
                <Text style={tw`text-white text-xl font-bold`}>{user.name}</Text>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={tw`flex-row items-center bg-white/20 px-4 py-2 rounded-xl`}
            >
              <Ionicons name="person-outline" size={20} color="white" />
              <Text style={tw`text-white ml-2 font-medium`}>Sign In</Text>
            </TouchableOpacity>
          )}
          
          <View style={tw`flex-row gap-3`}>
            {user && (
              <TouchableOpacity
                onPress={onLogout}
                style={tw`w-10 h-10 bg-white/20 rounded-xl items-center justify-center`}
              >
                <MaterialIcons name="logout" size={22} color="white" />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileSetting')}
              style={tw`w-10 h-10 bg-white/20 rounded-xl items-center justify-center`}
            >
              <Ionicons name="settings-outline" size={22} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Header Stats */}
        {user && (
          <View style={tw`flex-row justify-between mt-8 bg-white/10 rounded-2xl p-4`}>
            <View style={tw`items-center`}>
              <Text style={tw`text-2xl font-bold text-white`}>12</Text>
              <Text style={tw`text-white/80 text-sm`}>Quizzes</Text>
            </View>
            <View style={tw`items-center`}>
              <Text style={tw`text-2xl font-bold text-white`}>85%</Text>
              <Text style={tw`text-white/80 text-sm`}>Average</Text>
            </View>
            <View style={tw`items-center`}>
              <Text style={tw`text-2xl font-bold text-white`}>4.8</Text>
              <Text style={tw`text-white/80 text-sm`}>Rating</Text>
            </View>
          </View>
        )}
      </LinearGradient>

      <ScrollView style={tw`flex-1 px-6`} showsVerticalScrollIndicator={false}>
        {/* Main Actions */}
        <View style={tw`mt-6`}>
          <Text style={tw`text-2xl font-bold text-gray-800 mb-4`}>
            Start Your Journey
          </Text>
          
          <TouchableOpacity
            style={tw`bg-white rounded-3xl shadow-lg mb-4 overflow-hidden`}
            onPress={() => navigation.navigate('QuizScreen')}
          >
            <LinearGradient
              colors={['#2563eb', '#3b82f6']}
              style={tw`p-6`}
            >
              <View style={tw`flex-row items-center justify-between`}>
                <View style={tw`flex-1`}>
                  <View style={tw`flex-row items-center`}>
                    <MaterialIcons name="psychology" size={28} color="white" />
                    <Text style={tw`text-xl font-bold text-white ml-3`}>
                      Leadership Quiz
                    </Text>
                  </View>
                  <Text style={tw`text-white/90 mt-2 text-base`}>
                    Discover your unique leadership style through our comprehensive assessment
                  </Text>
                </View>
                <MaterialIcons name="arrow-forward-ios" size={24} color="white" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`bg-white rounded-3xl shadow-lg p-6 flex-row items-center justify-between`}
            onPress={() => navigation.navigate('LeadershipStylesInfo')}
          >
            <View style={tw`flex-1`}>
              <View style={tw`flex-row items-center`}>
                <MaterialIcons name="library-books" size={28} color="#1e40af" />
                <Text style={tw`text-xl font-bold text-gray-800 ml-3`}>
                  Leadership Styles
                </Text>
              </View>
              <Text style={tw`text-gray-600 mt-2 text-base`}>
                Explore different approaches to leadership
              </Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={24} color="#1e40af" />
          </TouchableOpacity>
        </View>

        {/* Recent Activity */}
        {user && (
          <View style={tw`my-6`}>
            <Text style={tw`text-2xl font-bold text-gray-800 mb-4`}>
              Recent Activity
            </Text>
            <View style={tw`bg-white rounded-3xl shadow-lg p-6`}>
              <View style={tw`flex-row items-center mb-4`}>
                <View style={tw`w-10 h-10 bg-blue-100 rounded-xl items-center justify-center`}>
                  <MaterialIcons name="history" size={24} color="#1e40af" />
                </View>
                <View style={tw`ml-3`}>
                  <Text style={tw`text-gray-800 font-bold`}>Democratic Leader</Text>
                  <Text style={tw`text-gray-600`}>Quiz completed • 2 days ago</Text>
                </View>
              </View>
              
              <View style={tw`flex-row items-center`}>
                <View style={tw`w-10 h-10 bg-purple-100 rounded-xl items-center justify-center`}>
                  <MaterialIcons name="star" size={24} color="#7e22ce" />
                </View>
                <View style={tw`ml-3`}>
                  <Text style={tw`text-gray-800 font-bold`}>New Achievement</Text>
                  <Text style={tw`text-gray-600`}>5 Quizzes Completed</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
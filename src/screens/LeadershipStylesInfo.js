import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc';

const LeadershipStylesInfo = () => {
  const navigation = useNavigation();

  const LeadershipCard = ({ title, characteristics, strengths, weaknesses, tips, color, icon }) => (
    <View style={tw`bg-white rounded-3xl shadow-lg mb-6 overflow-hidden`}>
      <LinearGradient
        colors={[color, color.replace('1)', '0.8)')]}
        style={tw`px-6 py-4 flex-row items-center justify-between`}
      >
        <Text style={tw`text-2xl font-bold text-white flex-1`}>{title}</Text>
        <MaterialIcons name={icon} size={28} color="white" />
      </LinearGradient>
      
      <View style={tw`p-6`}>
        <Section title="Key Characteristics" items={characteristics} />
        <Section title="Strengths" items={strengths} />
        <Section title="Potential Challenges" items={weaknesses} />
        <Section title="Best Used When" items={tips} />
      </View>
    </View>
  );

  const Section = ({ title, items }) => (
    <View style={tw`mb-4`}>
      <Text style={tw`text-lg font-semibold text-gray-800 mb-2`}>{title}</Text>
      {items.map((item, index) => (
        <View key={index} style={tw`flex-row items-center mb-1`}>
          <MaterialIcons name="check-circle" size={16} color="#4CAF50" style={tw`mr-2`} />
          <Text style={tw`text-gray-600 flex-1`}>{item}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      {/* Header */}
      <LinearGradient
        colors={['#1a365d', '#2563eb']}
        style={tw`px-6 py-4 rounded-b-3xl`}
      >
        <View style={tw`flex-row items-center mb-4`}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={tw`w-10 h-10 bg-white/20 rounded-xl items-center justify-center mr-4`}
          >
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={tw`text-3xl font-bold text-white flex-1`}>
            Leadership Styles
          </Text>
        </View>
        <Text style={tw`text-white/80 text-lg`}>
          Discover different approsaches to leadership
        </Text>
      </LinearGradient>

      <ScrollView style={tw`flex-1 px-6 pt-6`} showsVerticalScrollIndicator={false}>
        <LeadershipCard
          title="Autocratic Leadership"
          color="rgba(231, 76, 60, 1)"
          icon="gavel"
          characteristics={[
            "Clear chain of command",
            "Decisions made independently",
            "High level of control and oversight",
            "Direct communication style"
          ]}
          strengths={[
            "Quick decision-making",
            "Clear direction and structure",
            "Efficient in crisis situations",
            "High productivity"
          ]}
          weaknesses={[
            "Can lower team morale",
            "Limited creativity and innovation",
            "High dependence on leader",
            "Potential for burnout"
          ]}
          tips={[
            "Crisis situations requiring quick decisions",
            "Inexperienced team members needing guidance",
            "High-risk environments",
            "Time-sensitive projects"
          ]}
        />

        <LeadershipCard
          title="Democratic Leadership"
          color="rgba(41, 128, 185, 1)"
          icon="groups"
          characteristics={[
            "Collaborative decision-making",
            "Open communication",
            "Team involvement",
            "Shared responsibility"
          ]}
          strengths={[
            "High team engagement",
            "Increased creativity",
            "Strong team relationships",
            "Better problem-solving"
          ]}
          weaknesses={[
            "Slower decision-making",
            "Potential for conflict",
            "May lack direction",
            "Time-consuming"
          ]}
          tips={[
            "Experienced team members",
            "Complex projects requiring diverse input",
            "Long-term planning",
            "Team building situations"
          ]}
        />

        <LeadershipCard
          title="Laissez-Faire Leadership"
          color="rgba(39, 174, 96, 1)"
          icon="psychology"
          characteristics={[
            "Hands-off approach",
            "High team autonomy",
            "Minimal supervision",
            "Trust in team capabilities"
          ]}
          strengths={[
            "Encourages creativity",
            "High team independence",
            "Low pressure environment",
            "Strong self-motivation"
          ]}
          weaknesses={[
            "Lack of structure",
            "Potential for missed deadlines",
            "Unclear expectations",
            "Risk of low productivity"
          ]}
          tips={[
            "Highly skilled and motivated teams",
            "Creative projects",
            "Research and development",
            "Expert team members"
          ]}
        />

        {/* Reflection Section */}
        <View style={tw`bg-white rounded-3xl shadow-lg p-6 mb-6`}>
          <View style={tw`flex-row items-center mb-4`}>
            <MaterialIcons name="lightbulb" size={24} color="#F59E0B" />
            <Text style={tw`text-2xl font-bold text-gray-800 ml-2`}>
              Leadership Reflection
            </Text>
          </View>
          <Text style={tw`text-gray-600 mb-4 text-lg`}>
            Consider these questions as you develop your leadership style:
          </Text>
          <View style={tw`gap-4`}>
            {[
              "What situations make you feel most comfortable as a leader?",
              "How does your team respond to different leadership approaches?",
              "What skills do you need to develop to be more effective?",
              "How can you adapt your style to better serve your team's needs?"
            ].map((question, index) => (
              <View key={index} style={tw`flex-row items-start`}>
                <MaterialIcons name="help-outline" size={20} color="#6B7280" style={tw`mr-2 mt-1`} />
                <Text style={tw`text-gray-600 flex-1`}>{question}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LeadershipStylesInfo;
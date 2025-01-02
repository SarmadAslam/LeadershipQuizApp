import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const LeadershipStylesInfo = () => {
  const navigation = useNavigation();

  const LeadershipCard = ({ title, characteristics, strengths, weaknesses, tips, color }) => (
    <View style={tw`bg-white rounded-lg shadow-sm p-5 mb-6`}>
      <Text style={tw`text-2xl font-bold text-[${color}] mb-4`}>{title}</Text>
      
      <Text style={tw`text-lg font-semibold text-gray-800 mb-2`}>Characteristics:</Text>
      {characteristics.map((item, index) => (
        <Text key={index} style={tw`text-gray-600 mb-1`}>• {item}</Text>
      ))}

      <Text style={tw`text-lg font-semibold text-gray-800 mt-4 mb-2`}>Strengths:</Text>
      {strengths.map((item, index) => (
        <Text key={index} style={tw`text-gray-600 mb-1`}>• {item}</Text>
      ))}

      <Text style={tw`text-lg font-semibold text-gray-800 mt-4 mb-2`}>Weaknesses:</Text>
      {weaknesses.map((item, index) => (
        <Text key={index} style={tw`text-gray-600 mb-1`}>• {item}</Text>
      ))}

      <Text style={tw`text-lg font-semibold text-gray-800 mt-4 mb-2`}>When to Use:</Text>
      {tips.map((item, index) => (
        <Text key={index} style={tw`text-gray-600 mb-1`}>• {item}</Text>
      ))}
    </View>
  );

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      <ScrollView style={tw`flex-1 p-6`}>
        <Text style={tw`text-3xl font-bold text-gray-800 mb-6`}>
          Understanding Leadership Styles
        </Text>

        <LeadershipCard
          title="Autocratic Leadership"
          color="#e74c3c"
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
          color="#2980b9"
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
          color="#27ae60"
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

        <View style={tw`bg-white rounded-lg shadow-sm p-5 mb-6`}>
          <Text style={tw`text-2xl font-bold text-gray-800 mb-4`}>
            Leadership Reflection
          </Text>
          <Text style={tw`text-gray-600 mb-4`}>
            Consider these questions as you develop your leadership style:
          </Text>
          <View style={tw`gap-3`}>
            <Text style={tw`text-gray-600`}>• What situations make you feel most comfortable as a leader?</Text>
            <Text style={tw`text-gray-600`}>• How does your team respond to different leadership approaches?</Text>
            <Text style={tw`text-gray-600`}>• What skills do you need to develop to be more effective?</Text>
            <Text style={tw`text-gray-600`}>• How can you adapt your style to better serve your team's needs?</Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={tw`bg-[#2980b9] p-4 m-4 rounded-full`}
        onPress={() => navigation.goBack()}
      >
        <Text style={tw`text-white text-center font-bold text-lg`}>
          Back to Results
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LeadershipStylesInfo;
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const ResultsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { results } = route.params;

  const leadershipStyles = {
    Autocratic: {
      color: '#e74c3c',
      description: "You tend to make decisions independently and maintain clear control over your team.",
      strengths: [
        "Quick and efficient decision-making",
        "Clear direction and structure",
        "High productivity in crisis situations",
        "Effective when immediate action is needed"
      ],
      weaknesses: [
        "May limit team creativity and innovation",
        "Could reduce team member engagement",
        "Might create dependency on leadership",
        "Risk of team burnout"
      ],
      tips: [
        "Consider involving team members in decision-making when time permits",
        "Delegate responsibilities to build team confidence",
        "Practice active listening to understand team perspectives",
        "Balance control with team autonomy"
      ]
    },
    Democratic: {
      color: '#2980b9',
      description: "You prioritize team involvement and collaborative decision-making.",
      strengths: [
        "High team engagement and satisfaction",
        "Creative problem-solving through collaboration",
        "Strong team relationships",
        "Increased buy-in for decisions"
      ],
      weaknesses: [
        "Decision-making can be slower",
        "May face challenges in crisis situations",
        "Potential for team conflicts",
        "Risk of unclear direction"
      ],
      tips: [
        "Set clear timelines for decision-making processes",
        "Develop crisis management protocols",
        "Balance discussion with action",
        "Maintain final decision authority when needed"
      ]
    },
    'Laissez-Faire': {
      color: '#27ae60',
      description: "You empower team members with high autonomy and trust in their capabilities.",
      strengths: [
        "Promotes creativity and innovation",
        "Builds strong team independence",
        "Reduces pressure on team members",
        "Encourages professional growth"
      ],
      weaknesses: [
        "May lack structure and direction",
        "Risk of missed deadlines",
        "Potential for reduced accountability",
        "Could lead to team confusion"
      ],
      tips: [
        "Establish clear expectations and goals",
        "Implement regular check-ins",
        "Provide support when requested",
        "Balance freedom with guidance"
      ]
    }
  };

  const currentStyle = leadershipStyles[results.dominantStyle];

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      <ScrollView style={tw`flex-1 p-6`}>
        <View style={tw`mb-8`}>
          <Text style={tw`text-3xl font-bold text-[${currentStyle.color}] mb-2`}>
            {results.dominantStyle} Leader
          </Text>
          <Text style={tw`text-gray-600 text-lg`}>
            {currentStyle.description}
          </Text>
        </View>

        <View style={tw`bg-white rounded-lg shadow-sm p-5 mb-6`}>
          <Text style={tw`text-xl font-bold text-gray-800 mb-4`}>Your Leadership Profile</Text>
          
          <Text style={tw`text-base font-semibold text-gray-800 mb-2`}>Key Strengths:</Text>
          {currentStyle.strengths.map((strength, index) => (
            <Text key={index} style={tw`text-gray-600 mb-1`}>• {strength}</Text>
          ))}

          <Text style={tw`text-base font-semibold text-gray-800 mt-4 mb-2`}>Areas for Growth:</Text>
          {currentStyle.weaknesses.map((weakness, index) => (
            <Text key={index} style={tw`text-gray-600 mb-1`}>• {weakness}</Text>
          ))}

          <Text style={tw`text-base font-semibold text-gray-800 mt-4 mb-2`}>Development Tips:</Text>
          {currentStyle.tips.map((tip, index) => (
            <Text key={index} style={tw`text-gray-600 mb-1`}>• {tip}</Text>
          ))}
        </View>

        <View style={tw`bg-white rounded-lg shadow-sm p-5 mb-6`}>
          <Text style={tw`text-xl font-bold text-gray-800 mb-4`}>Style Breakdown</Text>
          <View style={tw`flex-row justify-between items-center mb-2`}>
            <Text style={tw`text-gray-600`}>Autocratic</Text>
            <Text style={tw`text-gray-800 font-semibold`}>{Math.round(results.counts.A / 12 * 100)}%</Text>
          </View>
          <View style={tw`flex-row justify-between items-center mb-2`}>
            <Text style={tw`text-gray-600`}>Democratic</Text>
            <Text style={tw`text-gray-800 font-semibold`}>{Math.round(results.counts.B / 12 * 100)}%</Text>
          </View>
          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`text-gray-600`}>Laissez-Faire</Text>
            <Text style={tw`text-gray-800 font-semibold`}>{Math.round(results.counts.C / 12 * 100)}%</Text>
          </View>
        </View>
      </ScrollView>

      <View style={tw`p-4 gap-3`}>
        <TouchableOpacity
          style={tw`bg-[#2980b9] p-4 rounded-full`}
          onPress={() => navigation.navigate('LeadershipStylesInfo')}
        >
          <Text style={tw`text-white text-center font-bold text-lg`}>
            Learn More About Leadership Styles
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`bg-gray-200 p-4 rounded-full`}
          onPress={() => navigation.navigate('QuizScreen')}
        >
          <Text style={tw`text-gray-800 text-center font-bold text-lg`}>
            Retake Quiz
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResultsScreen;
import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc';

const ResultsScreen = ({ route, navigation }) => {
  const { results } = route.params;
  
  const styleColors = {
    Autocratic: '#e74c3c',
    Democratic: '#2980b9',
    'Laissez-Faire': '#27ae60'
  };

  const ProgressBar = ({ percentage, color }) => (
    <View style={tw`h-2 bg-gray-200 rounded-full overflow-hidden`}>
      <View 
        style={[
          tw`h-full rounded-full`,
          { backgroundColor: color, width: `${percentage}%` }
        ]}
      />
    </View>
  );

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

  return (
    <LinearGradient
      colors={['#1a365d', '#2563eb', '#3b82f6']}
      style={tw`flex-1`}
    >
      <ScrollView style={tw`flex-1`}>
        <View style={tw`px-6 pt-12 pb-8`}>
          {/* Back Button */}
          <Pressable 
            onPress={() => navigation.navigate('HomeScreen')}
            style={tw`flex-row items-center mb-8`}
          >
            <MaterialIcons name="arrow-back" size={24} color="white" />
            <Text style={tw`text-white ml-1`}>Back to Home</Text>
          </Pressable>

          {/* Results Header */}
          <View style={tw`items-center mb-8`}>
            <Text style={tw`text-4xl font-bold text-white mb-2`}>Your Results</Text>
            <Text style={tw`text-lg text-white/80 text-center`}>
              Understanding Your Leadership Style
            </Text>
          </View>

          {/* Dominant Style Card */}
          <View style={tw`bg-white/10 rounded-3xl p-6 mb-6`}>
            <Text style={[
              tw`text-3xl font-bold mb-2`,
              { color: styleColors[results.dominantStyle] }
            ]}>
              {results.dominantStyle} Leader
            </Text>
            <Text style={tw`text-white/80 text-lg mb-6`}>
              {leadershipStyles[results.dominantStyle].description}
            </Text>

            {/* Style Breakdown */}
            <Text style={tw`text-xl font-bold text-white mb-4`}>Style Breakdown</Text>
            
            <View style={tw`mb-4`}>
              <View style={tw`flex-row justify-between items-center mb-2`}>
                <Text style={tw`text-white`}>Autocratic</Text>
                <Text style={tw`text-white font-bold`}>
                  {Math.round(results.counts.A / 12 * 100)}%
                </Text>
              </View>
              <ProgressBar 
                percentage={Math.round(results.counts.A / 12 * 100)} 
                color={styleColors.Autocratic}
              />
            </View>

            <View style={tw`mb-4`}>
              <View style={tw`flex-row justify-between items-center mb-2`}>
                <Text style={tw`text-white`}>Democratic</Text>
                <Text style={tw`text-white font-bold`}>
                  {Math.round(results.counts.B / 12 * 100)}%
                </Text>
              </View>
              <ProgressBar 
                percentage={Math.round(results.counts.B / 12 * 100)} 
                color={styleColors.Democratic}
              />
            </View>

            <View style={tw`mb-4`}>
              <View style={tw`flex-row justify-between items-center mb-2`}>
                <Text style={tw`text-white`}>Laissez-Faire</Text>
                <Text style={tw`text-white font-bold`}>
                  {Math.round(results.counts.C / 12 * 100)}%
                </Text>
              </View>
              <ProgressBar 
                percentage={Math.round(results.counts.C / 12 * 100)} 
                color={styleColors['Laissez-Faire']}
              />
            </View>
          </View>

          {/* Strengths and Tips */}
          <View style={tw`bg-white/10 rounded-3xl p-6 mb-6`}>
            <Text style={tw`text-xl font-bold text-white mb-4`}>Key Strengths</Text>
            {leadershipStyles[results.dominantStyle].strengths.map((strength, index) => (
              <View key={index} style={tw`flex-row items-center mb-2`}>
                <MaterialIcons name="check-circle" size={20} color="white" />
                <Text style={tw`text-white ml-2`}>{strength}</Text>
              </View>
            ))}

            <Text style={tw`text-xl font-bold text-white mt-6 mb-4`}>Development Tips</Text>
            {leadershipStyles[results.dominantStyle].tips.map((tip, index) => (
              <View key={index} style={tw`flex-row items-center mb-2`}>
                <MaterialIcons name="lightbulb" size={20} color="white" />
                <Text style={tw`text-white ml-2`}>{tip}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={tw`p-4 gap-3`}>
        <Pressable
          style={tw`bg-white rounded-xl p-4`}
          onPress={() => navigation.navigate('LeadershipStylesInfo')}
        >
          <Text style={tw`text-blue-600 text-lg text-center font-semibold`}>
            Learn More About Leadership Styles
          </Text>
        </Pressable>

        <Pressable
          style={tw`border border-white/30 rounded-xl p-4`}
          onPress={() => navigation.navigate('QuizScreen')}
        >
          <Text style={tw`text-white text-lg text-center font-semibold`}>
            Retake Quiz
          </Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

export default ResultsScreen;
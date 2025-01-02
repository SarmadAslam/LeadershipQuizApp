import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { questions } from '../config/questions';

const QuizScreen = () => {
  const navigation = useNavigation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState(Array(12).fill(null));

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex === questions.length - 1) {
      const results = calculateResults(answers);
      navigation.navigate('Results', { results });
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    }
  };

  const calculateResults = (answers) => {
    const counts = answers.reduce((acc, answer) => {
      if (answer) acc[answer]++;
      return acc;
    }, { A: 0, B: 0, C: 0 });

    const styles = {
      A: 'Autocratic',
      B: 'Democratic',
      C: 'Laissez-Faire'
    };

    const dominantStyle = Object.entries(counts)
      .reduce((a, b) => a[1] > b[1] ? a : b)[0];

    return {
      dominantStyle: styles[dominantStyle],
      counts
    };
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      {/* Progress Bar */}
      <View style={tw`h-2 bg-gray-200 mt-4`}>
        <View 
          style={[
            tw`h-2 bg-[#2980b9]`,
            { width: `${progress}%` }
          ]}
        />
      </View>

      <View style={tw`flex-1 p-6`}>
        <Text style={tw`text-gray-500 mb-2`}>
          Question {currentQuestionIndex + 1} of {questions.length}
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={tw`text-xl font-bold text-gray-800 mb-6`}>
            {currentQuestion.question}
          </Text>

          {Object.entries(currentQuestion.options).map(([key, value]) => (
            <TouchableOpacity
              key={key}
              style={tw`
                p-4 mb-4 rounded-lg border-2
                ${selectedAnswer === key 
                  ? 'bg-[#2980b9] border-[#2980b9]' 
                  : 'bg-white border-gray-300'}
              `}
              onPress={() => handleSelectAnswer(key)}
            >
              <Text style={tw`
                text-base
                ${selectedAnswer === key ? 'text-white' : 'text-gray-800'}
              `}>
                {value}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {selectedAnswer && (
          <TouchableOpacity
            style={tw`py-4 bg-[#2980b9] rounded-full mt-4`}
            onPress={handleNext}
          >
            <Text style={tw`text-white text-lg font-bold text-center`}>
              {currentQuestionIndex === questions.length - 1 ? 'See Results' : 'Next Question'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default QuizScreen;
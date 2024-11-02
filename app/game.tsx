import { Link } from 'expo-router'
import {
  StatusBar,
  View,
  Text,
  Image,
  useWindowDimensions,
  Pressable
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons'
import { getRandomElement } from '../utils/array'
import { useState } from 'react'
import { questions } from '../utils/questions'

function Answer(props: {
  value: string
  index: number
  type: 'correct' | 'wrong' | 'neutral'
  onPress: (index: number) => void
}) {
  const onPress = () => {
    props.onPress(props.index)
  }

  const [selectedColor, selectedColorDark] = {
    correct: ['#79b933', '#659b2b'],
    wrong: ['#ee5555', '#be4444'],
    neutral: [undefined, undefined]
  }[props.type]

  return (
    <Pressable
      style={{
        padding: 10,
        borderWidth: 2,
        borderBottomWidth: 4,
        borderTopColor: selectedColor ?? '#37464f',
        borderLeftColor: selectedColor ?? '#37464f',
        borderRightColor: selectedColor ?? '#37464f',
        borderBottomColor: selectedColorDark ?? '#37464f',
        borderRadius: 12
      }}
      onPress={onPress}
    >
      <Text
        style={{
          color: selectedColor ?? 'white',
          fontSize: 20,
          fontWeight: 600,
          fontFamily: 'Nunito_700Bold'
        }}
      >
        {props.value}
      </Text>
    </Pressable>
  )
}

export default function Game() {
  const dimensions = useWindowDimensions()
  const [lifes, setLifes] = useState(5)
  const [questionGenerator] = useState(() => getRandomElement(questions)())
  const [question, setQuestion] = useState(() => {
    const result = questionGenerator.next()

    if (!result.done) {
      return result.value
    }

    throw 'Ran out of questions'
  })
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  const imageWidth = dimensions.width - 40

  const onAnswerPress = (answerIndex: number) => {
    if (!selectedAnswer) {
      setSelectedAnswer(answerIndex)
      if (answerIndex !== question.correctAnswer) {
        setLifes((v) => v - 1)
      }
    }
  }

  const onContinuePress = () => {
    setSelectedAnswer(null)
    const generatorResult = questionGenerator.next()
    if (generatorResult.done) {
      return
    }
    setQuestion(generatorResult.value)
  }

  const isCorrectAnswer = selectedAnswer === question.correctAnswer

  return (
    <>
      <StatusBar backgroundColor="#131f24" />
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#131f24',
            alignItems: 'center'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 20,
              paddingTop: 20,
              paddingHorizontal: 20,
              paddingBottom: 50
            }}
          >
            <Link href="../">
              <Ionicons name="close" size={48} color="#37464f" />
            </Link>
            <View
              style={{
                flex: 1,
                height: 16,
                marginLeft: -10,
                borderRadius: 8,
                backgroundColor: '#37464f'
              }}
            ></View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="heart" size={32} color="#ff4b4b" />
              <Text
                style={{
                  paddingLeft: 5,
                  fontSize: 18,
                  fontFamily: 'Nunito_700Bold',
                  color: '#ff4b4b'
                }}
              >
                {lifes}
              </Text>
            </View>
          </View>
          {question.image ? (
            <Image
              style={{ width: imageWidth, height: 200, borderRadius: 4 }}
              source={{ uri: question.image }}
            />
          ) : null}

          <Text
            style={{
              fontSize: 24,
              fontWeight: 900,
              fontFamily: 'Nunito_700Bold',
              color: 'white',
              paddingTop: 10,
              paddingBottom: 40
            }}
          >
            {question.title}
          </Text>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 40,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 10
            }}
          >
            {question.answers.map((answer, i) => (
              <Answer
                key={answer}
                value={answer}
                index={i}
                onPress={onAnswerPress}
                type={
                  selectedAnswer === i
                    ? i === question.correctAnswer
                      ? 'correct'
                      : 'wrong'
                    : 'neutral'
                }
              />
            ))}
          </View>

          {selectedAnswer ? (
            <View
              style={{
                paddingVertical: 20,
                paddingHorizontal: 20,
                alignSelf: 'stretch',
                backgroundColor: '#202f36'
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingBottom: 20
                }}
              >
                <Ionicons
                  name={isCorrectAnswer ? 'checkmark-circle' : 'close-circle'}
                  size={32}
                  color={isCorrectAnswer ? '#79b933' : '#d84848'}
                />
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 24,
                    color: isCorrectAnswer ? '#79b933' : '#d84848',
                    fontWeight: 900,
                    fontFamily: 'Nunito_700Bold'
                  }}
                >
                  {isCorrectAnswer ? 'Nicely done!' : 'Incorrect'}
                </Text>
              </View>
              {!isCorrectAnswer ? (
                <View style={{ paddingBottom: 20 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      fontFamily: 'Nunito_700Bold',
                      color: '#d84848',
                      paddingBottom: 5
                    }}
                  >
                    Correct Answer:
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: 'Nunito_500Medium',
                      color: '#d84848'
                    }}
                  >
                    {question.answers[question.correctAnswer]}
                  </Text>
                </View>
              ) : null}
              <Pressable
                style={{
                  padding: 15,
                  borderWidth: 2,
                  borderBottomWidth: 4,
                  borderTopColor: isCorrectAnswer ? '#93d333' : '#ee5555',
                  borderLeftColor: isCorrectAnswer ? '#93d333' : '#ee5555',
                  borderRightColor: isCorrectAnswer ? '#93d333' : '#ee5555',
                  borderBottomColor: isCorrectAnswer ? '#93d333' : '#d84848',
                  backgroundColor: isCorrectAnswer ? '#93d333' : '#ee5555',
                  borderRadius: 12,
                  alignItems: 'center'
                }}
                onPress={onContinuePress}
              >
                <Text
                  style={{
                    color: '#131f24',
                    fontSize: 16,
                    textTransform: 'uppercase',
                    fontWeight: 900,
                    fontFamily: 'Nunito_700Bold'
                  }}
                >
                  {isCorrectAnswer ? 'Continue' : 'Got it'}
                </Text>
              </Pressable>
            </View>
          ) : null}
        </View>
      </SafeAreaView>
    </>
  )
}

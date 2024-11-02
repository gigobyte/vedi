import { Link, router } from 'expo-router'
import {
  StatusBar,
  View,
  Text,
  Image,
  useWindowDimensions,
  Pressable
} from 'react-native'
import Animated, {
  Easing,
  SlideInDown,
  SlideInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons'
import { getRandomElement } from '../utils/array'
import { useEffect, useMemo, useState } from 'react'
import { questions } from '../utils/questions'
import { Button, ButtonVariant } from '../components/Button'

function Answer(props: {
  value: string
  index: number
  variant: ButtonVariant
  onPress: (index: number) => void
}) {
  const onPress = () => {
    props.onPress(props.index)
  }

  return (
    <Button
      style={{
        padding: 10
      }}
      borderWidth={2}
      variant={props.variant}
      onPress={onPress}
      textStyle={{
        fontSize: 20,
        fontWeight: 600,
        fontFamily: 'Nunito_700Bold'
      }}
      text={props.value}
    />
  )
}

const MaxNumberOfQuestions = 6

function ProgressBar(props: { progress: number }) {
  const [width, setWidth] = useState(0)
  const progressWidth = useSharedValue(0)

  useEffect(() => {
    progressWidth.value = withSpring(
      width * (props.progress / MaxNumberOfQuestions),
      { duration: 500, dampingRatio: 0.6 }
    )
  }, [props.progress, width])

  const shineStyle = useAnimatedStyle(() => {
    return {
      width: progressWidth.value - 14
    }
  })

  return (
    <View
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      style={{
        height: 16,
        borderRadius: 8,
        backgroundColor: '#37464f'
      }}
    >
      <Animated.View
        style={{
          backgroundColor: '#93d333',
          width: progressWidth,
          height: 16,
          borderRadius: 8
        }}
      >
        <Animated.View
          style={[
            shineStyle,
            {
              backgroundColor: '#a9dc5c',
              height: 5,
              top: 3,
              left: 7,
              borderRadius: 2,
              position: 'absolute'
            }
          ]}
        />
      </Animated.View>
    </View>
  )
}

export default function Game() {
  const insets = useSafeAreaInsets()
  const dimensions = useWindowDimensions()
  const [lifes, setLifes] = useState(5)
  const [questionIndex, setQuestionIndex] = useState(0)
  const qs = useMemo(
    () =>
      Array(6)
        .fill(null)
        .map(() => getRandomElement(questions)()),
    []
  )
  const question = qs[questionIndex]

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  const imageWidth = dimensions.width - 40

  const onAnswerPress = (answerIndex: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answerIndex)
      if (answerIndex !== question.correctAnswer) {
        setLifes((v) => v - 1)
      }
    }
  }

  const onContinuePress = () => {
    if (questionIndex + 1 === MaxNumberOfQuestions || lifes === 0) {
      router.back()
      return
    }

    setSelectedAnswer(null)
    setQuestionIndex((v) => v + 1)
  }

  const isCorrectAnswer = selectedAnswer === question.correctAnswer

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#131f24',
        alignItems: 'center',
        paddingTop: insets.top
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
        <View style={{ flex: 1, marginLeft: -10 }}>
          <ProgressBar progress={questionIndex + 1} />
        </View>

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
          style={{ width: imageWidth, height: 220, borderRadius: 4 }}
          source={{ uri: question.image }}
        />
      ) : null}

      <Text
        style={{
          fontSize: 24,
          fontWeight: 900,
          fontFamily: 'Nunito_700Bold',
          color: 'white',
          paddingTop: 15,
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
            variant={
              selectedAnswer === i
                ? i === question.correctAnswer
                  ? 'success'
                  : 'error'
                : 'default'
            }
          />
        ))}
      </View>

      {selectedAnswer !== null ? (
        <Animated.View
          entering={SlideInDown.duration(200).easing(Easing.out(Easing.quad))}
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
          <Button
            filled
            variant={isCorrectAnswer ? 'success' : 'error'}
            style={{
              padding: 12,
              alignItems: 'center'
            }}
            borderWidth={4}
            onPress={onContinuePress}
            text={isCorrectAnswer ? 'Continue' : 'Got it'}
            textStyle={{
              fontSize: 16,
              textTransform: 'uppercase',
              fontWeight: 900,
              fontFamily: 'Nunito_700Bold'
            }}
          />
        </Animated.View>
      ) : null}
    </View>
  )
}

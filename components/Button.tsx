import { ComponentProps, useState } from 'react'
import { Pressable, StyleProp, Text, TextStyle, View } from 'react-native'

export type ButtonVariant = 'default' | 'success' | 'error'

export function Button(
  props: Pick<ComponentProps<typeof Pressable>, 'onPress'> & {
    variant: ButtonVariant
    filled?: boolean
    text: string
    style?: StyleProp<TextStyle>
    textStyle?: StyleProp<TextStyle>
    borderWidth?: number
  }
) {
  const [showElevation, setShowElevation] = useState(true)

  const [accentColor, accentColorDarker] = {
    default: ['#37464f', '#37464f'],
    success: ['#79b933', '#659b2b'],
    error: ['#ee5555', '#be4444']
  }[props.variant]

  const borderWidth = props.borderWidth ?? 2

  return (
    <Pressable
      onPress={props.onPress}
      onPressIn={() => setShowElevation(false)}
      onPressOut={() => setShowElevation(true)}
    >
      {showElevation ? (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: 30,
            backgroundColor: accentColorDarker,
            borderRadius: 12,
            bottom: 0
          }}
        />
      ) : null}
      <View
        style={[
          {
            borderWidth,
            borderColor: accentColor,
            borderRadius: 12,
            backgroundColor: props.filled ? accentColor : '#131f24',
            marginTop: showElevation ? 0 : borderWidth,
            marginBottom: showElevation ? borderWidth : 0
          },
          props.style
        ]}
      >
        <Text
          style={[
            { color: props.filled ? '#131f24' : 'white' },
            props.textStyle
          ]}
        >
          {props.text}
        </Text>
      </View>
    </Pressable>
  )
}

import { Text, View } from 'react-native'
import { router } from 'expo-router'
import { Button } from '../components/Button'

export default function Index() {
  const onPlayPress = () => {
    router.push('/game')
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#131f24'
      }}
    >
      <View>
        <Button
          variant="success"
          filled
          onPress={onPlayPress}
          borderRadius={64}
          style={{
            width: 128,
            height: 96
          }}
          borderWidth={4}
          text="Play"
          textStyle={{ fontWeight: '900', fontSize: 24 }}
        />
      </View>
    </View>
  )
}

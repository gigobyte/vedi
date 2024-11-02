import { Text, View, StatusBar, Pressable } from 'react-native'
import { router } from 'expo-router'

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
        <View
          style={{
            position: 'absolute',
            bottom: -8,
            borderRadius: 64,
            width: 128,
            height: 96,
            backgroundColor: '#659b2b',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        />
        <Pressable
          onPress={onPlayPress}
          style={{
            borderRadius: 64,
            width: 128,
            height: 96,
            backgroundColor: '#79b933',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text style={{ color: 'white', fontWeight: '900', fontSize: 24 }}>
            Play
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

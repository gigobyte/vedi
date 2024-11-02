import { Text, View, StatusBar } from 'react-native'

export default function Index() {
  return (
    <>
      <StatusBar backgroundColor="#131f24" />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#131f24'
        }}
      >
        <Text style={{ color: 'white', fontSize: 38 }}>Test</Text>
      </View>
    </>
  )
}

import { Stack } from 'expo-router'
import { useFonts, Nunito_700Bold } from '@expo-google-fonts/nunito'

export default function Layout() {
  let [fontsLoaded] = useFonts({
    Nunito_700Bold
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <Stack>
      <Stack.Screen options={{ headerShown: false }} name="index" />
      <Stack.Screen
        name="game"
        options={{
          headerShown: false,
          presentation: 'modal',
          animation: 'slide_from_bottom'
        }}
      />
    </Stack>
  )
}

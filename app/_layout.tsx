import { Stack } from 'expo-router'
import {
  useFonts,
  Nunito_700Bold,
  Nunito_500Medium
} from '@expo-google-fonts/nunito'

export default function Layout() {
  let [fontsLoaded] = useFonts({
    Nunito_500Medium,
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
          presentation: 'transparentModal',
          animation: 'slide_from_bottom'
        }}
      />
    </Stack>
  )
}

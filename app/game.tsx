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

const gameData = [
  {
    name: 'SF90 Stradale',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Red_2019_Ferrari_SF90_Stradale_%2848264238897%29_%28cropped%29.jpg/800px-Red_2019_Ferrari_SF90_Stradale_%2848264238897%29_%28cropped%29.jpg'
  },
  {
    name: 'Roma',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Ferrari_Roma_IMG_5355.jpg/800px-Ferrari_Roma_IMG_5355.jpg'
  },
  {
    name: '296',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/2022_Ferrari_296_%28cropped%29.jpg/800px-2022_Ferrari_296_%28cropped%29.jpg'
  }
]

export default function Game() {
  const dimensions = useWindowDimensions()
  const randomCar = gameData[Math.floor(Math.random() * gameData.length)]

  const imageWidth = dimensions.width - 40

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
              paddingHorizontal: 20
            }}
          >
            <Link
              href="../"
              style={{ fontSize: 30, fontWeight: 900, color: '#37464f' }}
            >
              x
            </Link>
            <View
              style={{
                flex: 1,
                height: 16,
                borderRadius: 8,
                backgroundColor: '#37464f'
              }}
            ></View>
          </View>
          <Image
            style={{ width: imageWidth, height: 200, borderRadius: 4 }}
            source={{ uri: randomCar.image }}
          />
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
            Which Ferrari model is that?
          </Text>
          <View
            style={{
              paddingHorizontal: 40,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 10
            }}
          >
            {['231', '3213', 'DSDsdadasd', '32131231', '2313123'].map(
              (item) => (
                <Pressable
                  key={item}
                  style={{
                    padding: 10,
                    borderWidth: 2,
                    borderBottomWidth: 4,
                    borderColor: '#37464f',
                    borderRadius: 12
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 20,
                      fontWeight: 600,
                      fontFamily: 'Nunito_700Bold'
                    }}
                  >
                    {item}
                  </Text>
                </Pressable>
              )
            )}
          </View>
        </View>
      </SafeAreaView>
    </>
  )
}

export function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ]
  }

  return array
}

export function getOtherAnswers<T>(
  array: T[],
  predicate: (arg: T) => boolean
): T[] {
  const result = []
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i])) {
      result.push(array[i])
    }
    if (result.length === 3) {
      break
    }
  }
  return result
}

export function getRandomElement<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)]
}

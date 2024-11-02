import { getOtherAnswers, shuffle } from './array'
import { cars } from './resources/cars'

export type Question = {
  image?: string
  title: string
  answers: string[]
  correctAnswer: number
}

function* whichModelQuestion(): Generator<Question> {
  const carsCopy = shuffle([...cars])

  while (carsCopy.length > 0) {
    const car = carsCopy.pop()

    if (!car) {
      return
    }

    const answers = shuffle([
      car.model,
      ...getOtherAnswers(carsCopy, (c) => c.make === car.make).map(
        (c) => c.model
      )
    ])

    const question: Question = {
      image: car.image,
      title: `Which ${car.make} model is that?`,
      answers,
      correctAnswer: answers.findIndex((answer) => answer === car.model)
    }

    yield question
  }
}

export const questions: Array<() => Generator<Question>> = [whichModelQuestion]

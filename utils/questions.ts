import { getRandomElement, getWrongAnswers, shuffle } from './array'
import { cars } from './resources/cars'

export type Question = {
  image?: string
  title: string
  answers: string[]
  correctAnswer: number
}

function questionGenerator<T extends { images: string[] }>(config: {
  resources: T[]
  getAnswerLabel: (resource: T) => string
  getTitle: (resource: T) => string
  canBeWrongAnswer: (currentAnswer: T, resource: T) => boolean
}) {
  return () => {
    const resource = shuffle([...config.resources]).pop()!

    const label = config.getAnswerLabel(resource)

    const answers = shuffle([
      label,
      ...getWrongAnswers(
        config.resources,
        (r) => r !== resource && config.canBeWrongAnswer(resource, r)
      ).map(config.getAnswerLabel)
    ])

    const question: Question = {
      image: getRandomElement(resource.images),
      title: config.getTitle(resource),
      answers,
      correctAnswer: answers.findIndex((answer) => answer === label)
    }

    return question
  }
}

const whichModelQuestion = questionGenerator({
  resources: cars,
  getTitle: (car) => `Which ${car.make} model is that?`,
  getAnswerLabel: (car) => car.model,
  canBeWrongAnswer: (altCar, correctCar) => altCar.make === correctCar.make
})

export const questions: Array<() => Question> = [whichModelQuestion]

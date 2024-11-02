import { getWrongAnswers, shuffle } from './array'
import { cars } from './resources/cars'

export type Question = {
  image?: string
  title: string
  answers: string[]
  correctAnswer: number
}

function* generateQuestion<T extends { image?: string }>(config: {
  resources: T[]
  getAnswerLabel: (resource: T) => string
  getTitle: (resource: T) => string
  canBeWrongAnswer: (currentAnswer: T, resource: T) => boolean
}) {
  const resources = shuffle([...config.resources])

  while (resources.length > 0) {
    const resource = resources.pop()

    if (!resource) {
      return
    }

    const label = config.getAnswerLabel(resource)

    const answers = shuffle([
      label,
      ...getWrongAnswers(
        config.resources,
        (r) => r !== resource && config.canBeWrongAnswer(resource, r)
      ).map(config.getAnswerLabel)
    ])

    const question: Question = {
      image: resource.image,
      title: config.getTitle(resource),
      answers,
      correctAnswer: answers.findIndex((answer) => answer === label)
    }

    yield question
  }
}

function whichModelQuestion(): Generator<Question> {
  return generateQuestion({
    resources: cars,
    getTitle: (car) => `Which ${car.make} model is that?`,
    getAnswerLabel: (car) => car.model,
    canBeWrongAnswer: (altCar, correctCar) => altCar.make === correctCar.make
  })
}

export const questions: Array<() => Generator<Question>> = [whichModelQuestion]

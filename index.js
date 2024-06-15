import { prompts } from "./prompts.js"

const shufflePrompts = () => {
  const closedList = structuredClone(prompts)
  const openList = []

  while (closedList.length > 0) {
    const randomIndex = Math.floor(Math.random() * closedList.length)

    openList.push(closedList[randomIndex])
    closedList.splice(randomIndex, 1)
  }

  prompts.splice(0, prompts.length)
  prompts.push(...openList)
}

shufflePrompts()

let viewedCardsCount = 0

/** @type {HTMLButtonElement} */
const cardButton = document.querySelector("#card")

/** @type {HTMLSpanElement} */
const cardsCounter = document.querySelector("#cards-counter")
/** @type {HTMLSpanElement} */
const viewedCounter = document.querySelector("#viewed-counter")

cardsCounter.innerText = prompts.length

const changeCardText = () => {
  cardButton.innerText = prompts[0]

  prompts.push(prompts[0])
  prompts.splice(0, 1)

  viewedCardsCount += 1
  viewedCounter.innerText = Math.min(100, Math.round(viewedCardsCount / prompts.length * 100))
  if (viewedCardsCount == prompts.length) {
    viewedCounter.style.color = "red"
  }
}

changeCardText()

cardButton.addEventListener("click", changeCardText)

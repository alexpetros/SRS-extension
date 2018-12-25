/* eslint import/prefer-default-export:0 */
import axios from 'axios'

const DEV_URL = 'http://localhost:9090'
const PROD_URL = 'https://srs-api.herokuapp.com'
const ROOT_URL = process.env.NODE_ENV === 'production' ? PROD_URL : DEV_URL

const DEFAULT_USER = 'apetros'

function preloadCardImage(card) {
  if (card && card.imageUrl) {
    const image = new Image()
    image.src = card.imageUrl
  }
}

export function getNextCard() {
  const user = DEFAULT_USER

  return axios.get(`${ROOT_URL}/api/${user}/card`)
    .then((res) => {
      preloadCardImage(res.data.card)
      return res.data.card
    })
}

export function getSecondCard() {
  const user = DEFAULT_USER

  return axios.get(`${ROOT_URL}/api/${user}/card/2`)
    .then((res) => {
      preloadCardImage(res.data.card)
      return res.data.card
    })
}

export function getRandomCard() {
  const user = DEFAULT_USER

  return axios.get(`${ROOT_URL}/api/${user}/random`)
    .then((res) => {
      preloadCardImage(res.data.card)
      return res.data.card
    })
}

export function sendCardResponse(cardId, performanceRating) {
  const user = DEFAULT_USER

  return axios.post(`${ROOT_URL}/api/${user}/card`, {
    cardId,
    performanceRating,
  })
}

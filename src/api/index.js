/* eslint import/prefer-default-export:0 */
import axios from 'axios'

const DEV_URL = 'http://localhost:9090'
const PROD_URL = 'https://srs-api.herokuapp.com'
const ROOT_URL = process.env.NODE_ENV === 'production' ? PROD_URL : DEV_URL

const DEFAULT_USER = 'apetros'

export function getNextCard() {
  const user = DEFAULT_USER

  return axios.get(`${ROOT_URL}/api/${user}`)
    .then((res) => {
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

/* eslint import/prefer-default-export:0 */
import axios from 'axios'

const ROOT_URL = 'http://localhost:9090'
const DEFAULT_USER = 'apetros'

export function getNextCard() {
  const user = DEFAULT_USER

  return axios.get(`${ROOT_URL}/api/${user}`).then((res) => {
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

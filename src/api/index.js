/* eslint import/prefer-default-export:0 */
import axios from 'axios'

const ROOT_URL = 'http://localhost:9090'

export function getNextCard() {
  return axios.get(`${ROOT_URL}/api`).then((res) => {
    return res.data.card
  })
}


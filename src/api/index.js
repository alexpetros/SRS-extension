/* eslint import/prefer-default-export:0 */
import axios from 'axios'

const DEV_URL = 'http://localhost:9090'
const PROD_URL = 'https://srs-api.herokuapp.com'
const ROOT_URL = process.env.NODE_ENV === 'production' ? PROD_URL : DEV_URL

function preloadCardImage(card) {
  if (card && card.imageUrl) {
    const image = new Image()
    image.src = card.imageUrl
  }
}

export function getUser(username) {
  return axios.get(`${ROOT_URL}/api/${username}`)
    .then((res) => {
      return res.data.user
    }).catch((err) => {
      // return null if user doesn't exist
      if (err.response.status === 400) {
        return null
      // throw other errors
      } else {
        throw err
      }
    })
}

export function createUser(username) {
  console.log('posting')
  return axios.post(`${ROOT_URL}/api/`, {
    username,
    email: '',
  }).then((res) => {
    return true
  }).catch((err) => {
    // return false if user already exists
    // theoretically, the login flow should make this impossible
    if (err.response.status === 400) {
      return false
      // throw other errors
    } else {
      throw err
    }
  })
}

export function getNextCard(user) {
  return axios.get(`${ROOT_URL}/api/${user}/card`)
    .then((res) => {
      preloadCardImage(res.data.card)
      return res.data.card
    })
}

export function getSecondCard(user) {
  return axios.get(`${ROOT_URL}/api/${user}/card/2`)
    .then((res) => {
      preloadCardImage(res.data.card)
      return res.data.card
    })
}

export function getRandomCard(user) {
  return axios.get(`${ROOT_URL}/api/${user}/random`)
    .then((res) => {
      preloadCardImage(res.data.card)
      return res.data.card
    })
}

export function sendCardResponse(user, cardId, performanceRating) {
  return axios.post(`${ROOT_URL}/api/${user}/card`, {
    cardId,
    performanceRating,
  })
}

/** returns true if the app should be frequently fetching notifications */
export function checkFrequentFetch(user) {
  return axios.get(`${ROOT_URL}/api/${user}/enableFetch`)
    .then((res) => {
      return res.data.enableFetch
    })
}

/* eslint no-unused-vars:0 import/no-webpack-loader-syntax:0 */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Unsplash, { toJson } from 'unsplash-js'

import './components/style.scss'

import { MemoryModule, MessageModule, LogonModule, NavBar } from './components'
import { getNextCard, getSecondCard, sendCardResponse } from './api'

require('expose-loader?API!./api/index.js')

// window.axios = require('axios')

const CONNECTION_REFUSED_MSG = 'Sorry, the server is not responsing.'
const FINISHED_MSG = 'All done!'

const unsplash = new Unsplash({
  applicationId: process.env.APP_ACCESS_KEY,
  secret: process.env.APP_SECRET,
  callbackUrl: '',
})

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentCard: null,
      nextCard: null,
      message: '',
      logon: false,
      // temporary default photo bc eduroam blows
      image: '../img/default-photo.jpeg',
      username: '',
    }

    // KL9IanHzSE4 - space
    // unsplash.photos.getPhoto('MAKllTW1ckw')
    //   .then(toJson)
    //   .then((res) => {
    //     this.setState({ image: res.urls.full })
    //   })
    this.sendResponse = this.sendResponse.bind(this)
    this.setLogon = this.setLogon.bind(this)
    this.loadFirstCard = this.loadFirstCard.bind(this)
    this.loadSecondCard = this.loadSecondCard.bind(this)
    this.sendResponse = this.sendResponse.bind(this)
  }

  componentDidMount() {
    chrome.storage.local.get(['username'], (result) => { // eslint-disable-line no-undef
      // if user is already logged in, load their cards
      if (result.username !== '') {
        this.setState({ username: result.username })
        this.loadFirstCard()
        this.loadSecondCard()
      // otherwise prompt them to log in
      } else {
        this.setState({ logon: true })
      }
    })
  }

  setLogon(logon, username) {
    // if you're entering the login screen, logout of current user
    if (logon) {
      this.setState({ logon, username: '', currentCard: null, nextCard: null })
      chrome.storage.local.set({ username: '' }, () => {}) // eslint-disable-line no-undef
    // if you're leaving the login screen, add the username to state
    } else {
      this.setState({ logon, username }, () => {
        // load cards in the callback, once username is set
        this.loadFirstCard()
        this.loadSecondCard()
      })
    }
  }

  loadFirstCard() {
    const { username } = this.state

    getNextCard(username)
      .then((card) => {
        const message = card ? '' : FINISHED_MSG
        // enable/disable background script here

        this.setState({ currentCard: card, message })
      })
      .catch((err) => {
        if (!err.response) {
          this.setState({ currentCard: null, message: CONNECTION_REFUSED_MSG })
        } else {
          this.setState({ currentCard: null, message: err.response })
        }
      })
  }

  loadSecondCard() {
    const { username } = this.state

    getSecondCard(username).then((card) => {
      this.setState({ nextCard: card })
    })
  }

  shiftCard() {
    const { nextCard, message } = this.state
    const nextMessage = nextCard ? message : FINISHED_MSG
    this.setState({ currentCard: nextCard, nextCard: null, message: nextMessage })
    this.loadSecondCard()
  }

  sendResponse(performanceRating) {
    const { username, currentCard } = this.state
    sendCardResponse(username, currentCard._id, performanceRating).then(() => {
      this.shiftCard()
    })
  }

  isBlurred() {
    // blur if you're logged out or there's cards left
    const { currentCard, username } = this.state
    return username === '' || currentCard !== null
  }

  render() {
    const { currentCard, image, message, logon, username } = this.state
    const backgroundClass = `background ${this.isBlurred() ? 'blurred' : ''}`
    const backgroundStlye = { backgroundImage: `url(${image})` || '' }

    let mainModule
    if (logon === true) {
      mainModule = <LogonModule setLogonState={this.setLogon} />
    } else if (currentCard) {
      mainModule = (
        <MemoryModule
          sendResponse={this.sendResponse}
          card={currentCard} />
      )
    } else if (message !== '') {
      mainModule = <MessageModule message={message} />
    }

    return (
      <>
        <div className={backgroundClass} style={backgroundStlye} />
        <div className="content">
          <NavBar username={username} onClick={() => { this.setLogon(true) }} />
          {mainModule}
        </div>
      </>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('main'))

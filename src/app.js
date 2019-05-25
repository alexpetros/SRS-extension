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
    }

    // KL9IanHzSE4 - space
    // unsplash.photos.getPhoto('MAKllTW1ckw')
    //   .then(toJson)
    //   .then((res) => {
    //     this.setState({ image: res.urls.full })
    //   })
    this.sendResponse = this.sendResponse.bind(this)
    this.setLogon = this.setLogon.bind(this)
  }

  componentDidMount() {
    this.loadFirstCard()
    this.loadSecondCard()
  }

  setLogon(logon) {
    this.setState({ logon })
  }

  loadFirstCard() {
    getNextCard()
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
    getSecondCard().then((card) => {
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
    const { currentCard } = this.state
    sendCardResponse(currentCard._id, performanceRating).then(() => {
      this.shiftCard()
    })
  }

  isBlurred() {
    const { currentCard } = this.state
    return currentCard !== null
  }

  render() {
    const { currentCard, image, message, logon } = this.state
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
          <NavBar onClick={() => { this.setLogon(true) }} />
          {mainModule}
        </div>
      </>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('main'))

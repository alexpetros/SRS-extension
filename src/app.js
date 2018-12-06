/* eslint no-unused-vars:0 */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Unsplash, { toJson } from 'unsplash-js'

import './components/style.scss'

import { MemoryModule, MessageModule } from './components'
import { getNextCard, sendCardResponse } from './api'

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
      message: '',
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
  }

  componentDidMount() {
    this.loadCard()
  }

  loadCard() {
    getNextCard()
      .then((card) => {
        const message = card ? '' : FINISHED_MSG
        this.setState({ currentCard: card, message })
      })
      .catch((err) => {
        if (!err.response) {
          this.setState({ currentCard: null, message: CONNECTION_REFUSED_MSG })
        } else {
          this.setState({ currentCard: null })
        }
      })
  }

  sendResponse(performanceRating) {
    const { currentCard } = this.state
    sendCardResponse(currentCard._id, performanceRating).then(() => {
      this.loadCard()
    })
  }

  isBlurred() {
    const { currentCard } = this.state
    return currentCard !== null
  }

  render() {
    const { currentCard, image, message } = this.state
    const backgroundClass = `background ${this.isBlurred() ? 'blurred' : ''}`
    const backgroundStlye = { backgroundImage: `url(${image})` || '' }

    let mainModule
    if (currentCard) {
      mainModule = (
        <MemoryModule
          sendResponse={this.sendResponse}
          card={currentCard} />
      )
    } else {
      mainModule = <MessageModule message={message} />
    }


    return (
      <>
        <div className={backgroundClass} style={backgroundStlye} />
        <div className="content">
          {mainModule}
        </div>
      </>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('main'))

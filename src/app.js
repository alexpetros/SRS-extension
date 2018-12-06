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
      isBlurred: true,
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
        this.setState({ currentCard: card })
      })
      .catch((err) => {
        if (!err.response) {
          this.setState({ currentCard: null, message: CONNECTION_REFUSED_MSG })
        } else {
          this.setState({ currentCard: null, message: FINISHED_MSG })
        }
      })
  }

  sendResponse(performanceRating) {
    const { currentCard } = this.state
    sendCardResponse(currentCard._id, performanceRating).then(() => {
      this.loadCard()
    })
  }

  render() {
    const { currentCard, image, isBlurred, message } = this.state
    const backgroundClass = `background ${isBlurred ? 'blurred' : ''}`
    const backgroundStlye = { backgroundImage: `url(${image})` || '' }

    let mainModule
    if (currentCard) {
      mainModule = <MemoryModule sendResponse={this.sendResponse} card={currentCard} />
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

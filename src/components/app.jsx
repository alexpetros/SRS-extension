/* eslint no-unused-vars:0 */
import React, { Component } from 'react'
import Unsplash, { toJson } from 'unsplash-js'
import MemoryModule from './memory-module'

import { getNextCard } from '../api/index'

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
      nextCard: null,
      // temporary default photo bc eduroam blows
      image: '../img/default-photo.jpeg',
    }

    // KL9IanHzSE4 - space
    // unsplash.photos.getPhoto('MAKllTW1ckw')
    //   .then(toJson)
    //   .then((res) => {
    //     this.setState({ image: res.urls.full })
    //   })

    this.onYesClick = this.onYesClick.bind(this)
    this.onNoClick = this.onNoClick.bind(this)
    this.onConfirmClick = this.onConfirmClick.bind(this)
  }

  componentDidMount() {
    getNextCard().then((card) => {
      this.setState({ currentCard: card })
    })
  }

  onYesClick() {
    const { nextCard } = this.state

    if (!nextCard) {
      this.setState({
        isBlurred: false,
        currentCard: null,
      })
    }
  }

  onNoClick() {
    const { currentCard } = this.state
    if (currentCard) {
      this.setState({ isBlurred: true })
    }
  }

  onConfirmClick() {
    const { nextCard } = this.state

    if (!nextCard) {
      this.setState({
        isBlurred: false,
        currentCard: null,
      })
    }
  }

  render() {
    const { currentCard, image, isBlurred } = this.state
    const backgroundClass = `background ${isBlurred ? 'blurred' : ''}`
    const backgroundStlye = { backgroundImage: `url(${image})` || '' }

    return (
      <>
        <div className={backgroundClass} style={backgroundStlye} />
        <div className="content">
          <MemoryModule
            onYesClick={this.onYesClick}
            onNoClick={this.onNoClick}
            onConfirmClick={this.onConfirmClick}
            card={currentCard} />
        </div>
      </>
    )
  }
}

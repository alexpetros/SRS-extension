/* eslint no-unused-vars:0 */
import React, { Component } from 'react'
import Unsplash, { toJson } from 'unsplash-js'
import MemoryModule from './memory-module'

const unsplash = new Unsplash({
  applicationId: process.env.APP_ACCESS_KEY,
  secret: process.env.APP_SECRET,
  callbackUrl: '',
})

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      locked: true,
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
  }

  onYesClick() {
    this.setState({ locked: false })
  }

  render() {
    const { image, locked } = this.state
    const backgroundClass = `background ${locked ? 'blurred' : ''}`
    const backgroundStlye = { backgroundImage: `url(${image})` || '' }

    return (
      <>
        <div className={backgroundClass} style={backgroundStlye} />
        <div className="content">
          <MemoryModule onYesClick={this.onYesClick} />
        </div>
      </>
    )
  }
}

// const testCards = [
//   {
//     title: 'Card #1',
//     content: 'Airspeed velocity of an unladen swallow',
//   },
//   {
//     title: 'Card #2',
//     content: 'Airspeed velocity of an unladen swallow',
//   },
//   {
//     title: 'Card #3',
//     content: 'Airspeed velocity of an unladen swallow',
//   },
//   {
//     title: 'Card #4',
//     content: 'Airspeed velocity of an unladen swallow',
//   },
// ]

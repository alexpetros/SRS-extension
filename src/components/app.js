import React, { Component } from 'react'
import Button from 'react-bootstrap/lib/Button'
import Unsplash, { toJson } from 'unsplash-js'

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
    }

    unsplash.photos.getPhoto('KL9IanHzSE4')
      .then(toJson)
      .then((res) => {
        this.setState({ image: res.urls.full })
      })

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
          <div>Other content</div>
          <Button onClick={this.onYesClick} bsStyle="primary">Unlock</Button>
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

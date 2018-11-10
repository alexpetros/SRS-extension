import React, { Component } from 'react'
import Button from 'react-bootstrap/lib/Button'
import Unsplash from 'unsplash-js'

const unsplash = new Unsplash({
  applicationId: process.env.APP_ACCESS_KEY,
  secret: process.env.APP_SECRET,
  callbackUrl: '',
})

export default class App extends Component {
  constructor(props) {
    super(props)

    this.testImage = unsplash.photos.getPhoto('ibpQdaorT8')
  }


  render() {
    const backgroundStlye = { background: `url(${this.testImage})` }

    return (
      <div className="background" style={backgroundStlye}>
        <Button bsStyle="primary">Primary</Button>
      </div>
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

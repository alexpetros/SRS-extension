import React, { Component } from 'react'
import { ButtonRow } from './buttons'

class MemoryModule extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayAnswer: false,
    }
  }

  render() {
    const { onYesClick } = this.props

    return (
      <div className="memory-module">
        <div>Other content</div>
        <ButtonRow onYesClick={onYesClick} />
      </div>
    )
  }
}

export default MemoryModule

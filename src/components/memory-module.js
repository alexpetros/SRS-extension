import React, { Component } from 'react'
import { ButtonRow } from './buttons'

class MemoryModule extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayAnswer: false,
      activeYes: false,
      activeNo: false,
    }

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
    document.addEventListener('keyup', this.handleKeyUp)
  }

  handleKeyDown(event) {
    switch (event.key) {
      case 'f':
        this.setState({ activeYes: true })
        this.props.setBlur(false)
        break
      case 'j':
        this.setState({ activeNo: true })
        this.props.setBlur(true)
        break
      default: break
    }
  }

  handleKeyUp(event) {
    switch (event.key) {
      case 'f':
        this.setState({ activeYes: false })
        break
      case 'j':
        this.setState({ activeNo: false })
        break
      default: break
    }
  }

  render() {
    const { onYesClick } = this.props
    const { activeYes, activeNo } = this.state

    return (
      <div className="memory-module">
        <div>Other content</div>
        <ButtonRow
          onYesClick={onYesClick}
          activeYes={activeYes}
          activeNo={activeNo}
        />
      </div>
    )
  }
}

export default MemoryModule

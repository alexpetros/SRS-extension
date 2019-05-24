import React, { Component } from 'react'
import Button from 'react-bootstrap/lib/Button'

export default class LogonModule extends Component {
  constructor(state) {
    super()

    this.state = {
      username: '',
    }

    this.handleChange = this.handleChange.bind(this)
  }

  submitUser(event) {
    const { setLogonState } = this.props

    // check if user exists

    // if it doesn't exist, offer to make it

    // if success
    // save username in local
    setLogonState(false)
  }

  handleChange(event) {
    this.setState({ username: event.target.value })
  }

  render() {
    const { username } = this.state
    return (
      <div className="logon-module">
        <div>Please enter a username</div>
        <div className="logon-entry">
          <input type="text" value={username} onChange={this.handleChange} />
          <Button bsStyle="primary">Enter</Button>
        </div>
      </div>
    )
  }
}


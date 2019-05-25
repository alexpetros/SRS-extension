import React, { Component } from 'react'
import Button from 'react-bootstrap/lib/Button'

import { getUser } from '../api'

const DEFAULT_MESSAGE = 'Please enter a username'
const NO_USER_MESSAGE = 'User does not exist. Create it?'

export default class LogonModule extends Component {
  constructor(state) {
    super()

    this.state = {
      message: DEFAULT_MESSAGE,
      username: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.submitUser = this.submitUser.bind(this)
  }

  submitUser(event) {
    event.preventDefault()
    const { setLogonState } = this.props
    const { username } = this.state

    // check if user exists
    getUser(username).then((user) => {
      console.log(user)
      if (user !== null) {
        setLogonState(false)
      } else {
        this.setState({ message: NO_USER_MESSAGE })
      }
    })
  }

  // if it doesn't exist, offer to make it

  // if success
  // save username in local

  handleChange(event) {
    this.setState({ username: event.target.value })
  }

  render() {
    const { message, username } = this.state
    return (
      <div className="logon-module">
        <div>{message}</div>
        <form onSubmit={this.submitUser} className="logon-entry">
          <input type="text" value={username} onChange={this.handleChange} />
          <Button bsStyle="primary" type="submit">Enter</Button>
        </form>
      </div>
    )
  }
}


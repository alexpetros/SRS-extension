import React, { Component } from 'react'
import Button from 'react-bootstrap/lib/Button'

import { getUser, createUser } from '../api'

const SIGNIN_MESSAGE = 'Please enter a username'
const CREATE_USER_MESSAGE = 'User does not exist. Create it?'

export default class LogonModule extends Component {
  constructor(state) {
    super()

    this.state = {
      isSignin: true,
      username: '',
    }

    this.handleTextChange = this.handleTextChange.bind(this)
    this.signinUser = this.signinUser.bind(this)
    this.createNewUser = this.createNewUser.bind(this)
    this.returnToLogin = this.returnToLogin.bind(this)
  }

  signinUser(event) {
    event.preventDefault()
    const { setLogonState } = this.props
    const { username } = this.state

    // check if user exists
    getUser(username).then((user) => {
      if (user !== null) {
        chrome.storage.local.set({ username }, () => { // eslint-disable-line no-undef
          console.log(`User is set to ${username}`)
          setLogonState(false, username)
        })
      } else {
        this.setState({ isSignin: false })
      }
    })
  }

  createNewUser(event) {
    event.preventDefault()
    const { username } = this.state
    const { setLogonState } = this.props

    // since you only see this if the user doesn't exist
    // there shouldn't be any issues with duplicate users
    createUser(username).then(() => {
      setLogonState(false, username)
    })
  }

  returnToLogin(event) {
    this.setState({ isSignin: true, username: '' })
  }

  handleTextChange(event) {
    this.setState({ username: event.target.value })
  }

  render() {
    const { isSignin, username } = this.state

    const signinModule = (
      <div className="logon-module">
        <div className="logon-message">{SIGNIN_MESSAGE}</div>
        <form onSubmit={this.signinUser} className="logon-entry">
          <input type="text" value={username} onChange={this.handleTextChange} />
          <Button bsStyle="primary" type="submit">Enter</Button>
        </form>
      </div>
    )

    const createModule = (
      <div className="logon-module">
        <div className="logon-message">{CREATE_USER_MESSAGE}</div>
        <form onSubmit={this.createNewUser} onReset={this.returnToLogin} className="logon-entry">
          <input type="text" value={username} onChange={this.handleTextChange} />
          <Button bsStyle="primary" type="submit">Create User</Button>
          <Button bsStyle="danger" type="reset">Cancel</Button>
        </form>
      </div>
    )

    // const

    if (isSignin) {
      return signinModule
    } else {
      return createModule
    }
  }
}


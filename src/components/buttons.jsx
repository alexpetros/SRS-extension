/* eslint import/prefer-default-export:0 react/jsx-one-expression-per-line:0 */
import React, { Component } from 'react'
import Button from 'react-bootstrap/lib/Button'

///////////////////////////////
// Generic stated button row //
///////////////////////////////

class ButtonRow extends Component {
  // props.buttons is an array of buttons with the following properties:
  // { text, key, onClick, style }
  constructor(props) {
    super(props)

    this.state = {
      activeKey: '',
    }
    this.enabledKeys = props.buttons.map(button => button.key)

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  componentDidMount() {
    // listeners need to be document-wide
    document.addEventListener('keydown', this.handleKeyDown)
    document.addEventListener('keyup', this.handleKeyUp)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
    document.removeEventListener('keyup', this.handleKeyUp)
  }

  handleKeyDown(event) {
    const { activeKey } = this.state
    const isEnabled = this.enabledKeys.includes(event.key)

    if (isEnabled && activeKey === '') {
      this.setState({ activeKey: event.key })
    }
  }

  /** remove press-down effect and call appropriate container method */
  handleKeyUp(event) {
    const { activeKey } = this.state
    const { buttons } = this.props

    if (event.key === activeKey) {
      // onClick in the callback ensures that the component doesn't unmount first
      const activeButton = buttons.find(button => button.key === event.key)
      this.setState({ activeKey: '' }, activeButton.onClick)
    }
  }

  render() {
    const { activeKey } = this.state
    const { buttons } = this.props

    const buttonsRow = buttons.map((button) => {
      return (
        <Button
          bsStyle={button.style}
          onClick={button.onClick}
          active={button.key === activeKey}
          key={button.key}>
          {button.text}
        </Button>
      )
    })
    const buttonLabels = buttons.map((button) => {
      const { key } = button
      const keyLabel = key === ' ' ? 'Space' : key.toUpperCase()

      return <div key={key}>({keyLabel})</div>
    })

    return (
      <div className="button-row-container">
        <div className="button-row">{buttonsRow}</div>
        <div className="button-row">{buttonLabels}</div>
      </div>
    )
  }
}

///////////////////////////
// Button layout presets //
///////////////////////////

/** Initial response options */
export const AnswerButtonRow = (props) => {
  const { onYesClick, onNoClick } = props
  const buttons = [
    {
      text: 'No',
      key: 'f',
      onClick: onNoClick,
      style: 'danger',
    },
    {
      text: 'Yes',
      key: 'j',
      onClick: onYesClick,
      style: 'primary',
    },
  ]
  return <ButtonRow buttons={buttons} />
}

/** Options if 'no' is selected */
export const FailureButtonRow = (props) => {
  const { onClick } = props
  const buttons = [
    {
      text: 'Got it',
      key: ' ',
      onClick,
      style: 'success',
    },
  ]
  return <ButtonRow buttons={buttons} />
}

/** Options if 'yes' is selected */
export const SuccessButtonRow = (props) => {
  const { onLowClick, onMedClick, onHighClick } = props
  const buttons = [
    {
      text: 'Barely',
      key: 'f',
      onClick: onLowClick,
      style: 'danger',
    },
    {
      text: 'Pretty well',
      key: ' ',
      onClick: onMedClick,
      style: 'warning',
    },
    {
      text: 'Perfectly',
      key: 'j',
      onClick: onHighClick,
      style: 'success',
    },
  ]
  return <ButtonRow buttons={buttons} />
}


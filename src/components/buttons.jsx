/* eslint import/prefer-default-export: 0 */
import React from 'react'
import Button from 'react-bootstrap/lib/Button'

export const AnswerButtonRow = (props) => {
  const { onYesClick, activeYes, activeNo } = props

  return (
    <div className="button-row-container">
      <div className="button-row">
        <Button
          bsStyle="primary"
          onClick={onYesClick}
          active={activeYes}>
          Yes
        </Button>
        <Button
          bsStyle="danger"
          onClick={onYesClick}
          active={activeNo}>
          No
        </Button>
      </div>
      <div className="button-row">
        <div>(F)</div>
        <div>(J)</div>
      </div>
    </div>
  )
}

export const ConfirmButtonRow = (props) => {
  const { onClick, active } = props

  return (
    <div>
      <div className="button-row">
        <Button
          bsStyle="success"
          onClick={onClick}
          active={active}>
          Got it
        </Button>
      </div>
      <div className="button-row">
        <div>(Any key)</div>
      </div>
    </div>
  )
}


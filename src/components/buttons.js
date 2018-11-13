/* eslint import/prefer-default-export: 0 */
import React from 'react'
import Button from 'react-bootstrap/lib/Button'


export const ButtonRow = (props) => {
  const { onYesClick } = props

  return (
    <div className="button-row-container">
      <div className="button-row">
        <Button onClick={onYesClick} bsStyle="primary">Yes</Button>
        <Button onClick={onYesClick} bsStyle="danger">No</Button>
      </div>
      <div className="button-row">
        <div>(F)</div>
        <div>(J)</div>
      </div>
    </div>
  )
}

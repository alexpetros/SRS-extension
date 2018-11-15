import React from 'react'

const ContentCard = (props) => {
  const { content, answer, displayAnswer } = props
  const hiddenClass = displayAnswer ? '' : 'hidden'

  return (
    <div className="card-container">
      <div className="card-content">{content}</div>
      <div className={`card-answer ${hiddenClass}`}>{answer}</div>
    </div>
  )
}

export default ContentCard

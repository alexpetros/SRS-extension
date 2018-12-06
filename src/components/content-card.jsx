import React from 'react'

const ContentCard = (props) => {
  const { content, answer, imageUrl, displayAnswer } = props
  const image = imageUrl ? <img src={imageUrl} alt={content} /> : null

  const hiddenAnswer = displayAnswer ? '' : 'isHidden'

  return (
    <div className="card-container">
      <div className="card-content">{content}</div>
      <div className={`card-answer ${hiddenAnswer}`}>{answer}</div>
      {image}
    </div>
  )
}

export default ContentCard

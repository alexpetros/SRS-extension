import React from 'react'

const ContentCard = (props) => {
  const { content, answer, imageUrl, displayAnswer } = props
  const hiddenClass = displayAnswer ? '' : 'isHidden'
  const image = imageUrl ? <img src={imageUrl} alt={content} /> : null

  return (
    <div className="card-container">
      <div className="card-content">{content}</div>
      <div className={`card-answer ${hiddenClass}`}>{answer}</div>
      {image}
    </div>
  )
}

export default ContentCard

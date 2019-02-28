/** returns a stop time 5min from now if you've seen a learning phase */
function getRefreshStopTime(card) {
  let refreshStopTime = this.state.refreshStopTime

  // reset it if we say another learning-phase card
  if (card.learningCount > -1) {
    refreshStopTime = new Date()
    resfreshStopTime.setMinutes(refreshStopTime.getMinutes() + 5)
  }

  return refreshStopTime
}

// start and stop listener

// send notification

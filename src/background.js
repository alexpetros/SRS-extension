/* eslint-disable no-undef */
const SHORT_DELAY = 5
const LONG_DELAY = 30

// for (var item in window) {
//     console.log(item)
// }

function sendNotification() {
  console.log('sent notification')
}

function setAlarm() {
  API.checkFrequentFetch().then((enableFetch) => {
    if (enableFetch === true) {
      chrome.alarms.create('notification', { delayInMinutes: SHORT_DELAY })
    } else {
      chrome.alarms.create('notification', { delayInMinutes: LONG_DELAY })
    }
    console.log(`enableFetch is: ${enableFetch}`)
  })
}

function notificationAlarm(alarm) {
  console.log(alarm)

  API.getNextCard().then((card) => {
    if (card) {
      sendNotification()
    }
    // not that the alarm has gone off, reset it
    setAlarm()
  })
}

/**** runs on start ****/
chrome.alarms.onAlarm.addListener(notificationAlarm)
setAlarm()


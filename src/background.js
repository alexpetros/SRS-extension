/* eslint-disable no-undef */
const SHORT_DELAY = 1
const LONG_DELAY = 30

// for (var item in window) {
//     console.log(item)
// }

function sendNotification() {
  console.log('sending notifications')
  chrome.notifications.create('reminder', {
    type: 'basic',
    iconUrl: 'img/get_started128.png',
    title: 'Don\'t forget!',
    message: 'You have cards pending!',
  }, (notificationId) => {})
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
// chrome.notifications.onClicked.addListener(() => {

// })
setAlarm()


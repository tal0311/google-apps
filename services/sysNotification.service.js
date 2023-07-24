

export const notificationService = {
 notifyUser

}
async function notifyUser(txt = 'Reminder', appName = 'apps') {
 if (!("Notification" in window)) {
  alert("This browser does not support desktop notification");
  return

 }
 if (Notification.permission === "denied") {
  alert("Notification permission denied");
  return
 }
 if (Notification.permission !== "denied" || Notification.permission === "granted") {
  const permission = await Notification.requestPermission()
  if (permission === "granted") {
   const app = getAppProps(appName)
   const title = app.title
   const options = {
    body: txt,
    icon: app.url
   }
   const notification = new Notification(title, options)

   setTimeout(() => {
    notification.close()
   }, 8000)
  }
 }
}

function getAppProps(appName) {
 const iconsUrls = {
  apps: {
   url: '',
   title: 'Google Apps',
   bgc: 'var(--Mclr5)'
  },
  keep: {
   url: '/assets/img/keep.png',
   title: 'Google Keep',
   bgc: 'var(--Mclr5)'
  },
  gmail: {
   url: '/assets/img/gmail.ico',
   title: 'Gmail',
   bgc: 'var(--Mclr1)'
  },
  youtube: {
   url: '/assets/img/yt.ico',
   title: 'YouTube',
   bgc: 'var(--Mclr5)'
  }
 }
 return iconsUrls[appName]
}


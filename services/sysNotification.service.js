

export const notificationService = {
 notifyUser

}
async function notifyUser(txt = 'Reminder', appName = 'apps') {
 if (!("Notification" in window)) {
  alert("This browser does not support desktop notification");
 } else if (Notification.permission === "granted") {
  const notification = new Notification(txt);
 } else if (Notification.permission !== "denied") {
  const permission = await Notification.requestPermission()
  if (permission === "granted") {
   const app = getIcon(appName)
   const title = app.title
   const options = {
    body: txt,
    icon: app.url
   }
   const notification = new Notification(title, options)

   setTimeout(() => {
    notification.close()
   }, 3000)
  }
 }
}

function getIcon(appName) {
 const iconsUrls = {
  apps: {
   url: '',
   title: 'Google-Apps',
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


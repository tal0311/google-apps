export const shareService = {
 shareTo
}

function shareTo(platform, data) {
 if (isMobile()) {
  navigator.share({
   title: 'Check this video',
   text: 'Check this video',

  })

  return
 }
 const url = _getPlatform(platform)
 if (!url) throw new Error('No such platform')
 window.open(url + data, '_blank')
}

function _getPlatform(platform) {
 const opts = {
  whatsapp: 'https://wa.me/?text=',
  facebook: 'https://www.facebook.com/sharer/sharer.php?u=',
  twitter: 'https://twitter.com/intent/tweet?text=',
  gmail: 'https://mail.google.com/mail/?view=cm&fs=1&to=&su=Check this video&body=',
  email: 'mailto:?subject=Check this video&body='
 }
 return opts[platform]
}

function isMobile() {
 if (navigator.userAgentData.mobile || navigator.maxTouchPoints > 1) {
  return true
 }
 return false
}
export const shareService = {
 shareTo,
 isMobile,
 shareToMobile
}

const defaultMsg = 'Check this video '
function shareTo(platform, data) {
 const url = _getPlatform(platform)
 if (!url) throw new Error('No such platform')
 window.open(url + data, '_blank')
}

function _getPlatform(platform) {

 const opts = {
  whatsapp: `https://wa.me/?text=${defaultMsg}`,
  facebook: 'https://www.facebook.com/sharer/sharer.php?u=',
  twitter: `https://twitter.com/intent/tweet?text=${defaultMsg}&url=`,
  gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${defaultMsg}&body=`,
  email: `mailto:?subject=${defaultMsg}&body=`
 }
 return opts[platform]
}

function isMobile() {
 if (navigator.userAgentData.mobile || navigator.maxTouchPoints > 1) {
  return true
 }
 return false
}

function shareToMobile(data) {
 navigator.share({
  title: defaultMsg,
  text: data,

 })
}
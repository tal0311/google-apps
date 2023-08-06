export const shareService = {
 shareTo
}

function shareTo(platform, data) {
 const url = _getPlatform(platform)
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
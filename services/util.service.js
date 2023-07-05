export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    loadFromStorage,
    saveToStorage,
    getDayName,
    getMonthName,
    animateCSS,
    setFavIcon: setAppConfig,
    getFormattedDate
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}


function getDayName(date, locale) {
    date = new Date(date)
    return date.toLocaleDateString(locale, { weekday: 'long' })
}

function getFormattedDate(ts) {
    const date = new Date(ts).toDateString().split(' ')
    return { month: date[1], day: date[2] }
}

function getMonthName(date) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]
    return monthNames[date.getMonth()]
}
function animateCSS(el, animation) {
    return new Promise(resolve => {

        const animationName = `animate__${animation}`
        el.classList.add(`animate__animated`, animationName)
        el.addEventListener('animationend', handleAnimationEnd, { once: true })

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            event.stopPropagation()
            el.classList.remove(`${prefix}animated`, animationName)
            resolve('Animation ended')
        }
    })
}

function setAppConfig(app) {

    const iconsUrls = {
        keep: {
            url: 'https://ssl.gstatic.com/keep/keep_2020q4v2.ico',
            title: 'Google Keep',
            bgc: 'var(--Mclr5)'
        },
        gmail: {
            url: 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico',
            title: 'Gmail',
            bgc: 'var(--Mclr1)'
        },
        youtube: {
            url: 'https://www.youtube.com/s/desktop/afaf5292/img/favicon.ico',
            title: 'YouTube',
            bgc: 'var(--Mclr5)'
        }
    }
    const linkElement = document.createElement('link');
    linkElement.rel = 'shortcut icon';
    linkElement.href = iconsUrls[app].url;
    linkElement.type = 'image/x-icon';
    document.head.appendChild(linkElement);
    document.title = iconsUrls[app].title
    document.body.style.background = iconsUrls[app].bgc
}
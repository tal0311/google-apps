import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const YT_KEY = 'youtube_db'
const YT_API_KEY = 'AIzaSyBlraKlFpF_bqQQopUoLpyPuy2Bv57kgyo'

export const youtubeService = {
    query,
}

window.youtubeService = youtubeService

async function query({ searchTerm }) {

    const cache = utilService.loadFromStorage(YT_KEY) || {}

    if (cache[searchTerm]) return cache[searchTerm]

    const YT_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YT_API_KEY}&q=${searchTerm}&maxResults=10`
    const WIKI_URL = `https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&srsearch=${searchTerm}&format=json`

    const res = await axios.all([axios.get(YT_URL), axios.get(WIKI_URL)])
    const [res1, res2] = res

    const videosData = _prepVideosData(res1.data)
    const wikiData = _prepWikiData(res2.data)

    cache[searchTerm] = { videosData, wikiData }
    utilService.saveToStorage(YT_KEY, cache)
    return { videosData, wikiData }
}

function _prepVideosData({ items }) {
    return items.map((item) => {
        return {
            id: item.id.videoId,
            title: item.snippet.title,
            cover: item.snippet.thumbnails.high.url,
            desc: item.snippet.description,
            publishedAt: item.snippet.publishedAt,
            channel: item.snippet.channelTitle,
        }
    })
}

function _prepWikiData({ query: { search: items } }) {
    return items.map((item) => {
        return {
            id: item.pageid,
            title: item.title,
            desc: item.snippet,

        }
    })
}

/*
function get(mailId) {
    return storageService.getById(MAIL_KEY, mailId).then(mail => mail)
}

function _setNextPrevMailId(mail) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            const carIdx = mails.findIndex(currMail => currMail.id === mail.id)
            mail.nextMailId = mails[carIdx + 1] ? mails[carIdx + 1].id : mails[0].id
            mail.prevMailId = mails[carIdx - 1]
                ? mails[carIdx - 1].id
                : mails[cars.length - 1].id
            return mail
        })
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getNextMailId(mailId) {
    return storageService.query(MAIL_KEY).then(mails => {
        var idx = mails.findIndex(mail => mail.id === mailId)
        if (idx === mails.length - 1) idx = -1
        return cars[idx + 1].id
    })
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        mails.push(_createMail(utilService.makeLorem(10), utilService.makeLorem(20), Date.now()))
        mails.push(_createMail(utilService.makeLorem(10), utilService.makeLorem(20), Date.now()))
        mails.push(_createMail(utilService.makeLorem(10), utilService.makeLorem(20), Date.now()))
        mails.push(_createMail(utilService.makeLorem(10), utilService.makeLorem(20), Date.now()))
        mails.push(_createMail(utilService.makeLorem(10), utilService.makeLorem(20), Date.now()))
        mails.push(_createMail(utilService.makeLorem(10), utilService.makeLorem(20), Date.now()))
        mails.push(_createMail(utilService.makeLorem(10), utilService.makeLorem(20), Date.now()))
        mails.push(_createMail(utilService.makeLorem(10), utilService.makeLorem(20), Date.now()))
        mails.push(_createMail(utilService.makeLorem(10), utilService.makeLorem(20), Date.now()))
        mails.push(_createMail(utilService.makeLorem(10), utilService.makeLorem(20), Date.now()))
        mails.push(_createMail(utilService.makeLorem(10), utilService.makeLorem(20), Date.now()))
        mails.push(_createMail(utilService.makeLorem(10), utilService.makeLorem(20)))
        mails.push(_createMail(utilService.makeLorem(10), utilService.makeLorem(20)))
        mails.push(_createMail(utilService.makeLorem(10), utilService.makeLorem(20)))
        mails.push(_createMail(utilService.makeLorem(10), utilService.makeLorem(20)))
        mails.push(_createMail(utilService.makeLorem(10), utilService.makeLorem(20)))
        mails.push(_createMail(utilService.makeLorem(10), utilService.makeLorem(20)))
        mails.push(_createMail(utilService.makeLorem(10), utilService.makeLorem(20)))

        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(subject, body, sentAt = null) {
    const mail = getEmptyMail(subject, body, sentAt)
    mail.id = utilService.makeId()
    return mail
}


function getEmptyMail(subject, body, sentAt) {
    return {
        subject,
        body,
        isRead: false,
        sentAt,
        removedAt: Math.random() > 0.5 ? null : Date.now(),
        from: 'momo@momo.com',
        to: 'user@appsus.com',
        isStared: Math.random() > 0.9 ? true : false,
        snoozedAt: Math.random() > 0.7 ? Date.now() : null,
        createdAt: Date.now(),
        label: Math.random() > 0.7 ? 'label 1' : 'new'
    }
}
*/
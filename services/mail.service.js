import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const PAGE_SIZE = 5
const MAIL_KEY = 'mail_db'

var gFilterBy = { txt: '', minSpeed: 0 }
var gSortBy = { vendor: 1 }
var gPageIdx

_createMails()

export const carService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getNextMailId,
    getFilterBy,
    setFilterBy,
    getMailCountBySpeedMap,
}
window.carService = carService

function query() {
    return storageService.query(MAIL_KEY).then(mails => {
        if (gFilterBy.txt) {
            const regex = new RegExp(gFilterBy.txt, 'i')
            mails = mails.filter(mail => regex.test(mail.vendor))
        }
        if (gFilterBy.minSpeed) {
            mails = mails.filter(mail => mail.maxSpeed >= gFilterBy.minSpeed)
        }
        if (gPageIdx !== undefined) {
            const startIdx = gPageIdx * PAGE_SIZE
            mails = mails.slice(startIdx, startIdx + PAGE_SIZE)
        }
        if (gSortBy.maxSpeed !== undefined) {
            mails.sort(
                (c1, c2) => (c1.maxSpeed - c2.maxSpeed) * gSortBy.maxSpeed
            )
        } else if (gSortBy.vendor !== undefined) {
            mails.sort(
                (c1, c2) => c1.vendor.localeCompare(c2.vendor) * gSortBy.vendor
            )
        }

        return mails
    })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
        .then(mail => _setNextPrevMailId(mail))
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

function getEmptyMail(vendor = '', maxSpeed = 0) {
    return { id: '', vendor, maxSpeed }
}

function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
    return gFilterBy
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
        mails.push(_createMail('audu', 300))
        mails.push(_createMail('fiak', 120))
        mails.push(_createMail('subali', 100))
        mails.push(_createMail('mitsu', 150))
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(vendor, maxSpeed = 250) {
    const mail = getEmptyMail(vendor, maxSpeed)
    mail.id = utilService.makeId()
    return mail
}

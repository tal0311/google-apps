import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { eventBus } from './event-bus.service.js'

const PAGE_SIZE = 5
const MAIL_KEY = 'mail_db'


var gSortBy = { vendor: 1 }
var gPageIdx

_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    updateMany,
    getMailCount
}
window.mailService = mailService

async function query(filterBy = { tab: 'inbox', txt: '' }) {
    let mails = await storageService.query(MAIL_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        mails = mails.filter(mail => regex.test(mail.subject) || regex.test(mail.body) || regex.test(mail.from))
    }
    if (filterBy.label) {
        return mails = mails.filter(mail => mail.label === filterBy.label)
    }
    if (filterBy.tab === 'inbox') mails = mails.filter(mail => mail.sentAt && !mail.removedAt)
    if (filterBy.tab === 'draft') mails = mails.filter(mail => !mail.sentAt)
    if (filterBy.tab === 'trash') mails = mails.filter(mail => mail.removedAt)
    if (filterBy.tab === 'starred') mails = mails.filter(mail => mail.isStared)
    if (filterBy.tab === 'Snoozed') mails = mails.filter(mail => mail.snoozedAt)
    if (filterBy.tab === 'sent') mails = mails.filter(mail => mail.sentAt)

    return mails
}

async function getMailCount() {
    const mails = await storageService.query(MAIL_KEY)
    const inboxCount = mails.filter(m => !m.isRead && !m.sentAt).length
    console.log('const inboxCount = mails.filter(m => !m.isRead):', inboxCount)
    const draftCount = mails.filter(m => !m.sentAt).length
    eventBus.emit('get-count', { count: inboxCount, tab: 'inbox' })
    eventBus.emit('get-count', { count: draftCount, tab: 'draft' })
}

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

async function updateMany(selectedItems, action) {
    let mails = await storageService.query(MAIL_KEY)
    if (action === 'remove') {
        mails = mails.filter(mail => !selectedItems.includes(mail.id))
        return Promise.resolve(utilService.saveToStorage(MAIL_KEY, mails))
    }
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

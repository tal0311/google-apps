import MailPreview from "./MailPreview.js"
import { eventBus, showSuccessMsg } from "./../../../services/event-bus.service.js"
import { utilService } from "./../../../services/util.service.js"
import { userService } from "../../../services/user.service.js"
import { mailService } from "../../../services/mail.service.js"


export default {
  name: 'MailList',
  template: `
          <section class="list-container">
           <section class="list-actions">
            <button>unread</button>
            <input type="checkbox" name="" id="" />
           </section>
            <section v-if="mails" class="mail-list grid">
              
              <MailPreview v-for="mail in mails" :key="mail.id" :mail="mail"
              @update-mail="updateMail"
              />
            </section>
          </section>
    `,

  created() {
    this.loadMails()
    eventBus.on('mail-filter', this.setFilter)
  },
  data() {
    return {
      mails: null,
      filterBy: { tab: 'inbox' }
    }
  },
  methods: {
    loadMails() {
      eventBus.emit('loading', true)
      mailService.query({ ...this.filterBy }).then(mails => {
        // debugger
        this.setAppTitle(mails)
        this.mails = mails
        eventBus.emit('loading', false)
      })
    },
    setFilter(filterBy) {
      this.filterBy = { ...this.filterBy, ...filterBy }
      this.loadMails()
    },
    setAppTitle(mails) {
      const loggedUser = userService.getLoggedInUser()
      const { tab } = this.filterBy
      if (!tab) return
      let title = ''
      let extraInfo = ''
      if (tab === 'inbox') {
        const count = mails.filter(m => !m.isRead).length
        title = 'Inbox'
        extraInfo = `(${count})`
      }
      if (tab === 'draft') {
        const count = mails.filter(m => !m.sentAt).length
        title = `Drafts (${count}) -`
        extraInfo = `${loggedUser.username}`
        eventBus.emit('get-count', { count, tab })
      }
      if (tab !== 'inbox' && tab !== 'draft') {

        title = tab.substring(0, 1).toLocaleUpperCase() + tab.substring(1) + ' Mail -'
        extraInfo = `${loggedUser.username}`

      }

      this.countMails(mails)
      utilService.setAppConfig('gmail', `${title}  ${extraInfo}`)
    },
    countMails(mails) {
      const inboxCount = mails.filter(m => !m.isRead).length
      const draftCount = mails.filter(m => !m.sentAt).length
      eventBus.emit('get-count', { count: inboxCount, tab: 'inbox' })
      eventBus.emit('get-count', { count: draftCount, tab: 'draft' })
    },
    updateMail({ action, mailId }) {
      console.debug('♠️ ~ file: MailList.js:72 ~ updateMail ~ action, mailId:', action, mailId)
      // })
      let mail = this.mails.find(m => m.id === mailId)
      // console.debug('♠️ ~ file: MailList.js:77 ~ updateMail ~ mail:', mail)
      let msg = ''
      if (action === 'star') {
        mail.isStared = !mail.isStared
        msg = mail.isStared ? 'Mail was awarded a star' : 'Mail was un starred'
      }

      if (action === 'toggleArchive') {
        if (mail.removedAt) {
          this.removeMail(mailId)
          return
        }
        mail.removedAt = Date.now()
        msg = 'Conversation was moved to archive'

      }
      if (action === 'schedule') {
        console.log('action:', action)
        mail.snoozedAt = mail.snoozedAt ? null : Date.now()
        msg = 'Conversation was scheduled a reminder'
      }


      mailService.save({ ...mail }).then(() => {
        // console.log('msg:', msg)
        // throw new Error()
        if (!msg) return
        showSuccessMsg(msg)
      }).catch(() => showSuccessMsg('we are having problem completing your request'))
        .finally(this.loadMails)

    },
    removeMail(mailId) {
      mailService.remove(mailId).then(() => {
        showSuccessMsg('conversation was permanently deleted')
      }).catch(() => showSuccessMsg('we are having problem completing your request'))
        .finally(this.loadMails)
    }
  },
  computed: {

  },
  watch: {
    '$route.query': {
      deep: true,
      immediate: true,
      handler: function (val, oldVal) {
        this.setFilter({ tab: val.tab, label: val.label })

      }
    },
  },
  components: {
    MailPreview
  },
}
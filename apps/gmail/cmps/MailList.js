import MailPreview from "./MailPreview.js"
import MailActions from "./MailActions.js"
import { eventBus, showSuccessMsg } from "./../../../services/event-bus.service.js"
import { utilService } from "./../../../services/util.service.js"
import { userService } from "../../../services/user.service.js"
import { mailService } from "../../../services/mail.service.js"


export default {
  name: 'MailList',
  inject: ['defaultErrorMsg'],
  template: `
          <section class="list-container">
            <section class="list-actions">
             <MailActions @mail-action="selectedMailsUpdate" v-if="isSelected ||selectedMails.length "/>
             <input type="checkbox" name="select-all" v-model="isSelected" id="" />
            <button>unread</button>
           </section>
            <section v-if="mails" class="mail-list grid">
              
              <MailPreview v-for="mail in mails" :key="mail.id" :mail="mail"
              @update-mail="updateMail"
              @select-mail="selectMail"
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
      isSelected: false,
      selectedMails: [],
      filterBy: { tab: 'inbox' }
    }
  },
  methods: {
    selectMail({ mailId }) {
      console.log('mailId:', mailId)
      const mail = this.mails.find(m => m.id === mailId)
      if (this.selectedMails.includes(mailId)) {
        this.selectedMails.splice(this.selectedMails.indexOf(mail.id), 1)

        mail.isSelected = false
      } else {
        this.selectedMails.push(mail.id)
        mail.isSelected = true

      }
    },
    selectMails(val) {
      this.mails.forEach(mail => {
        mail.isSelected = val
      })

      if (val) {
        this.selectedMails = this.mails.filter(m => m.isSelected).map(m => m.id)
      } else {
        this.selectedMails = []
      }

    },
    async loadMails() {
      eventBus.emit('loading', true)
      const mails = await mailService.query({ ...this.filterBy })
      this.setAppTitle(mails)
      this.mails = mails
      eventBus.emit('loading', false)

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
    async selectedMailsUpdate(action) {
      await mailService.updateMany([...this.selectedMails], action).catch(() => showSuccessMsg(defaultErrorMsg))

      showSuccessMsg('Action completed')
      this.selectMails(false)
      this.isSelected = false
      this.loadMails()

    },
    async updateMail({ action, mailId }) {

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
          // return Promise.resolve()
        }
        mail.removedAt = Date.now()
        msg = 'Conversation was moved to archive'

      }

      if (action === 'schedule') {
        console.log('action:', action)
        mail.snoozedAt = mail.snoozedAt ? null : Date.now()
        msg = 'Conversation was scheduled a reminder'
      }


      if (mail.isSelected) {
        delete mail.isSelected
      }
      try {
        await mailService.save({ ...mail })
        showSuccessMsg(msg)

        if (!msg) return
      } catch (error) {
        showSuccessMsg(this.defaultErrorMsg)
      }
      finally {
        this.loadMails()

      }


    },
    async removeMail(mailId) {
      try {
        mailService.remove(mailId)
        showSuccessMsg('conversation was permanently deleted')

      } catch (error) {
        console.debug('♠️ ~ file: MailList.js:172 ~ removeMail ~ error:', error)
        showSuccessMsg(this.defaultErrorMsg)
      }
      finally {
        this.loadMails()

      }
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

      },

    },
    'isSelected': {
      deep: false,
      immediate: false,
      handler: function (val, oldVal) {
        console.log('val, oldVal:', val, oldVal)
        console.log('val:', val)
        if (val) {
          this.selectMails(true)
        } else {
          this.selectMails(false)
        }
      }
    }
  },
  components: {
    MailPreview,
    MailActions
  },
}
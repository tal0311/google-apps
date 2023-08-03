import MailPreview from "./MailPreview.js"
import MailActions from "./MailActions.js"
import { eventBus, showSuccessMsg } from "./../../../services/event-bus.service.js"
import { utilService } from "./../../../services/util.service.js"
import { userService } from "../../../services/user.service.js"
import { mailService } from "../../../services/mail.service.js"
import { storageService } from "../../../services/async-storage.service.js"


export default {
  name: 'MailList',
  inject: ['defaultErrorMsg'],
  template: `
          <section class="list-container">
            <section class="list-actions">
             <MailActions @mail-action="selectedMailsUpdate" v-if="isSelected ||selectedMails.length "/>
             <div class="header-actions grid">
               <input type="checkbox" name="select-all" v-model="isSelected" id="" />
               <button @click="filterUnread">unread</button>
              </div>
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
    this.unsubscribe = eventBus.on('mail-filter', this.setFilter)
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
      this.setAppTitle()
      this.mails = mails
      eventBus.emit('loading', false)

    },
    filterUnread() {
      console.info('filter unread')
    },
    setFilter(filterBy) {
      this.filterBy = { ...this.filterBy, ...filterBy }
      this.loadMails()
    },
    async setAppTitle() {
      const mails = await storageService.query('mail_db')
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

      await this.countMails()
      utilService.setAppConfig('gmail', `${title}  ${extraInfo}`)
    },
    async countMails() {
      mailService.getMailCount()
    },

    async selectedMailsUpdate(action) {
      await mailService.updateMany([...this.selectedMails], action).catch(() => showSuccessMsg(defaultErrorMsg))

      showSuccessMsg('Action completed')
      this.selectMails(false)
      this.isSelected = false
      this.loadMails()

    },
    async updateMail({ action, mailId }) {
      console.debug('♠️ ~ file: MailList.js:122 ~ updateMail ~ action, mailId:', action, mailId)

      let mail = this.mails.find(m => m.id === mailId)

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
        mail.snoozedAt = mail.snoozedAt ? null : Date.now()
        msg = 'Conversation was scheduled a reminder'
      }
      // this is for not saving state on the mail object
      if (mail.isSelected) {
        delete mail.isSelected
      }

      try {
        await mailService.save({ ...mail })
        showSuccessMsg(msg)
        if (!msg) return
      } catch (error) {
        showSuccessMsg(this.defaultErrorMsg)
      } finally {
        this.loadMails()
      }


    },
    async removeMail(mailId) {
      try {
        await mailService.remove(mailId)
        showSuccessMsg('conversation was permanently deleted')
      } catch (error) {
        console.debug('♠️ ~ file: MailList.js:167 ~ removeMail ~ error:', error)
        showSuccessMsg(this.defaultErrorMsg)
      } finally {
        this.loadMails()

      }
    }
  },
  watch: {
    '$route.query': {
      deep: true,
      immediate: true,
      handler: function (val, oldVal) {
        const { tab, label } = val
        this.setFilter({ tab, label })
      },

    },
    'isSelected': {
      deep: false,
      immediate: false,
      handler: function (val, oldVal) {
        val
          ? this.selectMails(true)
          : this.selectMails(false)

      }
    }
  },
  components: {
    MailPreview,
    MailActions
  },
  unmounted() {
    this.unsubscribe()
  },
}
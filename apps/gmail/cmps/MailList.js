import MailPreview from "./MailPreview.js"
import { eventBus } from "./../../../services/event-bus.service.js"
import { utilService } from "./../../../services/util.service.js"
import { userService } from "../../../services/user.service.js"


export default {
  name: 'MailList',
  template: `
          <section class="list-container">
           <section class="list-actions">
            <button>unread</button>
            <input type="checkbox" name="" id="" />
           </section>
            <section v-if="mails" class="mail-list grid">
              
              <MailPreview v-for="mail in mails" :key="mail.id" :mail="mail"/>
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
      mailService.query({ ...this.filterBy }).then(mails => {
        // debugger
        this.setAppTitle(mails)
        this.mails = mails
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
        eventBus.emit('get-count', { count, tab })
        title = 'Inbox'
        extraInfo = `(${count})`
      }
      if (tab === 'draft') {
        const count = mails.filter(m => !m.sentAt).length
        title = `Drafts (${count}) -`
        extraInfo = `${loggedUser.username}`
      }
      if (tab !== 'inbox' && tab !== 'draft') {

        title = tab.substring(0, 1).toLocaleUpperCase() + tab.substring(1) + ' Mail -'
        extraInfo = `${loggedUser.username}`
      }
      utilService.setAppConfig('gmail', `${title}  ${extraInfo}`)
    }

  },
  computed: {

  },
  watch: {
    '$route.query': {
      deep: true,
      immediate: true,
      handler: function (val, oldVal) {
        this.setFilter({ tab: val.tab })

      }
    },
  },
  components: {
    MailPreview
  },
}
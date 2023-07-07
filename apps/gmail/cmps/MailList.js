import MailPreview from "./MailPreview.js"
import { eventBus } from "./../../../services/event-bus.service.js"

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
      filterBy: {}
    }
  },
  methods: {
    loadMails() {
      mailService.query({ ...this.filterBy }).then(mails => {
        this.mails = mails
      })
    },
    setFilter(filterBy) {
      this.filterBy = { ...this.filterBy, ...filterBy }
      this.loadMails()
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
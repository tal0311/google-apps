import MailPreview from "./MailPreview.js"

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
  },
  data() {
    return {
      mails: null
    }
  },
  methods: {
    loadMails() {
      mailService.query().then(mails => {
        this.mails = mails
      })
    }
  },
  components: {
    MailPreview
  },
}
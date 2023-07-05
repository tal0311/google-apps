import MailPreview from "./MailPreview.js"

export default {
  name: 'MailList',
  template: `
        <section v-if="mails" class="mail-list">
          <MailPreview v-for="mail in mails" :key="mail.id" :mail="mail"/>
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
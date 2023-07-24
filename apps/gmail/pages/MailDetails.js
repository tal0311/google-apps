import { mailService } from "../../../services/mail.service.js"
import UserPreview from "../../../cmps/UserPreview.js"
import MailActions from "../cmps/MailActions.js"
import { eventBus, showSuccessMsg } from '../../../services/event-bus.service.js'

export default {
  template: `
       <section class="mail-details-container grid" v-if="mail">
           <i @click="back" class="back material-symbols-outlined">
             arrow_back
           </i>
           <MailActions  @mail-action="updateMail" />
           <section class="mail-header">
             <h3>{{mail.subject}}</h3>
            </section>

        <UserPreview :userFrom="mail.from"/>
          <h4 class="mail-from">{{mail.from}}</h4>
            <section v-if="mail" class="mail-details grid">
              <p>{{mail.body}}</p>
            </section>
          </section>
    `,
  data() {
    return {
      mail: null,

    }
  },
  created() {
    this.loadMail()
  },
  methods: {
    async loadMail() {
      const { id } = this.$route.params
      const mail = await mailService.get(id).catch(err => {
        alert('Cannot find mail')
        this.$router.push('/mail')
      })
      mail.isRead = true
      this.mail = mail
    },
    async updateMail(action) {
      let msg = ''
      if (action === 'toggleArchive') {
        msg = 'Conversation archived'
        this.mail.removedAt = Date.now()
      }
      if (action === 'report') {
        msg = 'Conversation marked as spam'
        this.mail.isSpam = true
      }
      if (action === 'remove') {
        msg = 'Conversation deleted'
        this.mail.removedAt = Date.now()
      }
      if (action === 'toggleRead') {
        this.mail.isRead = this.mail.isRead ? false : true
        msg = `Conversation marked as ${this.mail.isRead ? 'read' : 'unread'}`
      }
      if (action === 'schedule') {
        msg = 'Conversation scheduled'
        this.mail.snoozedAt = Date.now()
      }
      if (action === 'addTask') {
        msg = 'Conversation added to Keep app'
        // eventBus.emit('add-task', { ...this.mail })
        this.$router.push({ path: '/note', hash: '#add', query: { title: this.mail.subject, body: this.mail.body } })


      }
      if (action === 'moveTo') {
        console.log('moving conversation')
        msg = 'Conversation added label'
      }
      if (action === 'addLabel') {
        const label = prompt('Add label to conversation')
        msg = 'Conversation added label'
        this.mail.label = label
      }

      await mailService.save({ ...this.mail }).catch(err => {
        console.debug('♠️ ~ file: MailDetails.js:87 ~ await mailService.save ~ err:', err)
        showSuccessMsg('We are sorry, could not save mail')
      })

      if (!msg) return
      showSuccessMsg(msg)

    },
    async back() {
      await mailService.save({ ...this.mail })
      this.$router.go(-1)
    }
  },
  components: {
    UserPreview,
    MailActions
  }
}

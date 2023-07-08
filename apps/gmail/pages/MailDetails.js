import { mailService } from "../../../services/mail.service.js"
import UserPreview from "../../../cmps/UserPreview.js"
import { eventBus, showSuccessMsg } from '../../../services/event-bus.service.js'

export default {
  template: `
       <section class="mail-details-container grid" v-if="mail">
                <i @click="back" class="back material-symbols-outlined">
             arrow_back
           </i>
           <section class="list-actions grid">
        <i v-for="action,idx in actions1" :key="idx"
          @click="updateMail(action.actionType)"
          :title="action.title" class="material-symbols-outlined">
            {{action.iconName}}
          </i>|
        <i v-for="action,idx in actions2" :key="idx"
          @click="updateMail(action.actionType)"
          :title="action.title" class="material-symbols-outlined">
            {{action.iconName}}
          </i>|
        <i v-for="action,idx in actions3" :key="idx"
          @click="updateMail(action.actionType)"
          :title="action.title" class="material-symbols-outlined">
            {{action.iconName}}
          </i>
         </section>

        <section class="mail-header">
          <h3>{{mail.subject}}</h3>
        </section>

        <UserPreview :user="mail.from"/>
        <h4 class="mail-from">{{mail.from}}</h4>
            <section v-if="mail" class="mail-details grid">
              <p>{{mail.body}}</p>
            </section>
          </section>
    `,
  data() {
    return {
      mail: null,
      actions1: [
        { iconName: 'archive', actionType: 'toggleArchive', title: 'Archive' },
        { iconName: 'report', actionType: 'report', title: 'Report Spam' },
        { iconName: 'delete', actionType: 'remove', title: 'Delete Mail' }
      ],
      actions2: [
        { iconName: 'mail', actionType: 'toggleRead', title: 'Mark read' },
        { iconName: 'schedule', actionType: 'schedule', title: 'schedule' },
        { iconName: 'add_task', actionType: 'addTask', title: 'Add Task' }
      ],
      actions3: [
        { iconName: 'drive_file_move', actionType: 'moveTo', title: 'Move to' },
        { iconName: 'label', actionType: 'addLabel', title: 'Label' },
        { iconName: 'more_vert', actionType: 'more', title: 'More' }
      ]
    }
  },
  created() {
    this.loadMail()
  },
  methods: {
    loadMail() {
      const { id } = this.$route.params
      mailService
        .get(id)
        .then(mail => {
          mail.isRead = true
          this.mail = mail
        })
        .catch(err => {
          alert('Cannot find mail')
          this.$router.push('/mail')
        })
    },
    updateMail(action) {
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
        eventBus.emit('add-task', { ...this.mail })
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

      mailService.save({ ...this.mail })
        .then((updatedMail) => {
          if (!msg) return
          showSuccessMsg(msg)
        }).catch(err => {
          console.debug('♠️ ~ file: MailDetails.js:86 ~ .then ~ err:', err)
          showSuccessMsg('We are sorry, could not save mail')
        })
    },
    back() {
      mailService.save({ ...this.mail }).then(() => {
        this.$router.go(-1)
      })

    }
  },
  components: {
    UserPreview
  }
}

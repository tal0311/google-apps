import { utilService } from "./../../../services/util.service.js"
export default {
  name: 'MailPreview',
  emits: ['update-mail', 'select-mail'],
  props: ['mail'],
  template: `
        <section @click="navigateTo(mail.id)" :class="['mail-preview grid', mail.isRead
        ?'is-read':'']">

        <!-- mail actions goes here -->
        <!-- <pre>{{isMailSelected}}</pre> -->
         <div className="actions-start grid">
         <input type="checkbox" name="select-mail" v-model="mail.isSelected" @input="select" @click.stop="" /> 
         <i @click.stop="updateMail('star' ,mail.id)" :class="[ mail.isStared? 'starred':'' ,'star material-symbols-outlined']">
           star
          </i>
         </div>

         <p>
          {{mail.from}}
         </p>

         <div class="small-preview grid">
          <h5 class="mail-subject">{{mail.subject}}</h5>
          <p class="mail-body">{{mail.body}}</p>
         </div>
        
         <div class="actions-end">
          <i v-for="action,idx in actionsEnd" :key="idx"
          @click.stop="updateMail(action.actionType,mail.id)"
          :title="action.title" class="material-symbols-outlined">
            {{action.iconName}}
          </i>
         </div>

         <div class="mail-date">
          {{getMailDate(mail).month}} {{getMailDate(mail).day}}
         </div>
        </section>
        `,
  data() {
    return {
      isMailSelected: false,
      actionsEnd: [
        { iconName: 'mail', actionType: 'toggleRead', title: 'Mark read' },
        { iconName: this.mail.removedAt ? 'delete' : 'archive', actionType: 'toggleArchive', title: this.mail.removedAt ? 'Permanently delete' : 'Archive' },
        { iconName: 'schedule', actionType: 'schedule', title: 'schedule' }
      ]
    }
  },
  methods: {
    select() {
      this.$emit('select-mail', { mailId: this.mail.id, val: this.mail.isSelected })
    },
    getMailDate(mail) {
      const ts = mail.sentAt ? mail.sentAt : mail.createdAt
      return utilService.getFormattedDate(ts)
    },

    navigateTo(mailId) {
      this.$router.push(`/mail/${mailId}`)
    },
    updateMail(action, mailId) {
      this.$emit('update-mail', { action, mailId })
    }
  },

}



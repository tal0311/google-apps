import { utilService } from "./../../../services/util.service.js"
export default {
  name: 'MailPreview',
  emits: ['update-mail'],
  props: ['mail'],
  template: `
        <section @click="navigateTo(mail.id)" :class="['mail-preview grid', mail.isRead
        ?'is-read':'']">
         <div className="actions-start grid">
         <input type="checkbox" name="" id="" /> 
         <span @click.stop="updateMail('star' ,mail.id)" :class="[ mail.isStared? 'starred':'' ,'star material-symbols-outlined']">
           star
          </span>
         </div>

         <p>
          {{mail.from}}
         </p>

         <div class="small-preview grid">
          <h5 class="mail-subject">{{mail.subject}}</h5>
          <p class="mail-body">{{mail.body}}</p>
         </div>
        
         <div class="actions-end">
          <span v-for="action,idx in actionsEnd" :key="idx"
          @click.stop="updateMail(action.actionType,mail.id)"
          :title="action.title" class="material-symbols-outlined">
            {{action.iconName}}
          </span>
         </div>

         <div class="mail-date">
          {{getMailDate(mail).month}} {{getMailDate(mail).day}}
         </div>
        </section>
        `,
  components: {},
  created() { },
  data() {
    return {
      actionsEnd: [
        { iconName: 'mail', actionType: 'toggleRead', title: 'Mark read' },
        { iconName: this.mail.removedAt ? 'delete' : 'archive', actionType: 'toggleArchive', title: this.mail.removedAt ? 'Permanently delete' : 'Archive' },
        { iconName: 'schedule', actionType: 'schedule', title: 'schedule' }
      ]
    }
  },
  methods: {
    getMailDate(mail) {
      const ts = mail.sentAt ? mail.sentAt : mail.createdAt
      return utilService.getFormattedDate(ts)
    },
    // mailAction(mailId, actionType) {
    //   console.info(mailId, actionType);
    // },
    navigateTo(mailId) {
      this.$router.push(`/mail/${mailId}`)
    },
    updateMail(action, mailId) {
      this.$emit('update-mail', { action, mailId })
    }
  },
  computed: {

  },
}

// subject,
//  body,
//  isRead: false,
//   sentAt: Date.now(),
//    removedAt: null,
//     from,
//     to

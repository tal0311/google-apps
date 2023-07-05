import { utilService } from "./../../../services/util.service.js"
export default {
 name: 'MailPreview',
 props: ['mail'],
 template: `
        <section className="mail-preview grid">
         <div className="actions-start grid">
         <input type="checkbox" name="" id="" /> 
         <span class="material-symbols-outlined">
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
          @click="mailAction(mail.id, action.actionType)"
          :title="action.title" class="material-symbols-outlined">
            {{action.iconName}}
          </span>
         </div>

         <div class="mail-date">
          {{getMailDate(mail.sentAt).month}} {{getMailDate(mail.sentAt).day}}
         </div>
        </section>
        `,
 components: {},
 created() { },
 data() {
  return {
   actionsEnd: [
    { iconName: 'mail', actionType: 'toggleRead', title: 'Mark read' },
    { iconName: 'archive', actionType: 'toggleArchive', title: 'Archive' },
    { iconName: 'schedule', actionType: 'schedule', title: 'schedule' }
   ]
  }
 },
 methods: {
  getMailDate(ts) {
   return utilService.getFormattedDate(ts)
  },
  mailAction(mailId, actionType) {
   console.log(mailId, actionType);
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

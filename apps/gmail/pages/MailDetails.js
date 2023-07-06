import { mailService } from "../../../services/mail.service.js"
import UserPreview from "../../../cmps/UserPreview.js"

export default {
  template: `
       <section class="mail-details-container grid" v-if="mail">
           <i @click="$router.go(-1)" class="back material-symbols-outlined">
             arrow_back
           </i>
           <section class="list-actions grid">
        <i v-for="action,idx in actions1" :key="idx"
          @click="mailAction(mail.id, action.actionType)"
          :title="action.title" class="material-symbols-outlined">
            {{action.iconName}}
          </i>|
        <i v-for="action,idx in actions2" :key="idx"
          @click="mailAction(mail.id, action.actionType)"
          :title="action.title" class="material-symbols-outlined">
            {{action.iconName}}
          </i>|
        <i v-for="action,idx in actions3" :key="idx"
          @click="mailAction(mail.id, action.actionType)"
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
          this.mail = mail
        })
        .catch(err => {
          alert('Cannot find mail')
          this.$router.push('/mail')
        })
    },

  },
  watch: {

  },
  computed: {

  },
  components: {
    UserPreview
  }
}

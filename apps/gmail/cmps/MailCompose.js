import { mailService } from "../../../services/mail.service.js"
import { utilService } from "../../../services/util.service.js"
import { notificationService } from "../../../services/sysNotification.service.js"
import { speechToTxtService } from "../../../services/speechToText.js"
import { eventBus } from "../../../services/event-bus.service.js"

export default {
        name: 'MailCompose',
        props: [],
        template: `
         <section :class="['mail-compose small grid', composeStatus]" v-if="mail" >
            <header class="compose-header grid">
              <h4>{{title}}</h4>
              <div className="header-actions">
                <i class="material-symbols-outlined" @click="composeAction('expend')">
                  {{isExpend?'close_fullscreen':'open_in_full'}}
                </i>
                <i class="material-symbols-outlined" @click="composeAction('minimize')">
                 minimize
                 </i>
                <i class="material-symbols-outlined" @click="composeAction('close')">
                 close
                 </i>
              </div>
           </header>
            <form  @submit.prevent="" class="mail-form grid" >
                <input type="text" placeholder="To" name="to" v-model="mail.to"/>
                <input type="text" placeholder="Subject" name="subject" v-model="mail.subject" />
                <textarea name="" v-model="mail.body" @input="saveToDraft" @blur="isDirty=false" id="" cols="30" rows="10"></textarea>
           </form>
            <footer>
                <div class="compose-actions grid">
                        <button  class="send-btn" @click="composeAction('send')">send</button>
                        <i title="Speech to text" @click="composeAction('record')" class="record material-symbols-outlined">mic</i>
                </div>
            </footer>
  
         </section>
        `,
        created() {
                this.saveToDraft = utilService.debounce(this.saveToDraft, 3000)
                this.unsubscribe = eventBus.on('record-results', this.setTranscript)
        },
        data() {
                return {
                        mail: null,
                        isExpend: false,
                        composeStatus: 'small',
                        title: 'New Message'
                }
        },

        methods: {
                setTranscript(transcript) {
                        this.mail.body = transcript
                },
                composeAction(actionTYpe) {
                        if (actionTYpe === 'minimize') {
                                this.composeStatus = 'collapsed'

                        }
                        if (actionTYpe === 'close') {
                                if (!this.mail.subject) this.mail.subject = '(No subject)'
                                mailService.save({ ...this.mail }).then(() => {
                                        this.$router.push('/mail?tab=inbox')
                                })

                        }
                        if (actionTYpe === 'expend') {
                                this.isExpend = !this.isExpend
                                this.composeStatus = this.isExpend ? 'expend' : 'small'
                        }
                        if (actionTYpe === 'send') {
                                mailService.save({ ...this.mail }).then(() => {
                                        this.$router.push('/mail?tab=sent')
                                })
                        }
                        if (actionTYpe === 'record') {
                                speechToTxtService.start()
                        }
                },
                setTitle() {
                        setTimeout(() => {
                                this.title = 'New Message'
                        }, 3000)
                },
                saveToDraft() {
                        mailService.save({ ...this.mail }).then(mail => {
                                this.title = 'Saved Draft'
                                this.setTitle()
                                this.$router.push(`/mail?tab=${this.$route.query.tab}&compose=${mail.id}`)
                        })
                }
        },
        watch: {
                $route: {
                        deep: true,
                        immediate: true,
                        handler: function (val, oldVal) {
                                let { compose, subject, body } = val.query
                                if (compose === 'new') {
                                        this.mail = mailService.getEmptyMail()
                                }
                                if (compose !== 'new' && typeof compose === 'string') {
                                        this.mail = mailService.get(compose).then(mail => {
                                                this.mail = mail
                                        })
                                }
                                if (subject && body) {
                                        if (subject === 'undefined') subject = '(No subject)'
                                        if (body === 'undefined') body = '(No body)'
                                        this.mail.subject = subject
                                        this.mail.body = body
                                        notificationService.notifyUser(`Note with title ${subject} was added as mail`, 'gmail')
                                }
                        }
                },




        },
        unmounted() {
                this.unsubscribe()
        },
}

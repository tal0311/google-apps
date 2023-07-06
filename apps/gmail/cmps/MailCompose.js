import { mailService } from "../../../services/mail.service.js"
import { utilService } from "../../../services/util.service.js";

export default {
        name: 'MailCompose',
        props: [],
        template: `
         <section :class="['mail-compose small grid', composeStatus]" v-if="mail" >
            <header class="compose-header grid">
              <h4>New Message</h4>
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
            <form >
                <input type="text" name="" id="" v-model="mail.to"/>
                <input type="text" name="" id="" v-model="mail.subject" />
                <textarea name="" v-model="mail.body" @input="saveToDraft" id="" cols="30" rows="10"></textarea>
           <!-- <div ref="quill" id="quill-container"></div> -->
            </form>
            <footer>
                <div class="compose-actions">
                        <button>send</button>
                </div>
            </footer>
  
         </section>
        `,
        components: {},
        created() {
        },
        data() {
                return {
                        mail: null,
                        isExpend: false,
                        composeStatus: 'small',
                        isDirty: false
                }
        },
        mounted() {
                // new Quill('#quill-container', {
                //         modules: {
                //                 toolbar: [
                //                         [{ header: [1, 2, false] }],
                //                         ['bold', 'italic', 'underline'],
                //                         ['image', 'code-block'],
                //                 ],
                //         },
                //         placeholder: 'Compose an epic...',
                //         theme: 'snow', // or 'bubble'
                // })
                // const editor = document.querySelector('.ql-editor')
                // editor.innerText = this.mail.body
        },
        methods: {
                composeAction(actionTYpe) {
                        if (actionTYpe === 'minimize') {
                                this.composeStatus = 'collapsed'

                        }
                        if (actionTYpe === 'close') {
                                if (this.isDirty)
                                        mailService.save({ ...this.mail }).then(() => {
                                                this.$router.push('/mail')
                                        })

                        }
                        if (actionTYpe === 'expend') {
                                this.isExpend = !this.isExpend
                                this.composeStatus = this.isExpend ? 'expend' : 'small'
                        }
                },
                saveToDraft() {
                        if (this.isDirty) return
                        this.isDirty = true
                        mailService.save({ ...this.mail }).then(mail => {
                                this.$router.push({ name: 'mail', query: { compose: mail.id } })
                        })
                }
        },
        computed: {

        },
        watch: {
                $route: {
                        deep: true,
                        immediate: true,
                        handler: function (val, oldVal) {
                                const { compose } = val.query
                                if (compose === 'new') {
                                        this.mail = mailService.getEmptyMail()
                                }
                                if (compose !== 'new' && typeof compose === 'string') {
                                        this.mail = mailService.get(compose).then(mail => {
                                                this.mail = mail
                                        })
                                }
                        }
                },




        }
}

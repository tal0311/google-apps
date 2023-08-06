import { shareService } from "../services/share.service.js";

export default {
     name: 'ShareModal',
     props: ['extraData'],
     template: `
      <section class="share-modal grid">
        <h4>Share</h4>
         <section class="app-to-share grid">
              <div v-for="(action,idx) in actions" @click="onAction(action.actionType)" :key="idx" class="action">
              <i class="app-icon" v-html="$getSvg(action.icon)"></i>
              </div>
         </section>
         <div class="copy-container grid">
          <button class="app-btn"  @click="copyToClipBoard(getVideoIdUrl)">Copy</button>
          <input :value="getVideoIdUrl" class="url-input" type="text" name="" id="" />
         </div>
      </section>

        `,
     components: {},
     created() { },
     data() {
          return {
               actions: [
                    { icon: 'embed', actionType: 'embed', title: 'Embed on your site', txt: 'Embed' },
                    { icon: 'wa', actionType: 'share-to-wa', title: 'WhatsApp', txt: 'WhatsApp' },
                    { icon: 'email', actionType: 'share-to-mail', title: 'Email', txt: 'Email' },
                    { icon: 'facebook', actionType: 'share-to-facebook', title: 'Facebook', txt: 'Facebook' },
                    { icon: 'twitter', actionType: 'share-to-twitter', title: 'Twitter', txt: 'Twitter' },
               ]
          }
     },
     methods: {
          onAction(actionType) {
               console.log('actions.actionType', actionType);
               if (actionType === 'embed') {
                    // create embed code
                    const embedCode = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${this.extraData}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                    this.copyToClipBoard(embedCode)

               }
               if (actionType === 'share-to-wa') {
                    shareService.shareTo('whatsapp', this.getVideoIdUrl)
               }
               if (actionType === 'share-to-mail') {
                    const isDefaultApp = confirm('Use your default mail app?')
                    if (isDefaultApp) {
                         shareService.shareTo('email', this.getVideoIdUrl)
                         return
                    }
                    shareService.shareTo('gmail', this.getVideoIdUrl)
               }
               if (actionType === 'share-to-facebook') {
                    shareService.shareTo('facebook', this.getVideoIdUrl)

               }
               if (actionType === 'share-to-twitter') {
                    shareService.shareTo('twitter', this.getVideoIdUrl)
               }
          },
          copyToClipBoard(val) {
               navigator.clipboard.writeText(val)
               alert('copied to clipboard')
          }
     },
     computed: {
          getVideoIdUrl() {
               return `https://www.youtube.com/watch?v=${this.extraData}`
          }
     },
}

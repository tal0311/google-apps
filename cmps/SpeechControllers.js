import { speechService } from "../services/textToSpeech.service.js"

export default {
 name: 'SpeechControllers',
 props: [],
 template: `
         <section class="speech-controllers">
               <div class="actions-container grid">
                <i v-for="action,idx in actions" :key="idx"
                 class="material-symbols-outlined"
                 @click="speechAction(action.actionType)"
                 >
                 {{action.icon}}</i>
               </div>
         </section>
        `,
 components: {},
 created() { },
 data() {
  return {
   actions: [
    { icon: 'pause_circle', actionType: 'pause' },
    { icon: 'stop_circle', actionType: 'stop' },
    { icon: 'play_circle', actionType: 'play' }
   ]
  }
 },
 methods: {
  speechAction(type) {
   if (type === 'play') speechService.resume()
   if (type === 'pause') speechService.pause()
   if (type === 'stop') speechService.stop()
  }
 },
 computed: {},
}









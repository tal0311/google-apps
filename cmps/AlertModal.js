import { eventBus } from './../services/event-bus.service.js'

export default {
 name: '',
 props: ['extraData'],
 template: `
        <section class="alert-modal">
        <h1>AlertModal</h1>
         <input type="time" name="" id="" @change="setAlarm" v-model="time" />
        <button @click="$emit('close-modal')">close</button>
        </section>
        `,
 components: {},
 created() { },
 data() {
  return {
   time: '',

  }
 },
 methods: {
  setAlarm() {
   console.log('setAlarm')
   if (!this.time) return
   // new Date('7/4/2023 13:45')
   console.log('this.time:', `${new Date().toLocaleDateString()} ${this.time}`)
   // eventBus.emit('add-note-alarm', { noteId: this.extraData, time: this.time })

  }

 },
 computed: {},
}

import { eventBus } from './../services/event-bus.service.js'

export default {
 name: '',
 props: ['extraData'],
 template: `
        <section class="reminder-modal grid">
        <h3>Remind me later</h1>
        <form @submit.prevent=""></form>
         <input type="time" name="note-reminder" id="" @change="setAlarm" v-model="time" />
        <button class="app-btn" @click="$emit('close-modal')">close</button>
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
   const reminder = `${new Date().toLocaleDateString()} ${this.time}`
   eventBus.emit('add-note-alarm', { noteId: this.extraData, reminder })


  }

 },

}

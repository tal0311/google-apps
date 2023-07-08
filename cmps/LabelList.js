import { eventBus } from "../services/event-bus.service.js"
import { userService } from "../services/user.service.js"


export default {
 name: '',
 props: [],
 template: `

         <form @submit.prevent="" class="label-list grid">
          <h1>New label</h1>
          <label htmlFor="label-name"> Please enter a new label name</label>
          <input v-model="labelName" type="text" name="label-name"/>
          <div class="action-container grid">
           <button @click="$emit('close-modal')">Cancel</button>
           <button @click="createLabel" class="create">Create</button>
          </div>
         </form>
        `,
 components: {},
 created() { },
 data() {
  return {
   labelName: ''
  }
 },
 methods: {
  createLabel() {
   userService.addLabel(this.labelName)
   eventBus.emit('update-user')
   this.$emit('close-modal')
  }
 },
 computed: {},
}

import { eventBus } from "../services/event-bus.service.js"
import LabelList from './LabelList.js'


export default {
   name: 'AppModal',
   props: [],
   template: `
        <dialog ref='app-modal' class="app-modal">
             <i @click="closeModal" class="material-symbols-outlined">
                close
             </i>
            <component v-if="modalType" :is="modalType" @close-modal="closeModal"/>
        </dialog>
        `,

   created() {
      eventBus.on('show-modal', this.setModal)

   },
   data() {
      return {
         modalType: 'LabelList'
      }
   },
   mounted() {
      // this.openModal()
   },
   methods: {
      setModal(type) {
         this.modalType = type
         this.openModal()
      },
      openModal() {
         this.$refs['app-modal'].showModal()
      },
      closeModal() {
         this.$refs['app-modal'].close()
      }
   },
   computed: {},
   components: {
      LabelList
   }
}

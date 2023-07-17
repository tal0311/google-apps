import { eventBus } from "../services/event-bus.service.js"
import LabelList from './LabelList.js'
import AlertModal from './AlertModal.js'


export default {
   name: 'AppModal',
   props: [],
   template: `
        <dialog ref='app-modal' class="app-modal">
             <i @click="closeModal" class="material-symbols-outlined">
                close
             </i>
            <component v-if="modalType" :is="modalType" 
            @close-modal="closeModal" :extraData="extraData"/>
        </dialog>
        `,

   created() {
      eventBus.on('show-modal', this.setModal)

   },
   data() {
      return {
         modalType: '',
         extraData: null
      }
   },
   mounted() {
      // this.openModal()
   },
   methods: {
      setModal({ modalType, data = null }) {
         console.log('data:', data)
         if (data) this.extraData = data
         this.modalType = modalType
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
      LabelList,
      AlertModal
   }
}

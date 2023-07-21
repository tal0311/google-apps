export default {
  name: 'NotesLoader',
  props: ['isLoading'],
  template: `
          <div  class="app-loader grid">
            <div v-if="isLoading" class="loader"></div>
            <i v-else class="material-symbols-outlined">cloud_done</i>
          </div>
                `,
}

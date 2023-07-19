export default {
  name: 'NotesLoader',
  props: ['isLoading'],
  template: `
          <div  class="app-loader">
            <div v-if="isLoading" class="loader"></div>
            <div v-else>
              <i class="material-symbols-outlined">cloud_done</i>
            </div>
          </div>
                `,
}

export default {
  name: 'NotesLoader',
  props: ['isLoading'],
  template: `
          <div v-if="isLoading" class="app-loader"></div>
          <!-- <div v-if="!isLoading">
            <i class="material-symbols-outlined">refresh</i>
          </div> -->
          <div v-else>
            <i class="material-symbols-outlined">cloud_done</i>
          </div>
        `,
  components: {},
  created() { },
  data() {
    return {}
  },
  methods: {},
  computed: {},

}

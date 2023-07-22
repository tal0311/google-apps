export default {
  name: 'NoteTodo',
  props: ['info'],
  emits: ['updateInfo'],
  template: `
         <article class="note-dynamic note-todo ">
         
         <ul>
           <li :class="['todo-item grid', todo.donAt? 'done':'']" v-for="todo,idx in info.todos" :key="todo.id">
             <input type="checkbox" @change="updateDone(idx)" :checked="isChecked(idx)" name=""  id="" />         
            <p :contenteditable="$attrs.isDetails"  @blur="updateTodoTitle(idx, $event)">{{todo.txt}}</p>
          </li>
         </ul>
         </article>
        `,
  components: {},
  created() {

  },
  data() {
    return {
      newInfo: { ...this.info }
    }
  },
  methods: {
    updateTodoTitle(idx, { target: { innerText } }) {
      this.newInfo.todos[idx].txt = innerText
      this.updateNote()
    },
    updateDone(idx) {
      this.newInfo.todos[idx].doneAt = this.newInfo.todos[idx].doneAt ? null : Date.now()
      console.log('this.newInfo.todos:', this.newInfo.todos)
      this.updateNote()
    },
    isChecked(idx) {
      return this.info.todos[idx].doneAt ? true : false
    },
    updateNote() {
      const infoToUpdate = JSON.parse(JSON.stringify(this.newInfo))
      this.$emit('updateInfo', { type: 'NoteTxt', info: infoToUpdate })
    }
  },
  computed: {

  },
}

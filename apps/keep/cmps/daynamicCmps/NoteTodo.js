export default {
  name: 'NoteTodo',
  props: ['info'],
  emits: ['updateInfo'],
  template: `
         <article class="note-dynamic note-todo ">
         
         <ul>
           <li :class="['todo-item grid', todo.donAt? 'done':'']" v-for="todo,idx in info.todos" :key="todo.id">
                      <input type="checkbox"  @change="updateDone(idx)" aria-label="todo-checkbox" :checked="isChecked(idx)" />         
            <p :contenteditable="$attrs.isDetails"  @blur="updateTodoTitle(idx, $event)">{{todo.txt}}</p>
          </li>
         </ul>
         </article>
        `,
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
}

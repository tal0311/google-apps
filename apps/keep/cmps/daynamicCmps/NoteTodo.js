export default {
 name: 'NoteTodo',
 props: ['info'],
 template: `
         <article class="note-todo">
          {{info}}
          <ul>
           <li :class="['todo-item', todo.donAt? 'done':'']" v-for="todo in info.todos" :key="todo.id">
            <p>{{todo.txt}}</p>
            <input type="checkbox" :checked="todo.isChecked" name=""  id="" />         
          </li>
         </ul>
         </article>
        `,
 components: {},
 created() { },
 data() {
  return {}
 },
 methods: {},
 computed: {},
}

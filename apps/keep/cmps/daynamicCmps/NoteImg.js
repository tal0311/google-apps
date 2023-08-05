export default {
  name: 'NoteImg',
  props: ['info'],
  template: `
         <article class="note-dynamic note-img">
           <img :src="info.content" alt="note-url" loading="lazy" />
        </article>
        `,
}

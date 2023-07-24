export default {
       name: 'NoteCanvas',
       props: ['info'],
       template: `
             <article class="note-dynamic note-canvas">
              <img :src="info.content" alt="canvas-img" />
             </article>
        `,
}

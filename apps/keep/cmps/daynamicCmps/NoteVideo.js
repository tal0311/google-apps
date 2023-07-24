export default {
       name: 'NoteVideo',
       props: ['info'],
       template: `
       <article class="note-dynamic note-video">
              <iframe :src="info.content" frameborder="0" width="100%" height="200">
                     update your browser
              </iframe>
       </article>
        `,
}

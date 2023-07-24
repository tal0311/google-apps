import { noteService } from './../../../services/note.service.js'

export default {
  name: 'CanvasEditor',
  props: [],
  template: `
     <dialog  ref="canvas-dialog" class="canvas-dialog grid">
  
      <div class="actions-container grid">
       <i class="material-symbols-outlined">ink_pen</i>
       <i @click="clearCanvas" class="material-symbols-outlined">ink_eraser</i>
       <i class="material-symbols-outlined">palette</i>
      </div>
        <div class="canvas-container">
          <canvas
           @mousedown="startDrawing" @mouseup="isDrawing=false"
           @mousemove="draw" height="400" width="600" ref="elCanvas"></canvas>
        </div>
        <button @click="toImg" class="app-btn">Close</button>
            <pre>{{isDrawing}}</pre>
     </dialog>
        `,
  components: {},
  created() { },
  mounted() {
    this.openCanvasDialog()
    this.elCanvas = this.$refs.elCanvas;
    this.ctx = this.elCanvas.getContext("2d");
  },
  data() {
    return {
      note: noteService.getEmptyNote('NoteCanvas'),
      isDrawing: false,
      TOUCH_EVS: ['touchstart', 'touchmove', 'touchend']
    }
  },
  methods: {
    toImg() {
      const data = this.elCanvas.toDataURL('image/png')
      this.note.info.content = data
      this.saveNote()
    },
    async saveNote() {
      const note = JSON.parse(JSON.stringify(this.note))
      await noteService.save(note)
      this.$router.push('/note#home')
    },
    clearCanvas() {
      this.ctx.clearRect(0, 0, this.elCanvas.width, this.elCanvas.height);
    },
    draw(ev) {
      if (!this.isDrawing) return;
      const { x, y } = this.getEvPos(ev)
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x + 1, y + 1);
      this.ctx.strokeStyle = 'black';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
      this.ctx.closePath();
    },
    getEvPos(ev) {
      let pos = {
        x: ev.offsetX - ev.target.clientLeft,
        y: ev.offsetY - ev.target.clientTop,
      }
      if (this.TOUCH_EVS.includes(ev.type)) {
        // Prevent triggering the mouse ev
        ev.preventDefault()
        // Gets the first touch point
        ev = ev.changedTouches[0]
        // Calc the right pos according to the touch screen
        pos = {
          x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
          y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
      }
      return pos
    },

    startDrawing() {
      this.isDrawing = true
    },
    stopDrawing() {
      this.isDrawing = false;
    },
    openCanvasDialog() {
      this.$refs['canvas-dialog'].showModal()
    },
    closeCanvasDialog() {
      this.$refs['canvas-dialog'].close()
    },

  }
}

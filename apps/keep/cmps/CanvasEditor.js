export default {
 name: 'CanvasEditor',
 props: [],
 template: `
     <dialog  ref="canvas-dialog" class="canvas-dialog grid">
  
      <div class="actions-container grid">
       <i class="material-symbols-outlined">ink_pen</i>
       <i class="material-symbols-outlined">ink_eraser</i>
       <i class="material-symbols-outlined">palette</i>
      </div>
        <div class="canvas-container">
          <canvas
           @mousedown="startDrawing" @mouseup="isDrawing=false"
           @mousemove="draw" ref="elCanvas"></canvas>
        </div>
        <button class="app-btn">Close</button>
            <pre>{{isDrawing}}</pre>
     </dialog>
        `,
 components: {},
 created() { },
 mounted() {
  this.openCanvasDialog()
  this.elCanvas = this.$refs.elCanvas;
  this.ctx = this.elCanvas.getContext("2d");
  // document.querySelector('canvas').addEventListener('mousemove', this.draw)

 },
 data() {
  return {
   isDrawing: false,
   lastX: 0,
   lastY: 0,
  }
 },
 methods: {
  draw(ev) {
   if (!this.isDrawing) return;
   const { offsetX, offsetY } = ev;
   this.ctx.beginPath();
   this.ctx.moveTo(this.lastX, this.lastY);
   this.ctx.lineTo(offsetX, offsetY);
   this.ctx.strokeStyle = 'black';
   this.ctx.lineWidth = 2;
   this.ctx.stroke();
   this.lastX = offsetX;
   this.lastY = offsetY;
  },

  startDrawing(ev) {
   const { offsetX, offsetY } = ev
   this.lastX = offsetX;
   this.lastY = offsetY;
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

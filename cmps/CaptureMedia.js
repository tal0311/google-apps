import { screenCaptureService } from '../services/screenCapture.service.js';
import { notificationService } from '../services/sysNotification.service.js';
import { showUserMsg } from '../services/event-bus.service.js';

export default {
 name: 'CaptureMedia',
 props: [],
 inject: ['defaultErrorMsg'],
 template: `
    <section class="capture-media" title="Take screen shot">
       <video class="video-preview" ref="videoElement" autoplay controls></video>
       <img class="preview-container"  ref="previewImage" alt="Screenshot Preview" />
        <button @click="startCapture" class="material-symbols-outlined">
              screenshot_region
        </button>
     </section>
        `,
 components: {},
 created() { },
 data() {
  return {}
 },
 methods: {
  async startCapture() {
   const elVideo = this.$refs.videoElement;
   const previewContainer = this.$refs.previewImage;

   try {
    this.screenStream = await screenCaptureService.getDisplayMedia(elVideo, previewContainer);
    notificationService.notifyUser('You have successfully captured the screen', 'keep');
   } catch (error) {
    showUserMsg(this.defaultErrorMsg);
    throw '♠️ ~ file: CaptureMedia.js:33 ~ startCapture ~ error: ' + error
   }
  }
 },
 computed: {},
 unmounted() {
  if (this.screenStream) {
   this.screenStream.getVideoTracks()[0].stop();
  }
  this.screenStream = null;
  this.$refs.videoElement.srcObject = null;
  this.$refs.previewImage.src = '';
  // this.$refs.previewImage.classList.remove('show');
  // this.$refs.previewImage.classList.remove('hide');
  // this.$refs.previewImage.classList.remove('error');
 },
}

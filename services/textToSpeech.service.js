
import { eventBus } from "./event-bus.service.js"

const setUp = {
 msg: new SpeechSynthesisUtterance(),
 addListeners() {
  this.msg.onstart = () => {
   eventBus.emit('speech', true)
  }
  this.msg.onend = () => {
   eventBus.emit('speech', false)
  }
  this.msg.onerror = (ev) => {
   console.debug('♠️ ~ file: textToSpeech.service.js:14 ~ addListeners ~ err:', ev.error)
   eventBus.emit('speech', false)
  }

 },
 speak(txt) {
  this.addListeners()
  this.msg.text = txt
  this.msg.lang = 'en'
  window.speechSynthesis.speak(this.msg)
 },

 stop() {
  window.speechSynthesis.cancel()
  eventBus.emit('speech', false)
 },
 pause() {
  window.speechSynthesis.pause()
 },
 resume() {
  window.speechSynthesis.resume()

 }
}

export const speechService = setUp






export const broadcastService = {
 bc: null,
 broadcast(data) {
  this.bc.postMessage(data);
 },
 setCannel(channel) {
  this.bc = new BroadcastChannel(channel);
 },
 subscribe(cb) {
  this.bc.addEventListener("message", cb)
 },
 unSubscribe() {
  this.bc.removeEventListener("message")
 }
}
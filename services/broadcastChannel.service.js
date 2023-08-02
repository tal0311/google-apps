

const channels = []
export const broadcastService = {
 broadcast(channelName, data) {
  const bc = channels.find(channel => channel.name === channelName)
  bc.postMessage(data);
 },
 crateChannel(channel) {
  channels.push(new BroadcastChannel(channel))
 },
 subscribe(channelName, cb) {
  const bc = channels.find(channel => channel.name === channelName)
  bc.addEventListener("message", cb)
 },
 unSubscribe(channelName) {
  const bc = channels.find(channel => channel.name === channelName)
  bc.removeEventListener("message")
  bc.close()
  channels = channels.filter(channel => channel.name !== channelName)
 },
 unSubscribeAll() {
  channels.forEach(channel => {
   channel.removeEventListener("message")
   channel.close()
  })
  channels = []
 }
}
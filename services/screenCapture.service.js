

export const screenCaptureService = {
 getDisplayMedia,
}

async function getDisplayMedia(elVideo, previewContainer) {
 if (navigator.mediaDevices.getDisplayMedia) {
  const stream = await navigator.mediaDevices.getDisplayMedia({ preferCurrentTab: true });
  elVideo.srcObject = stream;
  elVideo.addEventListener("loadedmetadata", () => capture(elVideo, stream, previewContainer));
 }

}

function capture(video, stream, previewContainer) {
 const canvas = document.createElement("canvas");
 const ctx = canvas.getContext("2d");

 canvas.width = video.videoWidth;
 canvas.height = video.videoHeight;

 video.play();
 ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
 stream.getVideoTracks()[0].stop();

 // if tou want to show the preview
 // previewContainer.src = canvas.toDataURL();
 download(canvas.toDataURL(), 'myImage.png');
}

function download(dataurl, filename) {
 var a = document.createElement("a");
 a.href = dataurl;
 a.setAttribute("download", filename);
 a.click();
}


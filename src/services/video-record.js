import handleRecord from "./handler-record";

export async function recordVideo() {
  const mimeType = "video/webm";
  const constraints = {
    video: true,
  };
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  handleRecord({ stream, mimeType });
}

export async function recordScreen() {
  const mimeType = "video/webm";
  const displayStream = await navigator.mediaDevices.getDisplayMedia({
    video: true,
  });

  let tracks = [...displayStream.getTracks()];
  const stream = new MediaStream(tracks);
  handleRecord({ stream, mimeType });
}

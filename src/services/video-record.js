import {VideoSenderService,QuestionnaireSenderService} from './video-sender-service'
import { v4 as uuidv4 } from 'uuid';

let isWebcamStopped = false;
let isScreenStopped = false;
const uuid = uuidv4();

try {
  QuestionnaireSenderService(uuid)
}catch{
}


export function handleRecord({ stream, mimeType }, recordType) {
  let recordedChunks = [];
  const mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = function (e) {
    if (e.data.size > 0) {
      recordedChunks.push(e.data);
    }
    if (isScreenStopped || isWebcamStopped) {
      try {
        stream.getTracks().forEach((track) => track.stop());
      } catch {
        isWebcamStopped = false;
        isScreenStopped = false;
      }
    }
  };
  mediaRecorder.onstop = function () {
    const blob = new Blob(recordedChunks, {
      type: mimeType,
    });
    recordedChunks = [];
    VideoSenderService(blob,recordType,uuid);
  };
  mediaRecorder.start(200);
}

export function stopRecord() {
  isWebcamStopped = true;
  isScreenStopped = true;
}

export async function recordVideo() {
  const mimeType = "video/webm";
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });
  handleRecord({ stream, mimeType }, "webcam");
}

export async function recordScreen() {
  const mimeType = "video/webm";
  const stream = await navigator.mediaDevices.getDisplayMedia({
    audio: false,
    video: true,
  });
  handleRecord({ stream, mimeType }, "screen");
}

import VideoSenderService from "./video-sender-service";

const handleRecord = function ({ stream, mimeType }) {
  let recordedChunks = [];
  const mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = function (e) {
    if (e.data.size > 0) {
      recordedChunks.push(e.data);
    }
  };
  mediaRecorder.onstop = function () {
    const blob = new Blob(recordedChunks, {
      type: mimeType,
    });
    recordedChunks = [];

    var downloadLink = URL.createObjectURL(blob); 
    console.log("Download link : "+ downloadLink);
  };

  mediaRecorder.start(200);
};

export default handleRecord

import $ from "jquery";

export const VideoSenderService = function (blob, recordType, uuid) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function (e) {
    if (this.readyState === 4) {
      console.log("Server returned: ", e.target.responseText);
    }
  };
  var video = new FormData();
  video.append("uuid", uuid);
  video.append("blob", blob);

  return $.ajax({
    type: "POST",
    url: `/upload-recorded-${recordType}`,
    data: video,
    processData: false,
    contentType: false,
  }).done(function (data) {
    if (recordType.includes("webcam")) {
      return data;
    }
  });
};

export const QuestionnaireSenderService = function (uuid) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function (e) {
    if (this.readyState === 4) {
      console.log("Server returned: ", e.target.responseText);
    }
  };
  $.ajax({
    type: "POST",
    url: `/questionnaire`,
    data: JSON.stringify({ uuid: uuid }),
    contentType: "application/json;charset=UTF-8",
  });
};

export const ResultAnswerSenderService = function (uuid, answer, event) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function (e) {
    if (this.readyState === 4) {
      console.log("Server returned: ", e.target.responseText);
    }
  };
  $.ajax({
    type: "POST",
    url: `/result`,
    data: JSON.stringify({ uuid: `${uuid}`, answer: answer, event: event }),
    contentType: "application/json;charset=UTF-8",
  });
};

export default VideoSenderService;

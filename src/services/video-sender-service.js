import $ from "jquery";

export const VideoSenderService = function (blob, recordType, uuid) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function (e) {
    if (this.readyState === 4) {
      console.log("Server returned: ", e.target.responseText);
    }
  };
  var video = new FormData();
  video.append("name", `${recordType}.webm`);
  video.append("uuid", uuid);
  video.append("blob", blob);
  $.ajax({
    type: "POST",
    url: `/upload-recorded-${recordType}`,
    data: video,
    processData: false,
    contentType: false,
  }).done(function (data) {
    console.log("Server accepted : ", recordType);
    console.log(data);
  });
};

export const QuestionnaireSenderService = function (uuid) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function (e) {
    if (this.readyState === 4) {
      console.log("Server returned: ", e.target.responseText);
    }
  };
  var questionnaire = new FormData();
  questionnaire.append("uuid", uuid);

  $.ajax({
    type: "POST",
    url: `/questionnaire`,
    data: questionnaire,
    processData: false,
    contentType: false,
  }).done(function () {
    console.log("Server accepted : Questionnaire");
  });
};

export default VideoSenderService;

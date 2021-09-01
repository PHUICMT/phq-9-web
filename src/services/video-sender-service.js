import $ from "jquery";

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

export default QuestionnaireSenderService;

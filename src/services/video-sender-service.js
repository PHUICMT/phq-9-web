import $ from "jquery";

export const VideoSenderService = function (blob, recordType) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function (e) {
    if (this.readyState === 4) {
      console.log("Server returned: ", e.target.responseText);
    }
  };
  var video = new FormData();
  video.append("name", `${recordType}.webm`);
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

// export const TestSender = () => {
//     $.ajax({
//       type: "GET",
//       url: `/check`,
//     }).done(function () {
//       console.log('Sended');
//     });
//   };

export default VideoSenderService;

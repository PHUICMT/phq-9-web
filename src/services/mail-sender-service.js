import $ from "jquery";

export function UploadImage(uuid, blob, to_email) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function (e) {
    if (this.readyState === 4) {
      // console.log("Server returned: ", e.target.responseText);
    }
  };
  var image = new FormData();
  image.append("uuid", uuid);
  image.append("blob", blob);

  return $.ajax({
    type: "POST",
    url: "/upload-image",
    data: image,
    processData: false,
    contentType: false,
  }).done(function (data) {
    console.log("Server returned: ", data);
    MailSender(uuid, to_email);
  });
}

function MailSender(uuid, to_email) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function (e) {
    if (this.readyState === 4) {
      console.log("Server returned: ", e.target.responseText);
    }
  };
  return $.ajax({
    type: "POST",
    url: `/send-mail`,
    data: JSON.stringify({ uuid: uuid, to_email: to_email }),
    contentType: "application/json;charset=UTF-8",
  });
}

export default UploadImage;

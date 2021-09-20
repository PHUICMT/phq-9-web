import ReportWorker from "../worker/generate-report-worker";

const workercode = () => {
  let allData = null;
  let dataFromBackend = undefined;
  onmessage = (e) => {
    if (e.data !== undefined) {
      postMessage("Worker Accepted!");
      allData = e.data;
      console.log("Get data : ", allData);
      StartGenerateWorker(allData.uuid);
    }
  };

  function GetResultFromBackendWorker(uuid, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://server:5000/process-video", false);
    xhr.callback = callback;
    xhr.setRequestHeader("Content-Type", "application/json");
    // xhr.onreadystatechange = function () {
    //   if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
    //     const response = JSON.parse(xhr.responseText);
    //     console.log(response);
    //     dataFromBackend = response;
    //   }
    // };
    xhr.send(JSON.stringify({ uuid: uuid }));
    return xhr;
  }

  function StartGenerateWorker(uuid) {
    function Callback(result) {
      dataFromBackend = result;
      console.log(result);
    }
    GetResultFromBackendWorker(uuid, Callback);
    console.log(dataFromBackend);
    if (dataFromBackend !== undefined) {
      let packedData = {
        total_emotion_time: dataFromBackend.total_emotion_time,
        backend_start_end_time: dataFromBackend.start_end_time,
        total_emotion: dataFromBackend.total_emotion,
        start_end_time: allData.start_end_time,
        hoverTime: allData.scopeTime,
        fontEndTimeStamp: allData.fontEndTimeStamp,
        clickTime: allData.clickTime,
        questionnaireRow: allData.questionnaireRow,
        behavior: allData.behavior,
        uuid: uuid,
        email: allData.email,
      };
      ReportWorker(packedData);
    }
  }
};

let code = workercode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));
const blob = new Blob([code], { type: "application/javascript" });
const worker_script = URL.createObjectURL(blob);
export default worker_script;

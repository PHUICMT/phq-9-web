import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

let allEmote = [];

function ReportWorker(props) {
  const [start_end_time, setStart_end_time] = useState([]);
  const [total_emotion_time, setTotal_emotion_time] = useState([]);
  const [hoverTime, setHoverTime] = useState([]);
  const [fontEndTimeStamp, setFontEndTimeStamp] = useState([]);
  const [clickTime, setClickTime] = useState([]);
  const [backend_start_end_time, setBackend_start_end_time] = useState([]);
  const [total_emotion, setTotal_emotion] = useState([]);
  const [uuid, setUuid] = useState("NaN");
  const [behavior, setBehavior] = useState("");
  const [questionnaire_uuid, setQuestionnaire_uuid] = useState("");

  const [groupTest, setGroupTest] = useState(1);
  let history = useHistory();

  useEffect(() => {
    setStart_end_time(props.start_end_time);
    setTotal_emotion_time(props.total_emotion_time);
    setHoverTime(props.hoverTime);
    setFontEndTimeStamp(props.fontEndTimeStamp);
    setClickTime(props.clickTime);
    setBackend_start_end_time(props.backend_start_end_time);
    setTotal_emotion(props.total_emotion);
    setUuid(props.uuid);
    setBehavior(props.behavior);
    setQuestionnaire_uuid(props.questionnaire_uuid);
    setGroupTest(props.groupTest);
  }, [
    start_end_time,
    total_emotion_time,
    hoverTime,
    fontEndTimeStamp,
    clickTime,
    backend_start_end_time,
    total_emotion,
    groupTest,
    uuid,
    behavior,
    questionnaire_uuid,
    props.behavior,
    props.backendData,
    props.start_end_time,
    props.total_emotion_time,
    props.hoverTime,
    props.fontEndTimeStamp,
    props.clickTime,
    props.backend_start_end_time,
    props.total_emotion,
    props.uuid,
    props.questionnaire_uuid,
    props.groupTest,
  ]);

  async function setData() {
    if (typeof total_emotion_time !== "undefined") {
      await emoteTimeLength();
    }
  }

  async function emoteTimeLength() {
    allEmote = [];
    var Angry = total_emotion_time.angry;
    var Happy = total_emotion_time.happy;
    var Neutral = total_emotion_time.neutral;
    var Sad = total_emotion_time.sad;

    await clickTime.forEach((dummy, i) => {
      var emotePerQuestion = [false, false, false, false]; //Angry, Happy, Neutral, Sad
      fontEndTimeStamp[i].map((timeLength) => {
        var start = timeLength[0];
        var end = timeLength[1];
        if (start > 10000000) {
          start = Math.abs(start - start_end_time[0]);
        }
        if (end > 10000000) {
          end = Math.abs(end - start_end_time[0]);
        }

        Angry.map((timeStamp) => {
          if (timeStamp > start && timeStamp < end) {
            emotePerQuestion[0] = true;
          }
        });
        Happy.map((timeStamp) => {
          if (timeStamp > start && timeStamp < end) {
            emotePerQuestion[1] = true;
          }
        });
        Neutral.map((timeStamp) => {
          if (timeStamp > start && timeStamp < end) {
            emotePerQuestion[2] = true;
          }
        });
        Sad.map((timeStamp) => {
          if (timeStamp > start && timeStamp < end) {
            emotePerQuestion[3] = true;
          }
        });
      });
      allEmote.push(emotePerQuestion);
      emotePerQuestion = [false, false, false, false];
    });
  }

  async function handleOnSendReport() {
    await setData();
    await history.push({
      pathname: "/report",
      state: {
        checkBox: groupTest,
        clickTime: clickTime,
        reactionTime: hoverTime,
        emotion: allEmote,
        uuid: uuid,
        behavior: behavior,
        questionnaire_uuid: questionnaire_uuid,
      },
    });
  }
}

export default ReportWorker;

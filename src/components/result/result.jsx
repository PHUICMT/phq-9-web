import "./result.scss";
import Send from '../../assets/icons/send.svg'

import { useState, useEffect } from 'react';
import { Container } from 'react-bulma-components';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import { useHistory } from 'react-router-dom'

let allEmote = [];

function Result(props) {
    const [score, setScore] = useState();
    const [start_end_time, setStart_end_time] = useState([]);
    const [total_emotion_time, setTotal_emotion_time] = useState([]);
    const [hoverTime, setHoverTime] = useState([]);
    const [fontEndTimeStamp, setFontEndTimeStamp] = useState([]);
    const [clickTime, setClickTime] = useState([]);
    const [backend_start_end_time, setBackend_start_end_time] = useState([]);
    const [total_emotion, setTotal_emotion] = useState([]);

    const [groupTest, setGroupTest] = useState(1);
    let history = useHistory();

    useEffect(() => {
        setScore(props.score);
        setStart_end_time(props.start_end_time);
        setTotal_emotion_time(props.total_emotion_time);
        setHoverTime(props.hoverTime);
        setFontEndTimeStamp(props.fontEndTimeStamp);
        setClickTime(props.clickTime);
        setBackend_start_end_time(props.backend_start_end_time);
        setTotal_emotion(props.total_emotion);
    }, [
        score,
        start_end_time,
        total_emotion_time,
        hoverTime,
        fontEndTimeStamp,
        clickTime,
        backend_start_end_time,
        total_emotion,
        groupTest,
        props.score,
        props.backendData,
        props.start_end_time,
        props.total_emotion_time,
        props.hoverTime,
        props.fontEndTimeStamp,
        props.clickTime,
        props.backend_start_end_time,
        props.total_emotion,
    ]);

    async function setData() {
        if (typeof (total_emotion_time) !== 'undefined') {
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
                    if ((timeStamp > start) && (timeStamp < end)) {
                        emotePerQuestion[0] = true;
                    }
                });
                Happy.map((timeStamp) => {
                    if ((timeStamp > start) && (timeStamp < end)) {
                        emotePerQuestion[1] = true;
                    }
                });
                Neutral.map((timeStamp) => {
                    if ((timeStamp > start) && (timeStamp < end)) {
                        emotePerQuestion[2] = true;
                    }
                });
                Sad.map((timeStamp) => {
                    if ((timeStamp > start) && (timeStamp < end)) {
                        emotePerQuestion[3] = true;
                    }
                });

            });
            allEmote.push(emotePerQuestion);
            emotePerQuestion = [false, false, false, false];
        });
    }

    const handleRadioChange = (event) => {
        setGroupTest(event.target.value);
    };

    const TextResults = () => {

        if (props.score > 19) {
            return { 'color': '#DB5451', 'result': 'ท่านมีอาการซึมเศร้าระดับรุนแรงมาก', 'info': 'ต้องพบแพทย์เพื่อประเมินอาการและให้การรักษาโดยเร็ว ไม่ควรปล่อยทิ้งไว้' };
        } else if (props.score > 14) {
            return { 'color': '#E89E60', 'result': 'ท่านมีอาการซึมเศร้าระดับรุนแรงค่อนข้างมาก', 'info': 'ควรพบแพทย์เพื่อประเมินอาการและให้การรักษาระหว่างนี้ควรพักผ่อนให้เพียงพอ นอนหลับให้ได้ 6-8 ชั่วโมง ออกกำลังกายเบาๆ ทำกิจกรรมที่ทำให้ผ่อนคลาย ไม่เก็บตัว และควรขอคำปรึกษาช่วยเหลือจากผู้ใกล้ชิด' };
        } else if (props.score > 8) {
            return { 'color': '#FCCD3A', 'result': 'ท่านมีอาการซึมเศร้าระดับปานกลาง', 'info': 'ควรพักผ่อนให้เพียงพอ นอนหลับให้ได้ 6-8 ชั่วโมง ออกกำลังกายสม่ำเสมอ ทำกิจกรรมที่ทำให้ผ่อนคลาย พบปะเพื่อนฝูง ควรขอคำปรึกษาช่วยเหลือจากผู้ที่ไว้วางใจ ไม่จมอยู่กับปัญหา มองหาหนทางคลี่คลาย หากอาการที่ท่านเป็นมีผลกระทบต่อการทำงานหรือการเข้าสังคม (อาการซึมเศร้าทำให้ท่านมีปัญหาในการทำงาน การดูแลสิ่งต่าง ๆ ในบ้าน หรือการเข้ากับผู้คน ในระดับมากถึงมากที่สุด) หรือหากท่านมีอาการระดับนี้มานาน 1-2 สัปดาห์แล้วยังไม่ดีขึ้น ควรพบแพทย์เพื่อรับการช่วยเหลือรักษา' };
        } else if (props.score > 4) {
            return { 'color': '#6BAD8F', 'result': 'ท่านมีอาการซึมเศร้าระดับเล็กน้อย', 'info': 'ควรพักผ่อนให้เพียงพอ นอนหลับให้ได้ 6-8 ชั่วโมง ออกกำลังกายสม่ำเสมอ ทำกิจกรรมที่ทำให้ผ่อนคลาย พบปะเพื่อนฝูง ควรทำแบบประเมินอีกครั้งใน 1 สัปดาห์' };
        } else {
            return { 'color': '#79CFDA', 'result': 'ท่านไม่มีอาการซึมเศร้าหรือมีก็เพียงเล็กน้อย', 'info': 'ไม่จำเป็นต้องรักษา' };
        }

    }

    const result = TextResults();
    const resultStyleColor = {
        color: result['color']
    };
    const resultStyleBorderColor = {
        backgroundColor: result['color'] + '1c',
    };

    async function handleOnSendReport() {
        await setData();
        await history.push({
            pathname: '/report',
            state: {
                checkBox: groupTest,
                clickTime: clickTime,
                reactionTime: hoverTime,
                emotion: allEmote,
            },
        });
    }


    return (
        <Container className="result-card-container">
            <div className="result-card" id="result-card-container" style={resultStyleBorderColor}>
                <div className="result-textgroup">
                    <div className="result-card-text">
                        <div className="result-card-text title-1">ผลการทดสอบ<br /><p style={resultStyleColor}> {props.score} คะแนน</p></div>
                        <div className="result-card-text result-text" style={resultStyleColor}>{result['result']}</div>
                        <div className="result-card-text title-info">ข้อแนะนำการดูแล</div>
                        <div className="result-card-text info-text">{result['info']}</div>
                    </div>

                    <div className="result-card-icon" />
                </div>

                <div className="group-selected">
                    <div className="title">
                        <h>อาสาสมัคร : </h>
                    </div>
                    <div className="radio-box">
                        <Radio
                            checked={groupTest == 1}
                            onChange={handleRadioChange}
                            value={1}
                        />
                        <h className={`${groupTest == 1 ? 'checkedText' : ''} clickable`} onClick={() => setGroupTest(1)}>กลุ่มที่ 1</h>
                    </div>

                    <div className="radio-box">
                        <Radio
                            checked={groupTest == 2}
                            onChange={handleRadioChange}
                            value={2}
                        />
                        <h className={`${groupTest == 2 ? 'checkedText' : ''} clickable`} onClick={() => setGroupTest(2)}>กลุ่มที่ 2</h>
                    </div>

                    <div className="radio-box">
                        <Radio
                            checked={groupTest == 3}
                            onChange={handleRadioChange}
                            value={3}
                        />
                        <h className={`${groupTest == 3 ? 'checkedText' : ''} clickable`} onClick={() => setGroupTest(3)}>กลุ่มที่ 3</h>
                    </div>
                </div>

                <div className="button-group-container">
                    <Button
                        onClick={() => handleOnSendReport()}
                        variant="contained"
                        size="large"
                        className="submit-button"><img alt='send' src={Send} /> รายงานผล
                    </Button>
                </div>
            </div>
        </Container>
    );
};

export default Result;


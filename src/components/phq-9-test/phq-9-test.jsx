import "./phq-9-test.scss";
import IndexBox from '../../assets/icons/index-box.svg'

import Result from '../result/result'
import PHQTitleCard from '../../components/phq-9-title-card/phq-9-title-card'
import { QuestionnaireSenderService, ResultAnswerSenderService, VideoSenderService } from "../../services/video-sender-service";

import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Container } from 'react-bulma-components';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import update from 'react-addons-update';
import { v4 as uuidv4 } from 'uuid';

const questionnaire_uuid = uuidv4();

try {
    QuestionnaireSenderService(questionnaire_uuid);
} catch (err) { }

const PHQTestComponent = () => {
    const location = useLocation();
    const [totalValues, setTotalValues] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [isResultSubmit, setIsResultSubmit] = useState(false);
    const [totalScore, setTotalScore] = useState();
    const [dataFromBackend, setDataFromBackend] = useState(null);
    const allowsRecord = useState(location.state)[0];

    const [isScreenRecord, setIsScreenRecord] = useState(false);
    const [isVideoRecord, setIsVideoRecord] = useState(false);
    const [streamWebcam, setStreamWebcam] = useState(null);
    const [streamScreen, setStreamScreen] = useState(null);

    function stopRecord() {
        streamWebcam.getTracks().forEach((track) => track.stop());
        streamScreen.getTracks().forEach((track) => track.stop());
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    function handleRecord({ stream, mimeType }, recordType, uuid) {
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
            return VideoSenderService(blob, recordType, uuid);
        };
        mediaRecorder.start(200);
    }

    async function recordVideo(uuid) {
        const mimeType = "video/webm";
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true,
        });
        setStreamWebcam(stream);
        handleRecord({ stream, mimeType }, "webcam", uuid);
    }

    async function recordScreen(uuid) {
        const mimeType = "video/webm";
        const stream = await navigator.mediaDevices.getDisplayMedia({
            audio: false,
            video: true,
        });
        setStreamScreen(stream);
        handleRecord({ stream, mimeType }, "screen", uuid);
    }


    const SVGNo = (index) => {
        return (
            <div className="index-box">
                <h className="index-text">{index}</h>
                <img src={IndexBox} />
            </div>
        );

    }

    function Recording() {
        var temp_backend = null;
        useEffect(() => {
            if (!isScreenRecord && allowsRecord['screenToggleAllows']) {
                setIsScreenRecord(true);
                recordScreen(questionnaire_uuid);
            }

            if (!isVideoRecord && allowsRecord['webcamToggleAllows']) {
                setIsVideoRecord(true);
                recordVideo(questionnaire_uuid);
            }
        }, [isScreenRecord, isVideoRecord]);
        return temp_backend;
    };


    const TestComp = (index, text) => {
        var className = index % 2;
        const [value, setValue] = useState(0);
        const handleCheckedChange = (n) => {
            setValue(n)
            const tmp_totalValue = update(totalValues, { [index - 1]: { $set: n } });
            setTotalValues(tmp_totalValue);
        };
        const formContainer = (n) => {
            return (
                <FormControlLabel
                    value={n}
                    checked={value == n}
                    onChange={() => handleCheckedChange(n)}
                    control={<Radio />}
                    label={<Typography style={(value == n) ? { fontWeight: 'bold' } : null}>{n}</Typography>}
                    labelPlacement="bottom"
                    disabled={isResultSubmit ? true : false}
                />
            );
        }
        return (
            <div className={`test-component _${className}`} id={`id_${index}`}>
                {SVGNo(index)}
                <div></div>
                <h>{text}</h>
                <div className="Slider-container">
                    <FormControl component="fieldset">
                        <RadioGroup row aria-label="position" name="position" defaultValue="top">
                            {formContainer(0)}
                            {formContainer(1)}
                            {formContainer(2)}
                            {formContainer(3)}
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
        );
    }

    function handleOnSubmit() {
        const sum = totalValues.reduce((result, number) => result + number);
        setTotalScore(sum);
        stopRecord();
        setIsResultSubmit(true);
        ResultAnswerSenderService(questionnaire_uuid, totalValues, null);
        console.log(dataFromBackend);


        // useEffect(() => {
        //     if (allowsRecord['webcamToggleAllows']) {
        //         await Promise.all([
        //             getData = window.localStorage.getItem("data"),
        //             console.log(getData)
        //         ]).then(() => {
        //             setDataFromBackend(getData);
        //             window.localStorage.clear();
        //             setIsLoaded(true);
        //         })
        //     }
        //     console.log(dataFromBackend);
        // }, [isLoaded]);

        handleScrollToResult();
    }

    function handleScrollToResult() {
        var i = 0;
        while (i < 5) {
            i++;
            try {
                setTimeout(() => {
                    var container = document.getElementById('result-card-container');
                    container.scrollIntoView({ behavior: "smooth", block: 'center' })
                }, 500)
                break;
            } catch {
            }
        }
    }

    return (
        <div>
            <Recording />
            <PHQTitleCard />
            <Container className="test-container">
                {TestComp(1, "เบื่อ ทำอะไร ๆ ก็ไม่เพลิดเพลิน")}
                {TestComp(2, "ไม่สบายใจ ซึมเศร้า หรือท้อแท้")}
                {TestComp(3, "หลับยาก หรือหลับ ๆ ตื่น ๆ หรือหลับมากไป")}
                {TestComp(4, "เหนื่อยง่าย หรือไม่ค่อยมีแรง")}
                {TestComp(5, "เบื่ออาหาร หรือกินมากเกินไป")}
                {TestComp(6, "รู้สึกไม่ดีกับตัวเอง คิดว่าตัวเองล้มเหลว หรือเป็นคนทำให้ตัวเอง หรือครอบครัวผิดหวัง")}
                {TestComp(7, "สมาธิไม่ดีเวลาทำอะไร เช่น ดูโทรทัศน์ ฟังวิทยุ หรือทำงานท่ีต้องใช้ความตั้งใจ")}
                {TestComp(8, "พูดหรือทำอะไรช้าจนคนอื่นมองเห็น หรือกระสับกระส่ายจนท่านอยู่ไม่นิ่งเหมือนเคย")}
                {TestComp(9, "คิดทำร้ายตนเอง หรือคิดว่าถ้าตาย ๆ ไปเสียคงจะดี")}

                {isResultSubmit ? <Result score={totalScore} data={dataFromBackend} /> : <Button
                    variant="contained"
                    size="large"
                    className="submit-button"
                    onClick={() => handleOnSubmit()}
                >ส่งคำตอบ</Button>}
            </Container>
        </div>
    );
};

export default PHQTestComponent;
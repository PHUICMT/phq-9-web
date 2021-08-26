import "./phq-9-test.scss";
import IndexBox from '../../assets/icons/index-box.svg'

import Result from '../result/result'
import { recordScreen, recordVideo, stopRecord } from '../../services/video-record';

import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Container } from 'react-bulma-components';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import update from 'react-addons-update';

import PHQTitleCard from '../../components/phq-9-title-card/phq-9-title-card'

const PHQTestComponent = () => {
    const location = useLocation();
    const [totalValues, setTotalValues] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [isResultSubmit, setIsResultSubmit] = useState(false);
    const [totalScore, setTotalScore] = useState();
    const [dataFromBackend, setDataFromBackend] = useState(null);
    const allowsRecord = useState(location.state)[0];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const PHQSlider = withStyles({
        root: {
            color: '#6C5CE7',
            height: 8,
        },
        thumb: {
            height: 18,
            width: 18,
            backgroundColor: '#6C5CE7',
            border: '2px solid #FFFFFF',
            marginTop: -5,
            marginLeft: -12,
            '&:focus, &:hover, &$active': {
                boxShadow: 'inherit',
            },
        },
        track: {
            height: 8,
            borderRadius: 4,
        },
        rail: {
            color: '#444444',
            opacity: 1,
            height: 8,
            borderRadius: 4,
        },
        mark: {
            opacity: 0,
        },
        markLabelActive: {
            color: '#6C5CE7',
        },
        active: {}
    })(Slider);

    const marks = [
        {
            value: 0,
            label: '0',
        },
        {
            value: 1,
            label: '1',
        },
        {
            value: 2,
            label: '2',
        },
        {
            value: 3,
            label: '3',
        },
    ];

    const SVGNo = (index) => {
        return (
            <div className="index-box">
                <h className="index-text">{index}</h>
                <img src={IndexBox} />
            </div>
        );

    }

    function Recording() {
        const [isScreenRecord, setIsScreenRecord] = useState(false);
        const [isVideoRecord, setIsVideoRecord] = useState(false);

        useEffect(() => {
            if (!isScreenRecord && allowsRecord['screenToggleAllows']) {
                setIsScreenRecord(true);
                recordScreen();
            }

            if (!isVideoRecord && allowsRecord['webcamToggleAllows']) {
                setIsVideoRecord(true);
                recordVideo();
            }
        }, [isScreenRecord, isVideoRecord]);
    };


    const TestComp = (index, text) => {
        const [value, setValue] = useState(0);
        const handleSliderChange = (event, newValue) => {
            setValue(newValue);
            const tmp_totalValue = update(totalValues, { [index - 1]: { $set: newValue } });
            setTotalValues(tmp_totalValue);
        };
        var className = index % 2;
        return (
            <div className={`test-component _${className}`}>
                {SVGNo(index)}
                <div></div>
                <h>{text}</h>
                <div className="Slider-container">
                    <PHQSlider
                        value={value}
                        onChange={handleSliderChange}
                        aria-labelledby="discrete-slider-restrict"
                        step={null}
                        valueLabelDisplay="on"
                        marks={marks}
                        min={0}
                        max={3}
                    />
                </div>
            </div>
        );
    }

    async function handleOnSubmit() {
        const sum = totalValues.reduce((result, number) => result + number);
        setTotalScore(sum);
        stopRecord(totalValues, null);
        setIsResultSubmit(true);
        if (allowsRecord['webcamToggleAllows']) {
            while (dataFromBackend == null) {
                setDataFromBackend(await window.localStorage.getItem("data"));
                console.log(dataFromBackend);
                window.localStorage.clear();
            }
        }
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
            {Recording()}
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
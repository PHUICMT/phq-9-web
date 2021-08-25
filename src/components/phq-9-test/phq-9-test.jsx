import "./phq-9-test.scss";
import IndexBox from '../../assets/icons/index-box.svg'
import Result from '../result/result'

import { useState } from "react";
import { Container } from 'react-bulma-components';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import update from 'react-addons-update';

const PHQTestComponent = () => {
    const [totalValues, setTotalValues] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [isResultSubmit, setIsResultSubmit] = useState(false);
    const [totalScore, setTotalScore] = useState();

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

    function handleOnSubmit() {
        const sum = totalValues.reduce((result, number) => result + number);
        setTotalScore(sum);
        setIsResultSubmit(true);
    }

    return (
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
            <Button
                variant="contained"
                size="large"
                className="submit-button"
                onClick={() => handleOnSubmit()}
                >ส่งคำตอบ</Button>

            {isResultSubmit ? <Result score={totalScore} /> : <></>}

        </Container>
    );
};

export default PHQTestComponent;
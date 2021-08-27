import "./result.scss";
import Download from '../../assets/icons/download-icon.svg'
import Retry from '../../assets/icons/retry.svg'

import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { Container } from 'react-bulma-components';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'



function Result(props) {
    const responseFromBackend = props.data;
    console.log(responseFromBackend);
    // const resultFromBackend  = () => {
    //     return (
    //         {
    //             "angry" : props.data["angry"],
    //             "disgust" : props.data["disgust"],
    //             "scared" : props.data["scared"], 
    //             "happy" : props.data["happy"], 
    //             "sad" : props.data["sad"], 
    //             "surprised" : props.data["surprised"], 
    //             "neutral" : props.data["neutral"]
    //         }
    //     );
    // }

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

    function handleOnSaveResult() {
        var container = document.getElementById('result-card-container');
        container.style.backgroundColor = "#FFFF";
        domtoimage.toBlob(container)
            .then(function (blob) {
                saveAs(blob, '[PHQ-9]Result.png');
            }).finally(function () {
                container.style.backgroundColor = result['color'] + '1c';
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

                <div className="button-group-container">
                    <Button
                        onClick={() => handleOnSaveResult()}
                        variant="contained"
                        size="large"
                        className="submit-button"><img src={Download} />บันทึกผลการทดสอบ
                    </Button>

                    <Button
                        component={Link}
                        to={'/index'}
                        variant="contained"
                        size="large"
                        className="retry-button"><img src={Retry} />ทำแบบทดสอบอีกครั้ง
                    </Button>
                </div>
            </div>
        </Container>
    );
};

export default Result;


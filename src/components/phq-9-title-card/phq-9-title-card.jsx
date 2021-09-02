import "./phq-9-title-card.scss";
import Sad from "../../assets/icons/sad-01.svg"

import { Container } from 'react-bulma-components';

const PHQTitleCard = () => {
    return (
        <Container>
            <div className="phq-title-card">
                <div>
                    <div className="title">โปรดใส่คะแนนให้ตรงกับคำตอบของท่าน</div>
                    <div className="rules">เกณฑ์ให้คะแนน : <br/>ไม่เลย = 0, มีบางวันหรือไม่บ่อย = 1, มีค่อนข้างบ่อย = 2, มีเกือบทุกวัน = 3</div>
                    <div className="detail">ในช่วง <b>2 สัปดาห์</b> ที่ผ่านมา ท่านมีอาการดังต่อไปนี้บ่อยแค่ไหน?</div>
                </div>
                <img alt='sad' src={Sad}/>
            </div>
        </Container>
    );
};

export default PHQTitleCard;
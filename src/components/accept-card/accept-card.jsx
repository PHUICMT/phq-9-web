import "./accept-card.scss";

import { Container } from 'react-bulma-components';

const AcceptCard = () => {
    return (
        <Container>
            <div className="accept-card">
                <div className="accept-card-text">
                    <div className="accept-card-text title-1">ขออนุญาตเปิดใช้งานสิทธิ์</div>
                    <div className="accept-card-text title-2">เพื่อประสิทธิภาพในการวินิจฉัยภาวะซึมเศร้าโดยใช้ระบบ AI เว็บไซต์นี้จึงจำเป็นต้องเปิดใช้งานสิทธิ์ดังนี้</div>
                </div>
                <div className="accept-card-icon" />
            </div>
        </Container>
    );
};

export default AcceptCard;
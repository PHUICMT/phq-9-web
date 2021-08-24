import "./header-with-icon.scss";

import React from 'react';
import { Container, Columns } from 'react-bulma-components';

const HeaderWithIcon = () => {
    return (
        <Container>
            <div className="header-with-icon">
                <div className="header-bg" />
            </div>
            <div className="title-box">
                <h className="title-1">แบบทดสอบ</h>
                <h className="title-2">ภาวะซึมเศร้า PHQ-9</h>
            </div>
        </Container>
    );
};

export default HeaderWithIcon;
import "./accept-toggle.scss";

import { React, useState, useEffect } from 'react';
import { Container } from 'react-bulma-components';
import Toggle from 'react-toggle'

const AcceptToggle = () => {
    const [webcamToggleAllows, setWebcamToggleAllows] = useState(true);
    const [screenToggleAllows, setScreenToggleAllows] = useState(true);


    return (
        <Container className="container-box">
            <div className="accept-toggle-container">
                <div className="accept-toggle-box">
                    <Toggle
                        defaultChecked={webcamToggleAllows}
                        className="custom-react-toggle"
                        onChange={() => setWebcamToggleAllows(!webcamToggleAllows)}
                    />
                    <h>เข้าถึงกล้อง Webcam และบันทึกวิดีโอ</h>
                </div>

                <div className="accept-toggle-box">
                    <Toggle
                        defaultChecked={screenToggleAllows}
                        className="custom-react-toggle"
                        onChange={() => setScreenToggleAllows(!screenToggleAllows)}
                    />
                    <h>บันทึกวิดีโอหน้าจอ</h>
                </div>
            </div>
        </Container>
    );
};

export default AcceptToggle;
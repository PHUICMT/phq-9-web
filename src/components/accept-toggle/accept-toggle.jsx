import "./accept-toggle.scss";
import WebcamActive from "../../assets/icons/video-active.svg"
import WebcamDeActive from "../../assets/icons/video-deactive.svg"
import ScreenActive from "../../assets/icons/screen-active.svg"
import ScreenDeActive from "../../assets/icons/screen-deactive.svg"

import { React, useState } from 'react';
import { Container } from 'react-bulma-components';
import Toggle from 'react-toggle'
import Button from '@material-ui/core/Button';

import PHQTitleCard from '../phq-9-title-card/phq-9-title-card'
import PHQTestComponent from '../phq-9-test/phq-9-test'

const AcceptToggle = () => {
    const [webcamToggleAllows, setWebcamToggleAllows] = useState(true);
    const [screenToggleAllows, setScreenToggleAllows] = useState(true);


    return (
        <Container>
            <Container className="container-box">
                <div className="accept-toggle-container">
                    <div className="accept-toggle-box">
                        <Toggle
                            defaultChecked={webcamToggleAllows}
                            className="custom-react-toggle"
                            onChange={() => setWebcamToggleAllows(!webcamToggleAllows)}
                        />
                        <h>เข้าถึงกล้อง Webcam และบันทึกวิดีโอ</h>
                        <img src={webcamToggleAllows ? WebcamActive : WebcamDeActive} />
                    </div>

                    <div className="accept-toggle-box">
                        <Toggle
                            defaultChecked={screenToggleAllows}
                            className="custom-react-toggle"
                            onChange={() => setScreenToggleAllows(!screenToggleAllows)}
                        />
                        <h>บันทึกวิดีโอหน้าจอ</h>
                        <img src={screenToggleAllows ? ScreenActive : ScreenDeActive} />
                    </div>
                </div>

                <div>
                    <Button
                        variant="contained"
                        size="large"
                        className="submit-button">ยืนยัน</Button>
                </div>
            </Container>

            <PHQTitleCard/>
            <PHQTestComponent/>
        </Container>
    );
};

export default AcceptToggle;
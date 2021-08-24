import "./accept-toggle.scss";

import { React, useState, useEffect } from 'react';
import { Container } from 'react-bulma-components';
import Toggle from 'react-toggle'

const AcceptToggle = () => {
    const [webcamToggleAllows, setWebcamToggleAllows] = useState(true);
    const [screenToggleAllows, setScreenToggleAllows] = useState(true);


    return (
        <Container>
            <div className="">
                <Toggle
                    defaultChecked={webcamToggleAllows}
                    className="custom-react-toggle"
                    onChange={() => setWebcamToggleAllows(!webcamToggleAllows)}
                />

            </div>

            <div className="">
                <Toggle
                    defaultChecked={screenToggleAllows}
                    className="custom-react-toggle"
                    onChange={() => setScreenToggleAllows(!screenToggleAllows)}
                />

            </div>
        </Container>
    );
};

export default AcceptToggle;
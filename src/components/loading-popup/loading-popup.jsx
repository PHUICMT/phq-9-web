import './loading-popup.scss';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Lottie from 'react-lottie';
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Loader from "react-loader-spinner";

import animationData from './send-e-mail.json'


export const LoadingPopup = (props) => {

    const [open, setOpen] = React.useState(props.open);

    const loadingPopUp = React.useRef(null);
    React.useEffect(() => {
        setOpen(props.open);
        if (open) {
            const { current: loadingPopUpElement } = loadingPopUp;
            if (loadingPopUpElement !== null) {
                loadingPopUpElement.focus();
            }
        }
    }, [open, props.open]);

    return (
        <div>
            <Dialog
                className="loading-popup"
                open={open}
            >
                <DialogContent>
                    <DialogContentText
                        id="loding-popup"
                        ref={loadingPopUp}
                        tabIndex={-1}
                    >
                        <Loader
                            type="Bars"
                            color="#00d9aa"
                            height={200}
                            width={200}
                        />
                        <div className="text-loding">
                            ระบบกำลังประมวลผล
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );

}

export const MailSenderPopup = (props) => {
    const [open, setOpen] = React.useState(props.open);

    const loadingPopUp = React.useRef(null);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    React.useEffect(() => {
        setOpen(props.open);
        if (open) {
            const { current: loadingPopUpElement } = loadingPopUp;
            if (loadingPopUpElement !== null) {
                loadingPopUpElement.focus();
            }
        }
    }, [open, props.open]);

    return (
        <div>
            <Dialog
                className="mail-popup"
                open={open}
            >
                <DialogContent>
                    <DialogContentText
                        id="loding-popup"
                        ref={loadingPopUp}
                        tabIndex={-1}
                    >
                        <Lottie
                            options={defaultOptions}
                            height={640}
                            width={640}
                        />
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default { LoadingPopup, MailSenderPopup };
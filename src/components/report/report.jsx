import "./report.scss";
import Download from '../../assets/icons/download-icon.svg'
import CheckOn from '../../assets/icons/check-box-on.svg'
import CheckOff from '../../assets/icons/check-box-off.svg'
import Angry from '../../assets/icons/angry-icon.svg'
import Happy from '../../assets/icons/happy-icon.svg'
import Neutral from '../../assets/icons/neutral-icon.svg'
import Sad from '../../assets/icons/sad-icon.svg'
import QuestionnaireIcon from '../../assets/icons/questionnaire-icon.svg'

import React from 'react';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { Container } from 'react-bulma-components';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';




export function Report(props) {
    const checkBox = props.location.state.checkBox;

    function checkBoxSelected(type) {
        if (checkBox == type) {
            return CheckOn;
        }
        return CheckOff;
    }
    function checkBoxSelectedTextHighlight(type) {
        if (checkBox == type) {
            return true;
        }
        return false;
    }

    function createData(ItemQuestion, ClickTime, ReactionTime, Emotion) {
        return { ItemQuestion, ClickTime, ReactionTime, Emotion };
    }

    const rows = [
        createData('Question 1', null, null, null),
        createData('Question 2', null, null, null),
        createData('Question 3', null, null, null),
        createData('Question 4', null, null, null),
        createData('Question 5', null, null, null),
        createData('Question 6', null, null, null),
        createData('Question 7', null, null, null),
        createData('Question 8', null, null, null),
        createData('Question 9', null, null, null),
    ];

    const useStyles = makeStyles({
        table: {
            minWidth: 700,
            maxWidth: 1100,
        },
    });

    function handleOnSaveResult() {
        var container = document.getElementById('report-paper');
        domtoimage.toBlob(container, {
            style: {
                'font-family': 'Prompt'
            }
        })
            .then(function (blob) {
                saveAs(blob, '[PHQ-9]Result.png');
            });
    }


    const classes = useStyles();
    return (
        <Container className="report-container">
            <div className="space-top"></div>
            <div className="paper-container" id="report-paper">
                <div className="form-header-box">
                    <div className="form-text-header">
                        <p className="personal-id">รหัส .........................</p>
                        <center><strong><p>รายงานวิเคราะห์แนวโน้มภาวะซึมเศร้า</p></strong></center>
                        <div className="group-type">
                            <p>ประเภทกลุ่มตัวอย่าง</p>
                            <p id={`${checkBoxSelectedTextHighlight(1) ? 'selected-group' : ''}`}><img src={checkBoxSelected(1)} /> ปกติ</p>
                            <p id={`${checkBoxSelectedTextHighlight(2) ? 'selected-group' : ''}`}><img src={checkBoxSelected(2)} /> มีภาวะซึมเศร้า</p>
                            <p id={`${checkBoxSelectedTextHighlight(3) ? 'selected-group' : ''}`}><img src={checkBoxSelected(3)} /> กำลังรักษา</p>
                        </div>
                        <div className="personal-info">
                            <p>เพศ ...................</p>
                            <p>อายุ ...................</p>
                            <p>สถานภาพ .........................</p>
                        </div>
                    </div>
                    <div className="form-emotion">
                        <div className="icon-symbol"><img src={Angry} /><h style={{ color: '#B5453C' }}>Angry</h></div>
                        <div className="icon-symbol"><img src={Happy} /><h style={{ color: '#00D4D4' }}>Happy</h></div>
                        <div className="icon-symbol"><img src={Neutral} /><h style={{ color: '#699DEE' }}>Neutral</h></div>
                        <div className="icon-symbol"><img src={Sad} /><h style={{ color: '#2E3552' }}>Sad</h></div>
                    </div>
                </div>
                <TableContainer className="table-container">
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ITEM QUESTION</TableCell>
                                <TableCell align="center">CLICK TIME</TableCell>
                                <TableCell align="center">REACTION TIME (Sec.)</TableCell>
                                <TableCell align="center">EMOTION</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.ItemQuestion}>
                                    <TableCell component="th" scope="row">{row.ItemQuestion}</TableCell>
                                    <TableCell align="center">{row.ClickTime}</TableCell>
                                    <TableCell align="center">{row.ReactionTime}</TableCell>
                                    <TableCell align="center">{row.Emotion}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className="button-group-container">
                    <Button
                        onClick={() => handleOnSaveResult()}
                        variant="contained"
                        size="large"
                        className="submit-button"><img src={Download} />&nbsp;บันทึกผลการทดสอบ
                    </Button>
                    <Button
                        target="_blank"
                        href="http://www.google.com/"
                        variant="contained"
                        size="large"
                        className="retry-button"><img src={QuestionnaireIcon} />&nbsp;ทำแบบประเมิน
                    </Button>
                </div>
            </div>
        </Container>
    );
};

export default Report;


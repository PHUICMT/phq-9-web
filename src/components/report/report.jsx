import "./report.scss";
import Send from '../../assets/icons/send.svg'

import { Container } from 'react-bulma-components';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';



export function Report(props) {

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


    const classes = useStyles();
    return (
        <Container className="report-container">

            <Container className="form-container">
                <div className="form-header">

                </div>
                <div className="form-emotion">

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
            </Container>
        </Container>
    );
};

export default Report;


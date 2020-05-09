import React from "react";
import s from "./Quiz.module.css";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";

const StartTest = (props) => {
    return (<div>
            <div className={s.dialogActions}>
                <div className={s.typography}>

                </div>
            </div>
            < div
                className={s.dialogContent}>
                <Typography
                    variant='h6'
                    color='textSecondary'> There
                    are
                    questions </Typography>
                <Typography className={s.description} variant='h4'></Typography>
            </div>
            <Button color='primary' onClick={props.start} variant='contained'>Start test</Button>
        </div>
    )
};
export default StartTest;
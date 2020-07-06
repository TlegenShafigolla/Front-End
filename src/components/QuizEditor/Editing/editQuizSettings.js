import React from "react";
import s from './css/editQuizz.module.css'
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import {Tooltip} from "@material-ui/core";

const EditQuizSettings = (props) => {

    let pointsChecked = (event) => {
        props.pointsChecked(event.target.checked);
    };

    return (
        <div className={s.QuizSettings}>
            <div className={s.SwitchLine}>
                <Tooltip title={"Grading system. Answers can be correct or wrong."}>
                    <Typography className={s.SwitchTextLeft}>Use Correct/Wrong</Typography>
                </Tooltip>
                <Switch className={s.Switch}
                        color="primary"
                        value={"active"}
                        onChange={pointsChecked}
                        checked={props.points}/>
                <Tooltip title={"Grading system. Any answer can have own weight."}>
                    <Typography className={s.SwitchTextRight}>Use Points</Typography>
                </Tooltip>
            </div>
            <Typography color='textSecondary'
                        variant={'body2'}> version: {new Date(props.lastedit).toLocaleString()}</Typography>
        </div>
    );
}

export default EditQuizSettings;
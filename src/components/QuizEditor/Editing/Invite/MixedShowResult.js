import s from "./invite.module.css";
import {Tooltip} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Field} from "redux-form";
import {renderSwitch} from "../../../common/Switch";
import React from "react";

const MixedShowResult = () => {
    return (
        <div className={s.Settings}>
            <div className={s.SwitchLine}>
                <Tooltip
                    title={"During the quiz, your questions will be shown in the order in which you see them now."}>
                    <Typography className={s.SwitchTextLeft}>In-order</Typography>
                </Tooltip>
                <Field component={renderSwitch} className={s.Switch}
                       color="primary"
                       value={"active"}
                       name="Mixed"
                />
                <Tooltip title={"During the quiz, your questions will be shown in mixed order."}>
                    <Typography className={s.SwitchTextRight}>Mixed</Typography>
                </Tooltip>
            </div>
            <div className={s.SwitchLine}>
                <Tooltip title={"After taking this quiz, results won't be shown."}>
                    <Typography className={s.SwitchTextLeft}>Don't show results</Typography>
                </Tooltip>
                <Field
                    component={renderSwitch}
                    name="ShowResult"
                    className={s.Switch}
                    color="primary"
                    value={"active"}
                />
                <Tooltip title={"After taking this quiz, results will be shown."}>
                    <Typography className={s.SwitchTextRight}>Show results</Typography>
                </Tooltip>
            </div>
        </div>
    )
};
export default MixedShowResult;

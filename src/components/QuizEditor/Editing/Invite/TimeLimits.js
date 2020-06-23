import Grid from "@material-ui/core/Grid";
import {FormControlLabel} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import s from "./invite.module.css";
import {renderTextField} from "../../../common/TextField";
import React from "react";
import {Field} from "redux-form"

const TimeLimits = (props) => {
    return <Grid container
                 justify="space-around">
        <Grid item xs={12} lg={4} md={4} sm={4} xl={4}>
            <FormControlLabel control={<Checkbox onChange={(e)=>props.checkTime(e,s.StartDate)} color={"primary"}/>}
                              label={"Start date"}/>
            <div id="startDate" className={s.StartDate}>
                <Field
                    label="Start date"
                    type="datetime-local"
                    name="StartDate"
                    component={renderTextField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                />
            </div>
        </Grid>
        <Grid item xs={12} lg={4} md={4} sm={4} xl={4}>
            <FormControlLabel control={<Checkbox onChange={(e)=>props.checkTime(e,s.EndDate)} color={"primary"}/>}
                              label={"End date"}/>
            <div id="endDate" className={s.EndDate}>
                <Field
                    fullWidth
                    name='EndDate'
                    label="End date"
                    type="datetime-local"
                    component={renderTextField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
        </Grid>
        <Grid item xs={12} lg={4} md={4} sm={4} xl={4}>
            <FormControlLabel control={<Checkbox onChange={(e)=>props.checkTime(e,s.Timer)} color={"primary"}/>}
                              label={'Time Limit'}/>
            <div id="time" className={s.Timer}>
                <Field
                    fullWidth
                    label="Time limit"
                    type="time"
                    name="TimeLimit"
                    component={renderTextField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
        </Grid>
    </Grid>
};
export default TimeLimits
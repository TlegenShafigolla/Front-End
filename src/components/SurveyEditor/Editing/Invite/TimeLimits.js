import Grid from "@material-ui/core/Grid";
import { FormControlLabel} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import s from "../../css/inviteDialog.module.css";
import {Field} from "redux-form";
import {renderTextField} from "../../../common/TextField";
import React from "react";

const TimeLimits = (props) => {
    return <Grid container
                 justify="space-around">
        <Grid item xs={12} lg={4} md={4} sm={4} xl={4}>
            <FormControlLabel control={<Checkbox onChange={(e) => props.checkTime(e, s.StartDate)} color={"primary"}/>}
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
            <FormControlLabel control={<Checkbox onChange={(e) => props.checkTime(e, s.EndDate)} color={"primary"}/>}
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
    </Grid>
};
export default TimeLimits;
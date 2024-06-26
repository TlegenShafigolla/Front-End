    import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import s from '../css/showAnswer.module.css'
import Radio from "@material-ui/core/Radio";
import {Checkbox} from "@material-ui/core";

const ShowAnswer = (props) => {
    return (
        <>
            <div className={s.FormControl}>
                <FormControlLabel value="Type question"
                                  control={
                                      <Radio
                                          checked={props.answerType === 'MULTIPLE CHOICE'}
                                          disabled
                                          color="primary"
                                      />} label='Multiple Choice'/>
                <FormControlLabel value=""
                                  control={
                                      <Radio
                                          checked={props.answerType === 'FILL THE BLANK'}
                                          disabled={true}
                                      />} label='Fill the blank '/>
                <FormControlLabel value="Type question"
                                  control={
                                      <Radio
                                          checked={props.answerType === 'CHECKBOXES'}
                                          disabled={true}
                                      />} label='Checkboxes'/>
                                                 </div>
            {props.point?<Typography>
                {props.value.points} points
            </Typography>:null}
            <div>
                {props.answers[props.index] === undefined ? '' : props.answers[props.index].map((val, index) =>
                    <div className={s.Answer} key={val._id + index.toString()}>
                        <Typography variant="body1" noWrap>
                            {val.answer}
                        </Typography>
                                <Checkbox checked={val.points !== 0} disabled={true}/>
                    </div>
                )}
            </div>
        </>
    );
};
export default ShowAnswer;
import React from "react";
import s from "../Quizzes/Question.module.css";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import {Checkbox} from "@material-ui/core";
import Paper from "@material-ui/core/Paper/Paper";

class Question extends React.Component{
    render() {
        return(
            <Paper square elevation={3} id={this.props.value.order_id.toString()} className={s.Question}>
                <div>
                    <div className={s.QuestionInfo}>
                        <div className={s.QuestionOrder}>{this.props.value.order_id}.</div>
                        <div className={s.QuestionField}>
                            <Typography variant="body1" gutterBottom>{this.props.value.question}</Typography>
                        </div>
                    </div>
                    <div>
                        <div className={s.FormControl}>
                            <FormControlLabel value="Type question"
                                              control={
                                                  <Radio
                                                      checked={this.props.value.type === "MULTIPLE CHOICE"}
                                                      disabled={true}
                                                  />} label='Multiple Choice'/>
                            <FormControlLabel value=""
                                              control={
                                                  <Radio
                                                      checked={this.props.value.type === "FILL THE BLANK"}
                                                      disabled={true}
                                                  />} label='Fill the blank'/>
                        </div>
                        <div>
                            {this.props.value.answers === null ? '' : this.props.value.answers.map((val,index) =>
                                <div className={s.Answer} key={val._id+index.toString()}>
                                    <Typography variant="body1" noWrap>
                                        {val.answer}
                                    </Typography>
                                    {this.props.value.type === "MULTIPLE CHOICE" ?
                                            <Checkbox checked={false} disabled={true}/> : ''}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Paper>
        );
    }
}

export default Question;
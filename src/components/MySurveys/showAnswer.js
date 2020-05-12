import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import Typography from "@material-ui/core/Typography";
import {Checkbox} from "@material-ui/core";
import s from "./showAnswer.module.css";

class ShowAnswer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            question_id: this.props.question_id,
            multiple_choice: this.props.answerType === 'MULTIPLE CHOICE',
            fill_the_blank: this.props.answerType === 'FILL THE BLANK',
        };
    }

    render(){
        return(
            <div>
                <div className={s.FormControl}>

                    <FormControlLabel value="Type question"
                                      control={
                                          <Radio
                                              checked={this.state.multiple_choice}
                                              disabled={true}
                                          />} label='Multiple Choice'/>
                    <FormControlLabel value=""
                                      control={
                                          <Radio
                                              checked={this.state.fill_the_blank}
                                              disabled={true}
                                          />} label='Fill the blank '/>

                </div>
                <div>
                    {this.props.answers === null ? '' : this.props.answers.map((val,index) =>
                        <div className={s.Answer} key={val._id+index}>
                            <Typography variant="body1" noWrap>
                                {val.answer}
                            </Typography>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default ShowAnswer;
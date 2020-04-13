import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import s from './css/showAnswer.module.css'
import Radio from "@material-ui/core/Radio";
import {Checkbox} from "@material-ui/core";

class ShowAnswer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question_id: this.props.question_id,
            multiple_choice: this.props.answerType === 'MULTIPLE CHOICE',
            fill_the_blank: this.props.answerType === 'FILL THE BLANK',
        };

    }

    render() {
        return (
            <div>
                <div className={s.formControll}>

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
                    {this.props.answers === null ? '' : this.props.answers.map(val =>
                        <div className={s.answer} key={val.id}>
                            <Typography variant="body1" gutterBottom>
                                {val.answer}
                            </Typography>
                            {this.props.point ? <Typography variant="body1">{val.points} </Typography> :
                                <Checkbox checked={val.correct === 1} disabled={true}/>}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default ShowAnswer;
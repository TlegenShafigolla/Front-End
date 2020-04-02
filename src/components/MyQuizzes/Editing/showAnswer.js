import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import s from './css/showAnswer.module.css'
import Divider from "@material-ui/core/Divider";
import Radio from "@material-ui/core/Radio";

class ShowAnswer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question_id: props.question_id,
            multiple_choice: props.answerType === 'MULTIPLE CHOICE',
            fill_the_blank: props.answerType === 'FILL THE BLANK',
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
                <div className={s.answer}>
                    {this.props.answers === null ? '' : this.props.answers.map(val =>

                        <Typography  className={s.typography} variant="body1" gutterBottom key={val.id}>
                            {val.answer}
                        </Typography>
                    )}
                </div>
            </div>
        );
    }
}

export default ShowAnswer;
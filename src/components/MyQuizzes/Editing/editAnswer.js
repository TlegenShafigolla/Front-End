import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import s from './css/editAnswer.module.css'
import Radio from "@material-ui/core/Radio";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import FormControl from "@material-ui/core/FormControl";

class EditAnswer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question_id: props.question_id,
            multiple_choice: props.type === 'MULTIPLE CHOICE',
            fill_the_blank: props.type === 'FILL THE BLANK',
            answers: props.answers,
        };
    }

    multipleChoiceChecked = () => {
        this.setState({multiple_choice: true});
        this.setState({fill_the_blank: false});
        this.props.changeType('MULTIPLE CHOICE');
    };

    fillTheBlankChecked = () => {
        this.setState({multiple_choice: false});
        this.setState({fill_the_blank: true});
        this.props.changeType('FILL THE BLANK');
    };


    render() {
        return (
            <div>
                <div className={s.formControll}>
                    <FormControlLabel value="Type question"
                                      control={
                                          <Radio
                                              onChange={this.multipleChoiceChecked}
                                              checked={this.state.multiple_choice}
                                              color="primary"
                                          />} label='Multiple Choice'/>
                    <FormControlLabel value="Type question"
                                      control={
                                          <Radio
                                              color="primary"
                                              onChange={this.fillTheBlankChecked}
                                              checked={this.state.fill_the_blank}
                                          />} label='Fill the blank '/>

                </div>
                <div className={s.TextField}>
                    {this.state.answers === [] ? '' : this.state.answers.map((val, index) =>
                        <SaveAnswers
                            changeCheck={this.props.changeCheck}
                            changePoint={this.props.changePoint}
                            id={index.toString()}
                            key={index}
                            value={val}
                            onChangeAnswer={this.props.onChangeAnswer}
                            point={this.props.point}
                        />
                    )}
                </div>
            </div>
        );
    }
}

class SaveAnswers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            index: this.props.index,
            value: this.props.value
        }
    }

    render() {
        if (this.props.point) {
            return (
                <div className={s.SaveAnswer}>
                    <TextField
                        id={this.state.id}
                        key={this.state.index}
                        placeholder="Answer"
                        fullWidth
                        defaultValue={this.state.value.answer}
                        onChange={this.props.onChangeAnswer}
                    />
                    <div className={s.point}>
                        <InputBase
                            id={this.state.id}
                            key={this.state.index}
                            inputProps={{ 'aria-label': 'Point' }}
                            defaultValue={this.props.value.points}
                            onChange={this.props.changePoint}
                        />
                    </div>
                    <IconButton className={s.deleteButton} size='small' color='inherit'><HighlightOffIcon color='error'
                                                                                                          fontSize='small'/></IconButton>
                </div>

            );
        } else {
            return (
                <div className={s.SaveAnswer}>
                    <TextField
                        id={this.state.id}
                        key={this.state.index}
                        placeholder="Answer"
                        fullWidth
                        defaultValue={this.state.value.answer}
                        onChange={this.props.onChangeAnswer}
                    />
                    <FormControlLabel  control={
                    <Checkbox
                        id={this.state.id}
                        key={this.state.index}
                        color='primary'
                                checked={this.props.value.correct}
                    onChange={this.props.changeCheck}/>}
                                  />
                    <IconButton className={s.deleteButton} size='small' color='inherit'>
                        <HighlightOffIcon color='error'
                                          fontSize='small'/></IconButton>
                </div>

            );
        }
    }
}

export default EditAnswer;
import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import s from './css/editQuizz.module.css'
import $ from 'jquery'

class EditQuizSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    hideSaveButton = () => {
        $('#saveButton').show(500)
    }

    render() {

        return (
            <div className={s.quizSettings} onClick={this.hideSaveButton}>
                <div className={s.radio}>
                    <RadioGroup aria-label="type" name="Results">
                        <FormControlLabel value="Mixed" control={<Radio color="primary"/>}
                                          checked={this.props.mixed}
                                          onChange={this.props.mixedChecked} label="Mixed"/>
                        <FormControlLabel value="Not mixed" control={<Radio color="primary"/>}
                                          checked={!this.props.mixed}
                                          onChange={this.props.notmixed} label="Not Mixed"/>

                    </RadioGroup>
                    <RadioGroup aria-label="type" name="Results">
                        <FormControlLabel value="Point" control={<Radio color="primary"/>}
                                          checked={this.props.showResults}
                                          onChange={this.props.showResult} label="Show Results"/>
                        <FormControlLabel value="Do not ShowResult" control={<Radio color="primary"/>}
                                          checked={!this.props.showResults}
                                          onChange={this.props.notShowResult} label='Do not show results'/>

                    </RadioGroup>
                    <RadioGroup aria-label="type" name="Correct/Wrong/Point">
                        <FormControlLabel value="Correct/Wrong" control={<Radio color="primary"/>}
                                          onChange={this.props.correct} checked={!this.props.points}
                                          label="Correct/Wrong"/>
                        <FormControlLabel value="Point" control={<Radio color="primary"/>} onChange={this.props.point}
                                          checked={this.props.points} label="Point"/>
                    </RadioGroup>
                </div>
                <Button id='saveButton' onClick={this.props.saveButton} color='primary'>Save</Button>
            </div>
        );
    }
}

export default EditQuizSettings;
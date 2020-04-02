import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import s from './css/editQuizz.module.css'
class EditQuizSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mixed: true,
            showResults: false,
        };
    }

    mixedChecked = () => {
        this.setState({mixed: true});
    };

    notMixedChecked = () => {
        this.setState({mixed: false});
    };

    showResult = () => {
        this.setState({showResults: true});
    };

    notShowResults = () => {
        this.setState({showResults: false});
    };


    render() {

        return (<div className={s.quizSettings}>
            <div>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="type" name="Results">
                        <FormControlLabel value="Mixed" control={<Radio color="primary"/>}
                                          checked={this.state.mixed}
                                          onChange={this.mixedChecked} label="Mixed"/>
                        <FormControlLabel value="Not mixed" control={<Radio color="primary"/>}
                                          checked={!this.state.mixed}
                                          onChange={this.notMixedChecked} label="Not Mixed"/>

                    </RadioGroup>
                </FormControl>
            </div>
            <div>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="type" name="Results">
                        <FormControlLabel value="Point" control={<Radio color="primary"/>}
                                          checked={this.state.showResults}
                                          onChange={this.showResult} label="Show Results"/>
                        <FormControlLabel value="Do not ShowResult" control={<Radio color="primary"/>}
                                          checked={!this.state.showResults}
                                          onChange={this.notShowResults} label='Do not show results'/>

                    </RadioGroup>
                </FormControl>
            </div>
            <div>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="type" name="Correct/Wrong/Point">
                        <FormControlLabel value="Correct/Wrong" control={<Radio color="primary"/>}
                                          onChange={this.props.correct} checked={!this.props.point}
                                          label="Correct/Wrong"/>
                        <FormControlLabel value="Point" control={<Radio color="primary"/>} onChange={this.props.points}
                                          checked={this.props.point} label="Point"/>
                    </RadioGroup>
                </FormControl>
            </div>
            <Button>Edit</Button>
        </div>);
    }
}

export default EditQuizSettings;
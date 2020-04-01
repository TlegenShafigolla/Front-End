import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

class EditQuizSettings extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mixed: true,
            notMixed: false,
            showResults: false,
            notShowResults: true,
        };
    }

    mixedChecked = () => {
        this.setState({mixed: true});
        this.setState({notMixed: false});
    };

    notMixedChecked = () => {
        this.setState({mixed: false});
        this.setState({notMixed: true});
    };

    showResults = () => {
        this.setState({showResults: true});
        this.setState({notShowResults: false});
    };

    notShowResults = () => {
        this.setState({showResults: false});
        this.setState({notShowResults: true});
    };



    render() {

        return (<div>
            <div>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state.mixed}
                            onChange={this.mixedChecked}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Mixed"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state.notMixed}
                            onChange={this.notMixedChecked}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Not Mixed"
                />
            </div>
            <div>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state.showResults}
                            onChange={this.showResults}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Show Results"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state.notShowResults}
                            onChange={this.notShowResults}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Do not show results"
                />
            </div>
            <div>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="type" name="Correct/Wrong/Point"  >
                        <FormControlLabel value="Correct/Wrong" control={<Radio color="primary"/>} onChange={this.props.correct} checked={!this.props.point} label="Correct/Wrong" />
                        <FormControlLabel value="Point" control={<Radio color="primary" />} onChange={this.props.points} checked={this.props.point} label="Point" />
                    </RadioGroup>
                </FormControl>
            </div>
        </div>);
    }
}

export default EditQuizSettings;
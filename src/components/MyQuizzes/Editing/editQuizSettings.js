import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

class EditQuizSettings extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mixed: true,
            notMixed: false,
            showResults: false,
            notShowResults: true,
            correctWrong: true,
            points: false
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

    correctWrong = () => {
        this.setState({correctWrong: true});
        this.setState({points: false});
    };

    points = () => {
        this.setState({correctWrong: false});
        this.setState({points: true});
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
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state.correctWrong}
                            onChange={this.correctWrong}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Correct/Wrong"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state.points}
                            onChange={this.points}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Points"
                />
            </div>
        </div>);
    }
}

export default EditQuizSettings;
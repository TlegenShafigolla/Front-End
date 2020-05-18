import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import s from './css/editQuizz.module.css'
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import {Tooltip} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

class EditQuizSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mixed: this.props.mixed,
            showResults: this.props.showResults,
            points: this.props.points,
        };
    }

    mixedChecked = (checked) => {
        this.props.mixedChecked(!this.state.mixed);
        this.setState({mixed: !this.state.mixed});
    };

    showResultsChecked = (event) => {
        this.props.showResultsChecked(!this.state.showResults);
        this.setState({showResults: !this.state.showResults});
    };

    pointsChecked = (event) => {
        this.props.pointsChecked(!this.state.points);
        this.setState({points: !this.state.points});
    };

    render() {
        return (
            <div className={s.QuizSettings}>
                <div className={s.Radio}>
                    <div className={s.SwitchLine}>
                        <Tooltip
                            title={"During the quiz, your questions will be shown in the order in which you see them now."}>
                            <Typography className={s.SwitchTextLeft}>In-order</Typography>
                        </Tooltip>

                        <Switch className={s.Switch}
                                color="primary"
                                value={"active"}
                                checked={this.state.mixed}
                                onChange={this.mixedChecked}/>

                        <Tooltip title={"During the quiz, your questions will be shown in mixed order."}>
                            <Typography className={s.SwitchTextRight}>Mixed</Typography>
                        </Tooltip>
                    </div>
                    <div className={s.SwitchLine}>
                        <Tooltip title={"After taking this quiz, results won't be shown."}>
                            <Typography className={s.SwitchTextLeft}>Don't show results</Typography>
                        </Tooltip>
                        <Switch
                            className={s.Switch}
                            color="primary"
                            value={"active"}
                            checked={this.state.showResults}
                            onChange={this.showResultsChecked}/>
                        <Tooltip title={"After taking this quiz, results will be shown."}>
                            <Typography className={s.SwitchTextRight}>Show results</Typography>
                        </Tooltip>
                    </div>
                    <div className={s.SwitchLine}>
                        <Tooltip title={"Grading system. Answers can be correct or wrong."}>
                            <Typography className={s.SwitchTextLeft}>Use Correct/Wrong</Typography>
                        </Tooltip>
                        <Switch className={s.Switch}
                                color="primary"
                                value={"active"}
                                onChange={this.pointsChecked}
                                checked={this.state.points}/>
                        <Tooltip title={"Grading system. Any answer can have own weight."}>
                            <Typography className={s.SwitchTextRight}>Use Points</Typography>
                        </Tooltip>
                    </div>
                </div>
                <Typography color='textSecondary' variant={'body2'}> version: {this.props.lastedit}</Typography>
            </div>
        );
    }
}

export default EditQuizSettings;
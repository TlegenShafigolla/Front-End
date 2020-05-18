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
            points: this.props.points,
        };
    }

    pointsChecked = (event) => {
        this.props.pointsChecked(!this.state.points);
        this.setState({points: !this.state.points});
    };

    render() {
        return (
            <div className={s.QuizSettings}>
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
                <Typography color='textSecondary' variant={'body2'}> version: {this.props.lastedit}</Typography>
            </div>
        );
    }
}

export default EditQuizSettings;
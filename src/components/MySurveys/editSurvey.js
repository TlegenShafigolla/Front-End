import React from "react";
import s from "./editSurvey.module.css";
import {Link} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/core/SvgIcon/SvgIcon";
import TextField from "@material-ui/core/TextField/TextField";
import Typography from "@material-ui/core/Typography";
import EditSurveySettings from "./editSurveySettings";

class EditSurvey extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            editSurveyName: false,
            error: false,
            survey_name: "Survey Name",
            editDescription: false,
            description: "Description here",
        };
    }

    changeSurveyName = () => {

    };

    changeDescription = () => {

    };

    onBlurSurveyName = () => {

    };

    onBlurDescription = () => {

    };

    render() {
        return (
            <div className={s.Body}>
                <div className={s.ArrowButton}>
                    <Link to='/admin/surveys/'>
                        <IconButton className={s.ArrowBackIosIcon} color="primary">
                            <ArrowBackIosIcon/>
                        </IconButton>
                    </Link>
                </div>
                <div className={s.Edit}>
                    <div className={s.SurveyName}>
                        {this.state.editSurveyName ?
                            <TextField error={this.state.error} onBlur={this.onBlurSurveyName} onChange={this.changeSurveyName}
                                       autoFocus fullWidth
                                       variant='outlined' margin='dense'
                                       defaultValue={this.state.survey_name}/> :
                            <Typography onClick={this.editSurveyName} noWrap
                                        variant='h4'> {this.state.survey_name}</Typography>}
                        {this.state.editDescription ?
                            <TextField error={this.state.error} onChange={this.changeDescription}
                                       onBlur={this.onBlurDescription}
                                       defaultValue={this.state.description} autoFocus variant='outlined'
                                       margin='dense' fullWidth multiline rows={2} rowsMax={5}/> :
                            <Typography onClick={() => this.setState({editDescription: true})}
                                        variant='body1'>{this.state.description}</Typography>}
                    </div>
                    <div className={s.Settings}>
                        <EditSurveySettings />
                    </div>
                </div>
            </div>);
    }
}

export default EditSurvey;
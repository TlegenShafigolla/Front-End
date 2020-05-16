import React from "react";
import {getInvitation, postInvitation} from "../services/API/userAPI/Survey/invitation";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import s from "../css/Survey.module.css";
import CheckEmail from "../components/Quiz/CheckEmail";
import Button from "@material-ui/core/Button";
import TakeSurvey from "../components/Survey/TakeSurvey";
import Grid from "@material-ui/core/Grid";
import logo from "../images/logoPng.png";
import Typography from "@material-ui/core/Typography";

class Survey extends React.Component{
    constructor(props) {
        super(props);
        const path = window.location.pathname.split('/');
        const session_id = localStorage.getItem(`session_id${path[2]}`);
        const survey = localStorage.getItem(`survey_session${path[2]}`) ? JSON.parse(localStorage.getItem(`survey_session${path[2]}`)) : null;
        this.state = {
            link: path[2],
            survey:survey,
            correctLink: session_id !== null ? true : null,
            error: null,
            correctEmail: session_id !== null ? true : null,
            email: '',
            emailError: false,
            session_id: session_id,
            survey_started: localStorage.getItem(`survey_started${path[2]}`) === 'true',
        };
    }

    onChangeEmail = (event) => {
        this.setState({email: event.target.value, emailError: false});
    };

    onClickContinue = async () => {
        await postInvitation(this.state.link, this.state.email).then(json => {
            console.log(json);
            this.setState({statusEmail: 'Success' === json.Status});
            if (json.Status === 'Success') {
                localStorage.setItem(`session_id${this.state.link}`, json['session_id']);
                localStorage.setItem(`survey_session${this.state.link}`, JSON.stringify(json.survey));
                this.setState({survey:json.survey})
            }
            if (json.Status === 'Failed') {
                this.setState({emailError: true})
            }
        });
    };

    onStartClicked = () => {
        localStorage.setItem(`survey_started${this.state.link}`, 'true');
        window.location.reload();
    };

    componentDidMount() {
        getInvitation(this.state.link).then(json => {
            console.log(json);
            this.setState({correctLink: "Success" === json.Status});
        });
    }

    render() {
        if(this.state.correctLink !== true){
            return <CheckLink correctLink={this.state.correctLink}/>
        } else if(this.state.error !== null){
            return <Error error={this.state.error}/>
        } else if(this.state.correctEmail !== true){
            return <CheckEmail
                error={this.state.emailError}
                onChangeEmail={this.onChangeEmail}
                onClickContinue={this.onClickContinue}/>
        } else if(this.state.session_id && !this.state.survey_started){
            return(<StartDialog survey={this.state.survey} start={this.onStartClicked}/>);
        } else if(this.state.session_id && this.state.survey_started){
            return(<TakeSurvey />)
        }
        return(<div>Survey</div>);
    }
}

const CheckLink = (props) => {
    if(props.correctLink === null){
        return (
            <div className={s.CircularProgress}>
                <CircularProgress size={70}/>
            </div>
        );
    } else if(props.correctLink === false){
        return (
            <div>Page doesn't exist</div>
        );
    }
};

const Error = (props) => {
    return <div>{props.error}</div>
};

const StartDialog = (props) => {
    return (
        <div>
            <Grid container
                  spacing={3}
                  direction="column"
                  justify="space-between"
                  alignItems="center">
                <img className={s.Logo} src={logo} alt="Logo"/>
                <span className={s.QuizName}>{props.survey.survey_name}</span>
                <span className={s.SurveyCount}>{props.survey.questions_count} Questions</span>
                <div className={s.Instructions}>
                    <Typography paragraph color="primary" variant="h6">{"Description"}</Typography>
                    <div className={s.Description}>
                        <Typography color="textSecondary" variant="body1">{props.survey.description}</Typography>
                    </div>

                </div>
            <Button color='primary' onClick={props.start} variant='contained'>Start Survey</Button>
            </Grid>
        </div>
    )
};

export default Survey;
import React from "react";
import {getInvitation, postInvitation} from "../services/API/userAPI/Survey/invitation";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import s from "../css/Survey.module.css";
import CheckEmail from "../components/Quiz/CheckEmail";
import TakeSurvey from "../components/Survey/TakeSurvey";
import StartSurvey from "../components/Survey/SurveyDescriptionPage";

class Survey extends React.Component {
    constructor(props) {
        super(props);
        const path = window.location.pathname.split('/');
        const session_id = localStorage.getItem(`session_id${path[2]}`);
        const survey = localStorage.getItem(`survey_session${path[2]}`) === undefined ? JSON.parse(localStorage.getItem(`survey_session${path[2]}`)) : null;
        this.state = {
            link: path[2],
            survey: survey,
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
                this.setState({survey: json.survey})
                this.setState({session_id: json['session_id']})
                localStorage.setItem(`session_id${this.state.link}`, json['session_id']);
                localStorage.setItem(`survey_session${this.state.link}`, JSON.stringify(json.survey));
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
        console.log(this.state)
        if (this.state.correctLink !== true) {
            return <CheckLink correctLink={this.state.correctLink}/>
        } else if (this.state.error !== null) {
            return <Error error={this.state.error}/>
        } else if (this.state.correctEmail !== true && this.state.survey == null) {
            return <CheckEmail
                error={this.state.emailError}
                onChangeEmail={this.onChangeEmail}
                onClickContinue={this.onClickContinue}/>
        } else if (this.state.session_id !== null && !this.state.survey_started && this.state.survey !== null) {
            return (<StartSurvey survey={this.state.survey} start={this.onStartClicked}/>);
        } else if (this.state.session_id && this.state.survey_started) {
            return (<TakeSurvey/>)
        }
        return (<div>Survey</div>);
    }
}

const CheckLink = (props) => {
    if (props.correctLink === null) {
        return (
            <div className={s.CircularProgress}>
                <CircularProgress size={70}/>
            </div>
        );
    } else if (props.correctLink === false) {
        return (
            <div>Page doesn't exist</div>
        );
    }
};

const Error = (props) => {
    return <div>{props.error}</div>
};
export default Survey;

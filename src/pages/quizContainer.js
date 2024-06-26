import React from 'react'
import {getInvitation, postInvitation} from "../services/API/userAPI/Quiz/invitation";
import QuizPage from "../components/Quiz/QuizPage";
import CheckEmail from "../components/Quiz/CheckEmail";
import Typography from "@material-ui/core/Typography";
import s from '../components/Quiz/Quiz.module.css'
import Button from "@material-ui/core/Button";
import {NavLink, withRouter} from "react-router-dom";
import StartingPage from "../components/Quiz/QuizDescriptionDialog";
import {connect} from "react-redux";
import {compose} from "redux";

class QuizContainer extends React.Component {
    constructor(props) {
        super(props);
        const link = this.props.match.params.id;
        const quiz = localStorage.getItem(`quiz_session${link}`) ? JSON.parse(localStorage.getItem(`quiz_session${link}`)) : null;
        this.state = {
            status: null,
            email: null,
            questions: [],
            error: false,
            startTest: null,
            start: false,
            quiz: quiz,
        };
    }


    componentDidMount() {
        const path = window.location.pathname.split('/');
        getInvitation(path[2]).then(json => {
            this.setState({startTest: json.error});
            this.setState({status: "Success" === json.Status});
        });
    }


    componentDidCatch(error, errorInfo) {
        console.log(error)
    }

    onChangeEmail = (event) => {
        this.setState({email: event.target.value});
        this.setState({error: false})
    };
    startTest = () => {
        localStorage.setItem('start_test', 'true');
        this.setState({start: true});
    };
    onClickContinue = async () => {
        localStorage.setItem('time_limit', '0');
        const path = window.location.pathname.split('/');
        const link = path[2];
        const email = this.state.email;
        await postInvitation(link, email).then(json => {
            console.log(json);
            this.setState({statusEmail: 'Success' === json.Status});
            if (json.Status === 'Success') {
                localStorage.setItem(`session_id${link}`, json['session_id']);
                localStorage.setItem(`quiz_session${link}`, JSON.stringify(json.quiz));
                this.setState({quiz: json.quiz})
            }
            if (json.Status === 'Failed') {
                this.setState({error: true})
            }
        });
    };

    render() {
        const path = window.location.pathname.split(`/`);
        if (this.state.status === null) {
            return '';
        }
        if (this.state.startTest === 'Error: Invitation will be available later.') {
            return <div><Typography variant={"h5"}>Invitation will be available later.</Typography></div>
        }
        if (this.state.startTest === 'Error: Time for this session has passed.') {
            return <div>Time for this session has passed.</div>
        }
        if (this.state.status && localStorage.getItem(`session_id${path[2]}`) === null) {
            localStorage.removeItem('date');
            return (
                <CheckEmail
                    error={this.state.error}
                    onChangeEmail={this.onChangeEmail}
                    onClickContinue={this.onClickContinue}
                />
            );
        }
        if (this.state.status && localStorage.getItem(`session_id${path[2]}`) !== null) {
            if (localStorage.getItem('start_test') === 'true') {
                return <QuizPage/>
            }
            return (
                <StartingPage quiz={this.state.quiz} start={this.startTest}/>
            );
        } else {
            localStorage.removeItem(`session_id${path[2]}`);
            return (
                <div className={s.error}>
                    <NavLink to='/'><Button color='primary'>Back to home page</Button></NavLink>
                    <Typography variant='h6'> Sorry, this page does not exist or has been deleted. Try another
                        link</Typography>
                    <Typography variant='h1' color='textSecondary'>404</Typography>
                </div>

            )
        }
    }

}

export default compose(
    connect(null),
    withRouter,
)(QuizContainer);
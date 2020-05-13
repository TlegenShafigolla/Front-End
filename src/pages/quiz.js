import React from 'react'
import {getInvitation, postInvitation} from "../services/API/userAPI/Quiz/invitation";
import StartQuiz from "../components/Quiz/StartQuiz";
import CheckEmail from "../components/Quiz/CheckEmail";
import Typography from "@material-ui/core/Typography";
import s from '../components/Quiz/Quiz.module.css'
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";
import StartTest from "../components/Quiz/QuizDescriptionDialog";

class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: null,
            email: null,
            questions: [],
            error: false,
            startTest: null,
            start: false,
            quiz: null
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
        localStorage.setItem('start_test', 'true')
        this.setState({start: true});
    };
    onClickContinue = async () => {
        localStorage.setItem('time_limit', '0');
        const path = window.location.pathname.split('/');
        const email = this.state.email;
        await postInvitation(path[2], email).then(json => {
            console.log(json);
            this.setState({statusEmail: 'Success' === json.Status});
            if (json.Status === 'Success') {
                localStorage.setItem(`session_id${path[2]}`, json['session_id']);
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
            localStorage.removeItem('date')
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
                return <StartQuiz/>
            }
            return (
                <StartTest quiz={this.state.quiz} start={this.startTest}/>
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

export default Quiz;
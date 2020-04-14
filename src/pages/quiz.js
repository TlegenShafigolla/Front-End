import React from 'react'
import {getInvitation, postInvitation} from "../services/userAPI/invitation";
import StartQuiz from "../components/Quiz/StartQuiz";
import CheckEmail from "../components/Quiz/CheckEmail";
import Typography from "@material-ui/core/Typography";
import s from '../components/Quiz/Quiz.module.css'
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";
class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: null,
            email: null,
            statusEmail: null,
            session_id: localStorage.getItem('session_id'),
            questions: [],
            error:false
        }
    }

    onChangeEmail = (event) => {
        this.setState({email: event.target.value});
        this.setState({error:false})
    };

    onClickContinue = async () => {
        const path = window.location.pathname.split('/');
        const email = this.state.email;
        await postInvitation(path[2], email).then(json => {
            this.setState({statusEmail: 'Success' === json.Status})
            if(json.Status==='Success'){
                this.setState({session_id: json['session_id']});
                localStorage.setItem('session_id', json['session_id']);
            }if (json.Status==='Failed'){
                this.setState({error:true})
            }
        });
    };


    UNSAFE_componentWillMount = async () => {
        const path = window.location.pathname.split('/');
        await getInvitation(path[2]).then(json => {
            this.setState({status: "Success" === json.Status});
        });
    };

    render() {
        if (this.state.status === null) {
            return '';
        }
        if (this.state.status === true && (this.state.session_id === null || this.state.session_id === undefined)) {
            return (
                <CheckEmail
                    error={this.state.error}
                    onChangeEmail={this.onChangeEmail}
                    onClickContinue={this.onClickContinue}
                />
            );
        }
        if (this.state.status && this.state.session_id !== null  ) {
            return (
                <StartQuiz/>
            )
        } else {
            return (
                <div className={s.error}>
                    <NavLink to='/'><Button color='primary'>Back to home page</Button></NavLink>
                    <Typography variant='h6'> Sorry, this page does not exist or has been deleted. Try another link</Typography>
                <Typography variant='h1' color='textSecondary'>404</Typography>
                </div>

            )
        }
    }

}

export default Quiz;
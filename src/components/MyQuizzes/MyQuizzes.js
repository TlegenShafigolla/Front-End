import React from "react";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import getTests from "../../services/api/myquizzes";
import QuizPreview from "./Existing/existingQuizPreview";
import s from './MyQuizzes.module.css'
class MyQuizzes extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            quizzes: null
        };
    }

    render() {
        return (
            <Container maxWidth="xl" className={s.Container}>
                <div> Aaaaaaaaaaaaaa</div>
            </Container>
        );
    }

    componentDidMount() {
        getTests().then( json => {
            this.setState({quizzes: json.quizzes})
        });
    }
}

export default MyQuizzes;

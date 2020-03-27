import React from "react";
import Container from '@material-ui/core/Container';
import getTests from "../../services/api/myquizzes";
import QuizPreview from "./Existing/existingQuizPreview";
import s from './MyQuizzes.module.css'
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import editQuiz from "./Existing/editQuiz";
class MyQuizzes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quizzes: null
        };
    }

    render() {
        return (
            <Container maxWidth="xl">
                <div className={s.Container}>
                    <div className={s.description}>

                        {this.state.quizzes !== null ? this.state.quizzes.map(val => <QuizPreview key={val.id}
                                                                                                  value={val}/>) : ' '}
                    </div>
                    <IconButton color='primary' >
                        <AddIcon fontSize='large'/>
                    </IconButton>

                </div>
            </Container>
        );
    }

    componentDidMount() {
        getTests().then(json => {
            this.setState({quizzes: json.quizzes})

        });
    }
}

export default MyQuizzes;

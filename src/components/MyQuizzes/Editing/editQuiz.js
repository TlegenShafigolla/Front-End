import React from 'react'
import s from './editQuizz.module.css'
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import getQuizzes from "../../../services/api/myquizzes";
import getQuestions from "../../../services/api/questions";
import QuizPreview from "../Existing/quizPreview";
import EditQuestion from "./editQuestion";

class editQuiz extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            quiz_id: 1,
            questions: null,
        };
    }

    render() {
        return (
                <div className={s.body}>
                    <div className={s.edit}>
                          <div>
                                Quiz Name
                          </div>
                          <div className={s.settings}>
                              settings
                          </div>
                          <div>
                              {this.state.questions !== null ? this.state.questions.map(val => <EditQuestion key={val.id}
                                                                                                        value={val}/>) : ' '}
                          </div>
                    </div>
                    <div className={s.questions}>
                        questions
                    </div>
                </div>

        );
    }

    componentDidMount() {
        getQuestions(this.state.quiz_id).then(json => {
            this.setState({questions: json.questions})
        });
    }
}

export default editQuiz;

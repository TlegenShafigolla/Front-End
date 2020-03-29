import React from 'react'
import s from './editQuizz.module.css'
import getQuestions from "../../../services/api/questions";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {Link} from "react-router-dom";
import Question from "./question";
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
                    <div className={s.ArrowButton}>
                        <Link to='/admin/quizzes/'>
                    <IconButton className={s.ArrowBackIosIcon} color="primary">
                        <ArrowBackIosIcon/>
                    </IconButton>
                        </Link>
                    </div>
                    <div className={s.edit}>
                          <div>
                                Quiz Name
                          </div>
                          <div className={s.settings}>
                              settings
                          </div>
                          <div className={s.question}>
                              {this.state.questions === null ? ' ' : this.state.questions.map(val => <Question key={val.id}
                                                                                                        value={val}/>)}
                          </div>
                        <IconButton color='primary' size='large' className={s.addbutton}>
                            <AddIcon fontSize='large'/>
                        </IconButton>
                    </div>
                    <div className={s.questionsbord}>
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

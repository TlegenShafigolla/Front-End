import React from 'react'
import s from './css/editQuizz.module.css'
import getQuestions from "../../../services/api/questions";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {Link} from "react-router-dom";
import Question from "./question";
import Board from "../Existing/Board";
import EditQuestion from "./editQuestion";
import EditQuizSettings from "./editQuizSettings";

class editQuiz extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            quiz_id: 1,
            questions: null,
            mixed: true,
            showResults: true,
            points: false,
            description: "",
            last_edited_date: "",
            quiz_name: "Quiz Name",
            questions_count: 0
        };
    }

addNewQuestion=()=>{
        const questions=this.state.questions;
        questions.push( {
        order_id: this.state.questions.length + 1,
        quiz_id: 1,
        image: null,
        question: "Question",
        type: "FILL THE BLANK"
    })
    this.setState({questions:questions})
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
                                {this.state.quiz_name}
                          </div>
                          <div>
                                {this.state.description}
                          </div>
                          <div className={s.settings}>
                              <EditQuizSettings/>
                          </div>
                          <div className={s.question}>
                              {this.state.questions === undefined || this.state.questions === null ? ' ' :
                                  this.state.questions.map(val => <Question key={val.id} value={val}/>)}
                          </div>
                        <IconButton color='primary' size='medium' className={s.addbutton} onClick={this.addNewQuestion}>
                            <AddIcon fontSize='large'/>
                        </IconButton>
                    </div>
                    <div className={s.questionsboard}>
                        <div>
                            {this.state.questions === undefined || this.state.questions === null ? ' ' :
                                this.state.questions.map(val => <Board key={val.id} value={val}/>)}

                        </div>
                    </div>
                </div>

        );
    }

    componentDidMount() {
        getQuestions(this.state.quiz_id).then(json => {
            this.setState({
                questions: json.questions,
                quiz_name: json.quiz_name,
                description: json.description,
                questions_count: json.questions_count,
                last_edited_date: json.last_edited_date
            });
        });
    }
}

export default editQuiz;

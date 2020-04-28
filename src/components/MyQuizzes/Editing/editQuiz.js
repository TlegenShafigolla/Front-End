import React from 'react'
import s from './css/editQuizz.module.css'
import getQuestions, {postQuestions} from "../../../services/adminAPI/questions";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {Link} from "react-router-dom";
import Question from "./question";
import Board from "../Existing/Board";
import EditQuizSettings from "./editQuizSettings";
import $ from "jquery";
import {putQuiz} from "../../../services/adminAPI/quiz";
import Typography from "@material-ui/core/Typography";
import {CircularProgress} from "@material-ui/core";

class editQuiz extends React.Component {
    constructor(props) {
        super(props);
        const {id} = this.props.match.params;
        this.state = {
            quiz_id: id,
            questions: null,
            mixed: null,
            showResults: null,
            description: null,
            last_edited_date: null,
            quiz_name: null,
            questions_count: null,
            points: null,
            quizChanges: false,
            disableAddButton: false,
        };
    }

    setQuestion = (order_id, question) => {
        let questions = this.state.questions;
        questions[order_id - 1] = question;
        this.setState({questions: questions});
    };

     addNewQuestion = () => {
        if(this.state.disableAddButton){
            return;
        }
        this.setState({disableAddButton: true});
        const question = {
            order_id: this.state.questions.length + 1,
            quiz_id: this.state.quiz_id,
            image: null,
            question: "New question",
            type: "FILL THE BLANK"
        };
        postQuestions(this.state.quiz_id, [question]).then(ret => {
            const questions = this.state.questions;
            questions.push(ret.created[0]);
            this.setState({questions: questions});
        });
        this.setState({disableAddButton: false});
     };

    deleteQuestion = (order_id) => {
        let questions = this.state.questions;
        questions.splice(order_id - 1, 1);
        for (let i = order_id - 1; i < questions.length; i++) {
            questions[i].order_id = i + 1;
        }
        postQuestions(this.state.quiz_id, questions)
        this.setState({questions: questions});
    };

    saveButton = async () => {
        if (this.state.quizChanges) {
            const quiz = {
                _id: this.state.quiz_id,
                quiz_name: this.state.quiz_name,
                description: this.state.description,
                mixed: this.state.mixed,
                points: this.state.points,
                showResults: this.state.showResults,
                last_edited_date: Date
            };
            await putQuiz(quiz).then(value => {
                this.setState({quizChanges: false});
            });
        }
        $('#saveButton').hide(500)

    };
    pointsChecked = (event) => {
        this.setState({points: event});
        this.setState({quizChanges:true})
    };
    mixedChecked = (event) => {
        this.setState({mixed: event});
        this.setState({quizChanges:true})
    };
    showResultsChecked = (event) => {
        this.setState({showResults: event});
        this.setState({quizChanges:true})
    };

    render() {
        if(this.state.questions === null){
            return (
                <div className={s.CircularProgress}>
                    <CircularProgress size={70}/>
                </div>
            );
        }
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
                    <div className={s.QuizName}>
                        <Typography variant='h4'> {this.state.quiz_name}</Typography>
                    </div>
                    <div className={s.settings}>
                        <EditQuizSettings pointsChecked={this.pointsChecked}
                                          saveButton={this.saveButton}
                                          mixedChecked={this.mixedChecked}
                                          showResultsChecked={this.showResultsChecked}
                                          showResults={this.state.showResults}
                                          mixed={this.state.mixed}
                                          points={this.state.points}
                        />
                    </div>
                    <div className={s.question}>
                        {this.state.questions === undefined || this.state.questions === null ? ' ' :
                            this.state.questions.map(val => <Question
                                key={val._id}
                                value={val}
                                point={this.state.points}
                                deleteQuestion={this.deleteQuestion}
                                setQuestion={this.setQuestion}
                            />)}
                    </div>
                    <div>
                    <IconButton color='primary' size='medium' className={s.addbutton} onClick={this.addNewQuestion}>
                        <AddIcon fontSize='large'/>
                    </IconButton>
                    </div>
                </div>
                <div className={s.board}>

                    <div className={s.boardRows}>
                        {this.state.questions === undefined || this.state.questions === null ? null :
                            this.state.questions.map(val => <Board key={val.order_id} value={val}/>)}
                    </div>
                </div>
            </div>

        );
    }

    componentDidMount() {
        getQuestions(this.state.quiz_id).then(json => {
            this.setState({
                mixed: json.mixed,
                showResults: json.showResults,
                questions: json.questions,
                quiz_name: json.quiz_name,
                description: json.description,
                questions_count: json.questions_count,
                last_edited_date: json.last_edited_date,
                points: json.points
            });
        });
    }
}

export default editQuiz;

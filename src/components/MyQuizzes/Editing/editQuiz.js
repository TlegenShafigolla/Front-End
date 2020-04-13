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
import {postQuiz} from "../../../services/adminAPI/quiz";
import Typography from "@material-ui/core/Typography";

class editQuiz extends React.Component {
    constructor(props) {
        super(props);
        const {id} = this.props.match.params;
        this.state = {
            quiz_id: id,
            questions: null,
            mixed: this.props.match.mixed,
            showResults: this.props.match.showResults,
            description: this.props.match.description,
            last_edited_date: this.props.match.last_edited_date,
            quiz_name: this.props.match.quiz_name,
            questions_count: 0,
            points:this.props.match.points,
            quizChanges:false
        };
    }

     addNewQuestion = () => {
        const questions = this.state.questions;
        questions.push({
            editMode: false,
            order_id: this.state.questions.length + 1,
            quiz_id: this.state.quiz_id,
            image: null,
            question: "",
            type: "FILL THE BLANK"
        });
        this.setState({questions: questions});
    };

    deleteQuestion = (order_id) => {
        let questions = this.state.questions;
        questions.splice(order_id - 1, 1);
        for (let i = order_id - 1; i < questions.length; i++) {
            questions[i].order_id = i + 1;
        }
        postQuestions(this.state.quiz_id, questions);
        this.setState({questions: questions});
    };

    point = () => {
        this.setState({points: true})
        this.setState({quizChanges:true})
    };
    correct = () => {
        this.setState({points: false})
        this.setState({quizChanges:true})

    };
    saveButton = async () => {
        if (this.state.quizChanges) {
            const quiz = {
                id: this.state.quiz_id,
                quiz_name: this.state.quiz_name,
                description: this.state.description,
                mixed: this.state.mixed,
                points: this.state.points,
                showResults: this.state.showResults,
                last_edited_date: Date
            };
            await postQuiz(quiz);
            this.setState({quizChanges: false})
        }
        $('#saveButton').hide()

    };

    mixedChecked = () => {
        this.setState({mixed: true});
        this.setState({quizChanges:true})

    };

    notMixedChecked = () => {
        this.setState({mixed: false});
        this.setState({quizChanges:true})

    };
    showResult = () => {
        this.setState({showResults: true});
        this.setState({quizChanges:true})

    };

    notShowResults = () => {
        this.setState({showResults: false});
        this.setState({quizChanges:true})

    };

    render() {
        console.log(this.state.questions);
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
                        <Typography variant='h6'> {this.state.quiz_name}</Typography>
                    </div>
                    <div className={s.settings}>
                        <EditQuizSettings point={this.point} correct={this.correct} points={this.state.points}
                                          saveButton={this.saveButton} mixedChecked={this.mixedChecked}
                                          notmixed={this.notMixedChecked} mixed={this.state.mixed}
                                          showResult={this.showResult} showResults={this.state.showResults}
                                          notShowResult={this.notShowResults}
                        />
                    </div>
                    <div className={s.question}>
                        {this.state.questions === undefined || this.state.questions === null ? ' ' :
                            this.state.questions.map(val => <Question
                                key={val.id}
                                value={val}
                                point={this.state.points}
                                deleteQuestion={this.deleteQuestion}
                            />)}
                    </div>
                    <IconButton color='primary' size='medium' className={s.addbutton} onClick={this.addNewQuestion}>
                        <AddIcon fontSize='large'/>
                    </IconButton>
                </div>
                <div className={s.questionsboard}>
                    <div>
                        {this.state.questions === undefined || this.state.questions === null ? ' ' :
                            this.state.questions.map(val => <Board key={val.order_id} value={val}/>)}
                    </div>
                </div>
            </div>

        );
    }

    componentDidMount() {
        getQuestions(this.state.quiz_id).then(json => {
            this.setState({
                mixed:json.mixed,
                showResults:json.showResults,
                questions: json.questions.sort((a, b) => Number(a.order_id) - Number(b.order_id)),
                quiz_name: json.quiz_name,
                description: json.description,
                questions_count: json.questions_count,
                last_edited_date: json.last_edited_date,
                points:json.points
            });
        });
    }
}

export default editQuiz;

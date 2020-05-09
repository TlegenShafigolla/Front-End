import React from 'react'
import s from './css/editQuizz.module.css'
import getQuestions, {postQuestions} from "../../../services/API/adminAPI/questions";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {Link} from "react-router-dom";
import Question from "./Question/question";
import Board from "../Preview/Board";
import EditQuizSettings from "./editQuizSettings";
import {putQuiz} from "../../../services/API/adminAPI/quiz";
import Typography from "@material-ui/core/Typography";
import {CircularProgress} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import PDFpreview from "../../../services/Factories/QuizPdf/preview";
import GeneratePdfDialog from "./generatePdfDialog";

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
            editDescription: false,
            editQuestion: false,
            quizChange: false,
            error: false,
            generatePdfDialog: false,
            answers: {},
        };
    }

    setQuestion = (order_id, question) => {
        let questions = this.state.questions;
        questions[order_id - 1] = question;
        this.setState({questions: questions});
    };


    addNewQuestion = async () => {
        if (this.state.disableAddButton) {
            return;
        }
        this.setState({disableAddButton: true});
        const question = {
            order_id: this.state.questions.length + 1,
            quiz_id: this.state.quiz_id,
            image: null,
            question: " ",
            type: "FILL THE BLANK"
        };
        await postQuestions(this.state.quiz_id, [question]).then(ret => {
            const questions = this.state.questions;
            questions.push(ret.created[0]);
            this.setState({questions: questions});
        });
        let height = document.documentElement.scrollHeight;
        window.scrollTo({top: height, behavior: "smooth"});
        this.setState({disableAddButton: false});
    };

    deleteQuestion = async (order_id) => {
        let questions = this.state.questions;
        questions.splice(order_id - 1, 1);
        for (let i = order_id - 1; i < questions.length; i++) {
            questions[i].order_id = i + 1;
        }
        await postQuestions(this.state.quiz_id, questions);
        this.setState({questions: questions});
    };
    changeDescription = (event) => {
        this.setState({description: event.target.value.trim()});
        this.setState({error: false});
        this.setState({quizChange: true})
    };
    changeQuizName = (event) => {
        this.setState({quiz_name: event.target.value.trim()});
        this.setState({error: false});
        this.setState({quizChange: true})
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.quizChanges !== this.state.quizChanges) {
            const quiz = {
                _id: this.state.quiz_id,
                quiz_name: this.state.quiz_name,
                description: this.state.description,
                mixed: this.state.mixed,
                points: this.state.points,
                showResults: this.state.showResults,
                last_edited_date: Date
            };
            putQuiz(quiz).then(() => {
                this.setState({quizChanges: false});
            });
        }

    }

    pointsChecked = (event) => {
        this.setState({points: event});
        this.setState({quizChanges: true});
    };
    mixedChecked = (event) => {
        this.setState({mixed: event});
        this.setState({quizChanges: true})
    };

    showResultsChecked = (event) => {
        this.setState({showResults: event});
        this.setState({quizChanges: true})
    };

    editQuestion = () => {
        this.setState({editQuestion: true})
    };

    onblur = () => {
        if (this.state.quiz_name !== '') {
            this.setState({editQuestion: false});
            if (this.state.quizChange) {
                this.setState({quizChanges: true});
                this.setState({quizChange: false});
            }
        } else
            this.setState({error: true});
    };

    onBlurDescription = () => {
        if (this.state.description !== '') {
            this.setState({editDescription: false});
            if (this.state.quizChange) {
                this.setState({quizChanges: true});
                this.setState({quizChange: false});
            }
        }
        this.setState({error: true})
    };

    openPdfDialog = () => {
        this.setState({generatePdfDialog: true});
    };

    closePdfDialog = () => {
        this.setState({generatePdfDialog: false});
    };

    setAnswers = (question_id, ans) => {
        const answers = this.state.answers;
        answers[question_id] = ans;
        this.setState({answers: answers})
    };

    render() {

        if (this.state.questions === null) {
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
                        {this.state.editQuestion ?
                            <TextField error={this.state.error} onBlur={this.onblur} onChange={this.changeQuizName}
                                       autoFocus fullWidth
                                       variant='outlined' margin='dense'
                                       defaultValue={this.state.quiz_name}/> :
                            <Typography onClick={this.editQuestion} noWrap
                                        variant='h4'> {this.state.quiz_name}</Typography>}
                        {this.state.editDescription ?
                            <TextField error={this.state.error} onChange={this.changeDescription}
                                       onBlur={this.onBlurDescription}
                                       defaultValue={this.state.description} autoFocus variant='outlined'
                                       margin='dense' fullWidth multiline rows={2} rowsMax={5}/> :
                            <Typography onClick={() => this.setState({editDescription: true})}
                                        variant='body1'>{this.state.description}</Typography>}
                    </div>
                    <div className={s.settings}>
                        <EditQuizSettings pointsChecked={this.pointsChecked}
                                          mixedChecked={this.mixedChecked}
                                          showResultsChecked={this.showResultsChecked}
                                          showResults={this.state.showResults}
                                          mixed={this.state.mixed}
                                          points={this.state.points}
                                          lastedit={this.state.last_edited_date}
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
                                setAnswers={this.setAnswers}
                            />)}
                    </div>
                    <div>
                        <IconButton color='primary' size='medium' className={s.addbutton}
                                    onClick={this.addNewQuestion}>
                            <AddIcon fontSize='large'/>
                        </IconButton>
                    </div>
                </div>
                <div className={this.state.questions.length === 0 ? s.display : s.board}>
                    <div className={s.boardRows}>
                        {this.state.questions === undefined || this.state.questions === null ? null :
                            this.state.questions.map(val => <Board key={val.order_id} value={val}/>)}
                    </div>
                </div>
                <Button variant="outlined" color="primary" onClick={this.openPdfDialog}>
                    Export to PDF
                </Button>
                <GeneratePdfDialog
                    open={this.state.generatePdfDialog}
                    onClose={this.closePdfDialog}
                    quiz_name={this.state.quiz_name}
                    description={this.state.description}
                    questions={this.state.questions}
                    answers={this.state.answers}
                />
            </div>

        );
    }

    componentDidMount() {
        getQuestions(this.state.quiz_id).then(json => {
            let date = new Date(json.last_edited_date);
            this.setState({
                mixed: json.mixed,
                showResults: json.showResults,
                questions: json.questions,
                quiz_name: json.quiz_name,
                description: json.description,
                questions_count: json.questions_count,
                last_edited_date: date.toLocaleString(),
                points: json.points
            });
        });
    }
}

export default editQuiz;
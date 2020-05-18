import React from 'react'
import s from './css/editQuizz.module.css'
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {Link} from "react-router-dom";
import Question from "./Question/question";
import Board from "./Board";
import EditQuizSettings from "./editQuizSettings";
import {putQuiz} from "../../../services/API/adminAPI/Quiz/quiz";
import Typography from "@material-ui/core/Typography";
import {CircularProgress} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import GeneratePdfDialog from "./generatePdfDialog";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import getQuestions, {postQuestions, putQuestions} from "../../../services/API/adminAPI/Quiz/questions";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

class EditQuiz extends React.Component {
    constructor(props) {
        super(props);
        const id = window.location.pathname.split('/');
        this.state = {
            quiz_id: id[4],
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
            quizNameDescriptionChange: false,
            editQuizName: false,
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

    onDragEnd = (result) => {
        const {destination, source} = result;
        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }
        let questions = this.state.questions;
        let draggableQuestion = this.state.questions[source.index];
        questions.splice(source.index, 1);
        questions.splice(destination.index, 0, draggableQuestion)
        for (let i = 0; i < this.state.questions.length; i++) {
            if (questions[i].order_id !== i + 1) {
                questions[i].order_id = i + 1;
                putQuestions(this.state.quiz_id, questions[i])
            }
        }
        this.setState({questions: questions})
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
        this.setState({
            description: event.target.value.trim(),
            error: false,
            quizNameDescriptionChange: true
        });
    };
    changeQuizName = (event) => {
        this.setState({
            quiz_name: event.target.value.trim(),
            error: false,
            quizNameDescriptionChange: true
        });
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

    editQuizName = () => {
        this.setState({editQuizName: true})
    };

    onBlurQuizName = () => {
        if (this.state.quiz_name !== '') {
            this.setState({editQuizName: false});
            if (this.state.quizNameDescriptionChange) {
                this.setState({quizChanges: true});
                this.setState({quizNameDescriptionChange: false});
            }
        } else {
            this.setState({error: true});
        }
    };

    onBlurDescription = () => {
        if (this.state.description !== '') {
            this.setState({editDescription: false});
            if (this.state.quizNameDescriptionChange) {
                this.setState({quizChanges: true});
                this.setState({quizNameDescriptionChange: false});
            }
        }
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
            <div className={s.EditQueston}>
                <Grid container
                      direction="row"
                      alignItems="flex-start"
                      justify="flex-end"
                      spacing={3}
                >
                    <Grid item lg={3} md={3} sm={2} className={s.ArrowButton}>
                        <Link to='/admin/quizzes/'>
                            <IconButton color="primary">
                                <ArrowBackIosIcon/>
                            </IconButton>
                        </Link>
                    </Grid>
                    <Grid item lg={6} md={6} sm={8} xs={12}
                          container
                          direction="column"
                          spacing={1}
                    >
                        <Paper square elevation={3} className={s.QuizNameDescription}>
                            {this.state.editQuizName ?
                                <TextField error={this.state.error} onBlur={this.onBlurQuizName}
                                           onChange={this.changeQuizName}
                                           autoFocus fullWidth
                                           variant='outlined' margin='dense'
                                           defaultValue={this.state.quiz_name}
                                           className={s.QuizInfo}/> :
                                <Typography onClick={this.editQuizName} noWrap
                                            className={s.QuizInfo}
                                            variant='h4'> {this.state.quiz_name}</Typography>}
                            {this.state.editDescription ?
                                <TextField error={this.state.error} onChange={this.changeDescription}
                                           onBlur={this.onBlurDescription}
                                           defaultValue={this.state.description} autoFocus variant='outlined'
                                           margin='dense' fullWidth multiline rows={2} rowsMax={5}/> :
                                <Typography className={s.QuizInfo}
                                            onClick={() => this.setState({editDescription: true})}
                                            variant='body1'>{this.state.description}</Typography>}
                            <EditQuizSettings pointsChecked={this.pointsChecked}
                                              mixedChecked={this.mixedChecked}
                                              showResultsChecked={this.showResultsChecked}
                                              showResults={this.state.showResults}
                                              mixed={this.state.mixed}
                                              points={this.state.points}
                                              lastedit={this.state.last_edited_date}/>
                        </Paper>
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            <Droppable droppableId={this.state.quiz_id.toString()}>
                                {provided => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {this.state.questions === undefined || this.state.questions === null ? ' ' :
                                            this.state.questions.map((val, index) =>
                                                <Question
                                                    index={index}
                                                    key={val._id}
                                                    value={val}
                                                    point={this.state.points}
                                                    deleteQuestion={this.deleteQuestion}
                                                    setQuestion={this.setQuestion}
                                                    setAnswers={this.setAnswers}
                                                />)}
                                        {provided.placeholder}</div>)}</Droppable>
                        </DragDropContext>
                        <div className={s.AddButton}>
                            <IconButton color='primary'
                                        onClick={this.addNewQuestion}>
                                <AddIcon fontSize='large'/>
                            </IconButton>
                        </div>
                    </Grid>
                    <Grid item lg={3} md={3} sm={2}>
                        <Paper square elevation={3}
                               className={this.state.questions.length === 0 ? s.display : s.BoardRows}>
                            {this.state.questions.map((val, index) =>
                                <Board value={val} index={index} key={val.order_id}/>
                            )}
                        </Paper>
                    </Grid>
                    {/*<Button variant="outlined" color="primary" onClick={this.openPdfDialog}>*/}
                    {/*    Export to PDF*/}
                    {/*</Button>*/}
                    {/*<GeneratePdfDialog*/}
                    {/*    open={this.state.generatePdfDialog}*/}
                    {/*    onClose={this.closePdfDialog}*/}
                    {/*    quiz_name={this.state.quiz_name}*/}
                    {/*    description={this.state.description}*/}
                    {/*    questions={this.state.questions}*/}
                    {/*    answers={this.state.answers}*/}
                    {/*/>*/}
                </Grid>
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

export default EditQuiz;

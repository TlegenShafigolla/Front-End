import React, {Component} from 'react'
import s from './css/editQuizz.module.css'
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {Link} from "react-router-dom";
import Board from "./Board";
import EditQuizSettings from "./editQuizSettings";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Preloader from "../../common/Preloader";
import EditQuizInfo from "./Question/editQuizInfo";
import QuestionContainer from "../../../containers/QuizEditor/QuestionContainer";

class EditQuiz extends Component {

    state = {
        quizChanges: false,
        editDescription: false,
        quizNameDescriptionChange: false,
        editQuizName: false,
        generatePdfDialog: false,
    };


    addNewQuestions = () => {
        if (this.props.disabledButton) {
            return null
        }
        this.props.addQuestions(this.props.questions.questions.length, this.props.match.params.id);
        let height = document.documentElement.scrollHeight;
        window.scrollTo({top: height, behavior: "smooth"});
    };

    onDragEnd = (result) => {
        const {destination, source} = result;
        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }
        let questions = this.props.questions.questions;
        let draggableQuestion = this.props.questions.questions[source.index];
        let answers = this.props.answers;
        let draggableAnswers = this.props.answers[source.index];
        answers.splice(source.index, 1);
        answers.splice(destination.index, 0, draggableAnswers);
        questions.splice(source.index, 1);
        questions.splice(destination.index, 0, draggableQuestion);
        for (let i = 0; i < this.props.questions.questions.length; i++) {
            if (questions[i].order_id !== i + 1) {
                questions[i].order_id = i + 1;
                this.props.PutQuestion(this.props.match.params.id, questions[i])
            }
        }
    };

    changeDescription = (event) => {
        this.props.editDescription(event.target.value);
        this.setState({
            quizNameDescriptionChange: true
        });
    };
    changeQuizName = (event) => {
        this.props.editQuizName(event.target.value);
        this.setState({
            quizNameDescriptionChange: true
        });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.quizChanges !== this.state.quizChanges) {
            this.props.PutQuiz(this.props.questions);
            this.setState({quizChanges: false});
        }
        if (this.props.questionNumberChanged !== false) {
            let questions = this.props.questions.questions;
            for (let i = 0; i < this.props.questions.questions.length; i++) {
                this.props.PutQuestion(this.props.match.params.id, questions[i])
            }
            this.props.questionsChanged(false)
        }
    }
    pointsChecked = (event) => {
        this.props.pointChecked(event);
        this.setState({quizChanges: true});
    };

    editQuizName = () => {
        this.setState({editQuizName: true})
    };

    onBlurQuizName = () => {
        this.setState({editQuizName: false});
        if (this.state.quizNameDescriptionChange) {
            this.setState({quizChanges: true});
            this.setState({quizNameDescriptionChange: false});
        }
    };
    onBlurDescription = () => {
            this.setState({editDescription: false});
            if (this.state.quizNameDescriptionChange) {
                this.setState({quizChanges: true});
                this.setState({quizNameDescriptionChange: false});
            }
    };
    // eslint-disable-next-line
    openPdfDialog = () => {
        this.setState({generatePdfDialog: true});
    };
    // eslint-disable-next-line
    closePdfDialog = () => {
        this.setState({generatePdfDialog: false});
    };

    editDescription = () => {
        this.setState({editDescription: true});
    };

    render() {
        if (this.props.questions === null) {
            return (
                <Preloader/>
            );
        }
        return (
            <div className={s.EditQuiz}>
                <Grid container
                      alignItems="flex-start"
                      justify="flex-start"
                      spacing={3}
                >
                    <Grid item lg={3} md={3} sm={2}>
                        <div className={s.ArrowButton}>
                            <Link to='/admin/quiz/editor'>
                                <IconButton color="primary">
                                    <ArrowBackIosIcon/>
                                </IconButton>
                            </Link>
                        </div>
                    </Grid>
                    <Grid item lg={6} md={6} sm={8} xs={12}>
                        <Grid
                            container
                            direction="column"
                            spacing={1}
                        >
                            <Paper square elevation={3} className={s.QuizNameDescription}>
                                <EditQuizInfo editModeQuizName={this.state.editQuizName}
                                              description={this.props.questions.description}
                                              quiz_name={this.props.questions.quiz_name}
                                              changeDescription={this.changeDescription}
                                              changeQuizName={this.changeQuizName}
                                              editDescription={this.editDescription}
                                              onBlurDescription={this.onBlurDescription}
                                              editQuizName={this.editQuizName}
                                              onBlurQuizName={this.onBlurQuizName}

                                              editModeDescription={this.state.editDescription}
                                              quiz_name={this.props.questions.quiz_name}
                                              description={this.props.questions.description}/>
                                <EditQuizSettings pointsChecked={this.pointsChecked}
                                                  points={this.props.questions.points}
                                                  lastedit={this.props.questions.last_edited_date}/>
                            </Paper>
                            <DragDropContext onDragEnd={this.onDragEnd}>
                                <Droppable droppableId={this.props.match.params.id.toString()}>
                                    {provided => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {this.props.questions.questions.map((val, index) =>
                                                <QuestionContainer
                                                    index={index}
                                                    key={val._id}
                                                    value={val}
                                                    questionsqw={this.props.questions.questions}
                                                    point={this.props.questions.points}
                                                    deleteQuestions={this.deleteQuestions}
                                                />)}
                                            {provided.placeholder}</div>)}</Droppable>
                            </DragDropContext>
                            <div className={s.AddButton}>
                                <IconButton color='primary'
                                            onClick={this.addNewQuestions}>
                                    <AddIcon fontSize='large'/>
                                </IconButton>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item lg={3} md={3} sm={2}>
                        <Paper square elevation={3}
                               className={this.props.questions.questions.length === 0 ? s.display : s.BoardRows}>
                            {this.props.questions.questions.map((val, index) =>
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
        this.props.requestQuestions(this.props.match.params.id);
    }
}

export default EditQuiz;

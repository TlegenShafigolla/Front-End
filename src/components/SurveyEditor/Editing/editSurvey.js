import React from "react";
import s from "../css/editSurvey.module.css";
import {Link} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import EditSurveyInfo from "../css/Question/EditSurveyInfo";
import Preloader from "../../common/Preloader";
import SurveyQuestionsContainer from "../../../containers/SurveyEditor/SurveyQuestionsContainer";

class EditSurvey extends React.Component {
        state = {
            editSurveyName: false,
            editDescription: false,
            surveyNameDescriptionChange: true,
            surveyChanges: false,
        };

    changeSurveyName = (event) => {
        this.props.editSurveyName(event.target.value);
        this.setState({
            surveyNameDescriptionChange: true
        });
    };

    changeDescription = (event) => {
        this.props.editDescription(event.target.value);
        this.setState({
            surveyNameDescriptionChange: true
        });
    };
    editDescription = () => {
        this.setState({editDescription: true});
    };
    onBlurSurveyName = () => {
            this.setState({editSurveyName: false});
            if (this.state.surveyNameDescriptionChange) {
                this.setState({surveyChanges: true});
                this.setState({surveyNameDescriptionChange: false});
            }
    };
    editSurveyName = () => {
        this.setState({editSurveyName: true})
    };
    onBlurDescription = () => {
            this.setState({editDescription: false});
            if (this.state.surveyNameDescriptionChange) {
                this.setState({surveyChanges: true});
                this.setState({surveyNameDescriptionChange: false});
            }
    };

    onDragEnd = (result) => {
        const {destination, source} = result;
        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }
        let questions =this.props.questions.questions;
        let draggableQuestion = this.props.questions.questions[source.index];
        questions.splice(source.index, 1);
        questions.splice(destination.index, 0, draggableQuestion);
        let answers = this.props.answers;
        let draggableAnswers = this.props.answers[source.index];
        answers.splice(source.index, 1);
        answers.splice(destination.index, 0, draggableAnswers);
        for (let i = 0; i <  this.props.questions.questions.length; i++) {
            if (questions[i].order_id !== i + 1) {
                questions[i].order_id = i + 1;
            this.props.PutQuestion(this.props.match.params.id, questions[i])
            }
        }
    };

componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.state.surveyChanges!==false){
        this.props.PutSurvey(this.props.questions);
        this.setState({surveyChanges: false});
    }
    if (this.props.questionNumberChanged !== false) {
        let questions = this.props.questions.questions;
        for (let i = 0; i < this.props.questions.questions.length; i++) {
            this.props.PutQuestion(this.props.match.params.id, questions[i])
        }
        this.props.questionsChanged(false)
    }
}

    addNewQuestion =  () => {
        if (this.props.disabledButton) {
            return null;
        }
        this.props.addQuestions(this.props.questions.questions.length, this.props.match.params.id);
        let height = document.documentElement.scrollHeight;
        window.scrollTo({top: height, behavior: "smooth"});
        this.setState({disableAddButton: false});
    };

    render() {
        if (this.props.questions === null) {
            return (
                <Preloader/>
            );
        }
        return (
            <div className={s.EditSurvey}>
                <Grid container
                      alignItems="flex-start"
                      justify="flex-start"
                      spacing={3}
                >
                    <Grid item lg={3} md={3} sm={2}>
                        <div className={s.ArrowButton}>
                            <Link to='/admin/survey/editor'>
                                <IconButton color="primary">
                                    <ArrowBackIosIcon/>
                                </IconButton>
                            </Link>
                        </div>
                    </Grid>
                    <Grid item lg={6} md={6} sm={8} xs={12}
                    >
                        <Grid
                            container
                            direction="column"
                            spacing={1}>
                            <Paper square elevation={3} className={s.SurveyNameDescription}>
                                <EditSurveyInfo
                                    editModeSurveyName={this.state.editSurveyName}
                                    description={this.props.questions.description}
                                    survey_name={this.props.questions.survey_name}
                                    changeDescription={this.changeDescription}
                                    changeSurveyName={this.changeSurveyName}
                                    editDescription={this.editDescription}
                                    onBlurDescription={this.onBlurDescription}
                                    editSurveyName={this.editSurveyName}
                                    onBlurSurveyName={this.onBlurSurveyName}
                                    editModeDescription={this.state.editDescription}/>
                            </Paper>
                            <DragDropContext onDragEnd={this.onDragEnd}>
                                <Droppable droppableId={this.props.match.params.id.toString()}>
                                    {provided => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}>
                                            {this.props.questions.questions.map((val, index) =>
                                                    <SurveyQuestionsContainer
                                                        index={index}
                                                        key={val._id}
                                                        value={val}
                                                        questionsqw={this.props.questions.questions}
                                                        deleteQuestion={this.deleteQuestion}
                                                    />)}
                                            {provided.placeholder}
                                        </div>)}
                                </Droppable>
                            </DragDropContext>
                            <div className={s.AddButton}>
                                <IconButton color='primary' size='medium'
                                            onClick={this.addNewQuestion}>
                                    <AddIcon fontSize='large'/>
                                </IconButton>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }

    componentDidMount() {
        this.props.requestQuestions(this.props.match.params.id);
    }
}

export default EditSurvey;
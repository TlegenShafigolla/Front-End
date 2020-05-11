import React from "react";
import s from "./editSurvey.module.css";
import {Link} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/core/SvgIcon/SvgIcon";
import TextField from "@material-ui/core/TextField/TextField";
import Typography from "@material-ui/core/Typography";
import EditSurveySettings from "./editSurveySettings";
import getQuestions from "../../services/API/adminAPI/Survey/questions";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import AddIcon from "@material-ui/icons/Add";
import Question from "./question";
import {postQuestions} from "../../services/API/adminAPI/Survey/questions";

class EditSurvey extends React.Component{
    constructor(props){
        super(props);
        const id = window.location.pathname.split('/');
        this.state = {
            survey_id: id[4],
            editSurveyName: false,
            editDescription: false,
            error: false,
            survey_name: "",
            description: "",
            questions: [],
            disableAddButton: false,
        };
    }

    changeSurveyName = () => {

    };

    changeDescription = () => {

    };

    onBlurSurveyName = () => {

    };

    onBlurDescription = () => {

    };

    onDragEnd = () => {

    };

    deleteQuestion = async (order_id) => {
        let questions = this.state.questions;
        questions.splice(order_id - 1, 1);
        for (let i = order_id - 1; i < questions.length; i++) {
            questions[i].order_id = i + 1;
        }
        await postQuestions(this.state.survey_id, questions);
        this.setState({questions: questions});
    };

    setQuestion = () => {

    };

    setAnswers = () => {

    };

    addNewQuestion = async () => {
        if (this.state.disableAddButton) {
            return;
        }
        this.setState({disableAddButton: true});
        const question = {
            order_id: this.state.questions.length + 1,
            survey_id: this.state.survey_id,
            image: null,
            question: " ",
            type: "FILL THE BLANK",
            required: false,
        };
        console.log('Adding');
        await postQuestions(this.state.survey_id, [question]).then(ret => {
            console.log(ret);
            const questions = this.state.questions;
            questions.push(ret.created[0]);
            this.setState({questions: questions});
        });
        let height = document.documentElement.scrollHeight;
        window.scrollTo({top: height, behavior: "smooth"});
        this.setState({disableAddButton: false});
    };

    render() {
        return (
            <div className={s.Body}>
                <div className={s.ArrowButton}>
                    <Link to='/admin/surveys/'>
                        <IconButton className={s.ArrowBackIosIcon} color="primary">
                            <ArrowBackIosIcon/>
                        </IconButton>
                    </Link>
                </div>
                <div className={s.Edit}>
                    <div className={s.SurveyName}>
                        {this.state.editSurveyName ?
                            <TextField error={this.state.error} onBlur={this.onBlurSurveyName} onChange={this.changeSurveyName}
                                       autoFocus fullWidth
                                       variant='outlined' margin='dense'
                                       defaultValue={this.state.survey_name}/> :
                            <Typography onClick={this.editSurveyName} noWrap
                                        variant='h4'> {this.state.survey_name}</Typography>}
                        {this.state.editDescription ?
                            <TextField error={this.state.error} onChange={this.changeDescription}
                                       onBlur={this.onBlurDescription}
                                       defaultValue={this.state.description} autoFocus variant='outlined'
                                       margin='dense' fullWidth multiline rows={2} rowsMax={5}/> :
                            <Typography onClick={() => this.setState({editDescription: true})}
                                        variant='body1'>{this.state.description}</Typography>}
                    </div>
                    <div className={s.Settings}>
                        <EditSurveySettings />
                    </div>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId={this.state.survey_id.toString()}>
                            {provided => (
                                <div
                                    className={s.Question}
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}>
                                    {this.state.questions === [] || this.state.questions === null ? '' :
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
                                    {provided.placeholder}
                                </div>)}
                        </Droppable>
                    </DragDropContext>
                    <div>
                        <IconButton color='primary' size='medium' className={s.AddButton} onClick={this.addNewQuestion}>
                            <AddIcon fontSize='large'/>
                        </IconButton>
                    </div>
                </div>
            </div>);
    }

    componentDidMount() {
        getQuestions(this.state.survey_id).then(json => {
            console.log(json);
            this.setState({
                survey_name: json.survey_name,
                description: json.description,
                questions: json.questions,
            });
        });
    }
}

export default EditSurvey;
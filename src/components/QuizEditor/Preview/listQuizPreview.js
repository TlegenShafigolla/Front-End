import React from "react";
import getQuiz, {deleteQuiz, postQuiz} from "../../../services/API/adminAPI/Quiz/quiz";
import s from './listQuizPreview.module.css'
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import ShowQuiz from "./showQuiz";

class ListQuizPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quizzes: null,
            editMode: false,
            disabledButton: false
        };
    }

    addNewQuizz = async () => {
        if (this.state.disabledButton) {
            return '';
        }
        this.setState({disabledButton: true});
        const quizzes = this.state.quizzes;
        const newQuiz = {
            quiz_name: "Quizname",
            description: "Description",
            mixed: null,
            showResults: null,
            points: null,
        };
        await postQuiz(newQuiz).then(val => {
            quizzes.push(val);
            this.props.history.push(`/admin/quiz/editor/edit/${val._id}`)
        });
        this.setState({disabledButton: false})
    };

    deleteQuiz = (quiz_id) => {
        let quizzes = this.state.quizzes;
        for (let i = 0; i < quizzes.length; i++) {
            if (quiz_id === quizzes[i]._id) {
                quizzes.splice(i, 1);
                break;
            }
        }
        this.setState({quizzes: quizzes});
    };

    render() {
        if (this.state.quizzes === null) {
            return (
                <div className={s.CircularProgress}>
                    <CircularProgress size={70}/>
                </div>
            );
        }
        return (
            <Grid container
                  justify="center"
                  alignItems="center"
            >
                <Grid item lg={6} md={6} sm={8} xs={12}>
                    {this.state.quizzes !== undefined ? this.state.quizzes.map((val, index) =>
                        <ShowQuiz key={val._id} id={index}
                                  index={index}
                                  value={val}
                                  deleteQuiz={this.deleteQuiz}
                                  quiz_id={val._id}
                                  quiz_name={val.quiz_name}
                                  description={val.description}
                                  last_edited_date={new Date(val.last_edited_date).toLocaleString()}
                        />
                    ) : ' '}
                    <Grid container
                          alignItems="center"
                          justify="center"
                    >
                        <IconButton color="primary" onClick={this.addNewQuizz}>
                            <AddIcon fontSize='large'/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>

        );
    }

    componentDidMount() {
        getQuiz().then(json => {
            this.setState({quizzes: json.quizzes})
        });
    }
}

export default ListQuizPreview;

import React from "react";
import getQuiz, {postQuiz} from "../../../services/adminAPI/quiz";
import Quiz from "./quiz";
import s from '../listQuizPreview.module.css'
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from "@material-ui/core/CircularProgress";

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
        this.setState({disabledButton: true})
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
            this.props.history.push(`/admin/quizzes/edit/${val._id}`);
        });
        this.setState({quizzes: quizzes})
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
            <div className={s.Container}>
                    <div>
                        {this.state.quizzes !== undefined ? this.state.quizzes.map((val, index) =>
                            <Quiz key={val._id} id={index}
                                  value={val}
                                  deleteQuiz={this.deleteQuiz}
                            />) : ' '}
                    </div>
                    <IconButton color="primary" onClick={this.addNewQuizz}>
                        <AddIcon fontSize='large'/>
                    </IconButton>

            </div>
        );
    }

    componentDidMount() {
        getQuiz().then(json => {
            this.setState({quizzes: json.quizzes})
        });
    }
}

export default ListQuizPreview;

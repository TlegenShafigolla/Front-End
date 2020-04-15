import React from "react";
import getQuiz, {postQuiz} from "../../../services/adminAPI/quiz";
import Quiz from "./quiz";
import s from '../listQuizPreview.module.css'
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';

class ListQuizPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quizzes: [],
            editMode: false
        };
    }

    addNewQuizz = async () => {
        const quizzes = this.state.quizzes;
        const newQuiz = {
            quiz_name: "Quizname",
            description: "Description",
            mixed: null,
            showResults: null,
            points: null,
        };
        await postQuiz(newQuiz).then(val => quizzes.push(val));
        this.setState({quizzes: quizzes})
    };

    deleteQuiz = (quiz_id) => {
        let quizzes = this.state.quizzes;
        for (let i = 0; i < quizzes.length; i++) {
            if(quiz_id === quizzes[i].id){
                quizzes.splice(i, 1);
                break;
            }
        }
        this.setState({quizzes: quizzes});
    };

    render() {
        return (
            <div className={s.Container}>
                <div className={s.Box}>
                    <div className={s.Quizz}>
                        {this.state.quizzes !== undefined ? this.state.quizzes.map((val, index) =>
                            <Quiz key={index} id={index}
                                  value={val}
                                  deleteQuiz={this.deleteQuiz}
                                   />) : ' '}
                    </div>
                    <IconButton color="primary" onClick={this.addNewQuizz}>
                        <AddIcon fontSize='large'/>
                    </IconButton>

                </div>
            </div>
        );
    }

//quiz_name description mixed showResult points
    componentDidMount() {
        getQuiz().then(json => {
            this.setState({quizzes: json.quizzes})
        });
    }
}

export default ListQuizPreview;

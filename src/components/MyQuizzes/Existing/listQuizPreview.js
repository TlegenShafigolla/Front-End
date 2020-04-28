import React from "react";
import getQuiz, {postQuiz} from "../../../services/adminAPI/quiz";
import Quiz from "./quiz";
import s from '../listQuizPreview.module.css'
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from "@material-ui/core/CircularProgress";
import {Redirect} from "react-router-dom";

class ListQuizPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quizzes: null,
            editMode: false,
            id:null,
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
        await postQuiz(newQuiz).then(val => {quizzes.push(val);
                     this.setState({id:val._id})
        });
        this.setState({quizzes: quizzes})
    };

    deleteQuiz = (quiz_id) => {
        let quizzes = this.state.quizzes;
        for (let i = 0; i < quizzes.length; i++) {
            if(quiz_id === quizzes[i]._id){
                quizzes.splice(i, 1);
                break;
            }
        }
        this.setState({quizzes: quizzes});
    };

    render() {
        if(this.state.quizzes === null){
            return (
                <div className={s.CircularProgress}>
                    <CircularProgress size={70}/>
                </div>
            );
        }
        if(this.state.id!==null) {
            return (<Redirect to={`/admin/quizzes/edit/${this.state.id}`}/>);
        }
        return (
            <div className={s.Container}>
                <div className={s.Box}>
                    <div className={s.Quizz}>
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

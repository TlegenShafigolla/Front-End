import React from "react";
import Container from '@material-ui/core/Container';
import getQuizzes from "../../../services/api/myquizzes";
import QuizPreview from "./quizPreview";
import s from '../listQuizPreview.module.css'
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from '@material-ui/icons/Search';
class   ListQuizPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quizzes: null
        };
    }

    render() {
        return (
            <div  className={s.Container}>

                <div className={s.Box}>
                    <div className={s.Quizz}>

                        {this.state.quizzes !== null ? this.state.quizzes.map(val => <QuizPreview key={val.id}
                                                                                                  value={val}/>) : ' '}
                    </div>
                    <IconButton color='primary' >
                        <AddIcon fontSize='large'/>
                    </IconButton>

                </div>
            </div>
        );
    }

    componentDidMount() {
        getQuizzes().then(json => {
            this.setState({quizzes: json.quizzes})
        });
    }
}

export default ListQuizPreview;

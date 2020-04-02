import React from "react";
import getQuizzes from "../../../services/api/myquizzes";
import Quiz from "./quiz";
import s from '../listQuizPreview.module.css'
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
class   ListQuizPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quizzes: null,
            editMode:false
        };
    }
addNewQuizz=()=>{
    const quizzes=this.state.quizzes;
    quizzes.push( {
        last_edited_date: '',
        quiz_name: "Quizname",
        description: "Description",
        id: this.state.quizzes.length+1,
        questions_count: 0,
    });
    this.setState({quizzes:quizzes})
}

    render() {
        return (
            <div  className={s.Container}>

                <div className={s.Box}>
                    <div className={s.Quizz}>

                        {this.state.quizzes !== null ? this.state.quizzes.map((val,index) => <Quiz key={index} id={index}
                                                                                           value={val} />) : ' '}
                    </div>
                    <IconButton color='primary'  onClick={this.addNewQuizz}>
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

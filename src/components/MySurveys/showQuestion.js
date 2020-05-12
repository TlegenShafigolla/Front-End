import React from "react";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/core/SvgIcon/SvgIcon";
import ShowAnswer from "./showAnswer";
import s from "./showQuestion.module.css";

class ShowQuestion extends React.Component{
    render(){
        return (
            <div id={this.props.value.order_id.toString()}>
                <div onClick={this.props.editOnClick}>
                    <div className={s.QuestionInfo}>
                        <div className={s.QuestionOrder}>{this.props.value.order_id}.</div>
                        <div className={s.QuestionField}>
                            <Typography variant="body1" gutterBottom>
                                {this.props.question === ' ' ? 'New question' : this.props.question}
                            </Typography>
                        </div>
                    </div>

                    <div className={s.AnswerType}>
                        <ShowAnswer
                            key={this.props.question_id}
                            question_id={this.props.question_id}
                            {...this.props}
                        />
                    </div>
                </div>
                <div className={s.Button}>
                    <IconButton aria-label="delete" onClick={this.props.deleteQuestionOnClick}>
                        <DeleteIcon/>
                    </IconButton>
                </div>
            </div>
        );
    }
}

export default ShowQuestion;
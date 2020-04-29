import React from "react";
import s from "./css/showQuestion.module.css";
import Typography from "@material-ui/core/Typography";
import ShowAnswer from "./showAnswer";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";

class ShowQuestion extends React.Component {
    render() {
        return (
            <div className={s.question} id={this.props.value.order_id.toString()}>
                <div className={s.questioninfo}  >
                    <div className={s.questionOrder} onClick={this.props.editOnClick}>{this.props.value.order_id}.</div>
                    <div className={s.questionField}>
                        <Typography onClick={this.props.editOnClick} variant="body1" gutterBottom>
                            {this.props.question === ' ' ? 'New question' : this.props.question}
                        </Typography>
                    </div>
                </div>

                <div className={s.answerType} onClick={this.props.editOnClick}>
                    <ShowAnswer
                        key={this.props.question_id}
                        question_id={this.props.question_id}
                        {...this.props}
                    />
                </div>

                <div className={s.Button}>
                    <IconButton aria-label="delete" onClick={this.props.deleteQuestionOnClick}>
                        <DeleteIcon/>
                    </IconButton>
                </div>
            </div>
        );
    }
};

export default ShowQuestion;
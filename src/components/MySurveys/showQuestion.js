import React from "react";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ShowAnswer from "./showAnswer";
import s from "./showQuestion.module.css";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
class ShowQuestion extends React.Component{
    render(){
        return (
            <Paper square elevation={3} id={this.props.value.order_id.toString()} className={s.Survey}>
                <div onClick={this.props.editOnClick}>
                    <div className={s.SurveyInfo}>
                        <div className={s.SurveyOrder}>{this.props.value.order_id}.</div>
                        <div className={s.SurveyField}>
                            <Typography variant="body1" gutterBottom>
                                {this.props.question === ' ' ? 'New question' : this.props.question}
                            </Typography>
                        </div>
                    </div>
                    <div>
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
            </Paper>
        );
    }
}

export default ShowQuestion;
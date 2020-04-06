import React from "react";
import s from "../MyQuizzes/Editing/css/showQuestion.module.css";
import Typography from "@material-ui/core/Typography";
import Answers from "./Answers";


class Question extends React.Component {
    render() {
        return (
            <div className={s.question} id={this.props.value.order_id.toString()}>
                <div className={s.questioninfo}>
                    <div className={s.questionOrder}>{this.props.value.order_id}.</div>
                    <div className={s.questionField}>
                        <Typography variant="body1" gutterBottom>
                            {this.props.value.question}
                        </Typography>
                    </div>
                    <div>
                        <Answers
                            onChangeAnswer={this.props.onChangeAnswer}
                            key={this.props.value.question_id}
                            onChangeCheck={this.props.onChangeCheck}
                            value={this.props.value}
                        />
                    </div>

                </div>


            </div>
        );
    }
}

export default Question;
import React from "react";
import s from "./Quiz.module.css";
import Typography from "@material-ui/core/Typography";
import Answers from "./Answers";
import {CssBaseline} from "@material-ui/core";


class Question extends React.Component {
    render() {
        return (
            <div className={s.question} id={this.props.value.order_id.toString()}>

                <div className={s.questionInfo}>
                    <div className={s.questionOrder}>{this.props.value.order_id}.</div>
                    <div className={s.questionField}>
                        <Typography variant="body1">
                            {this.props.value.question}
                        </Typography>
                    </div>
                </div>
                <hr/>
                <div>
                    <Answers
                        onChangeAnswer={this.props.onChangeAnswer}
                        key={this.props.value.question_id}
                        onChangeCheck={this.props.onChangeCheck}
                        value={this.props.value}
                    />

                </div>


            </div>
        );
    }
}

export default Question;
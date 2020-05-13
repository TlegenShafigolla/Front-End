import React from "react";
import s from "./Questions.module.css";
import Typography from "@material-ui/core/Typography";
import Answers from "./Answers";
import Divider from "@material-ui/core/Divider";


class Questions extends React.Component {
    render() {
        return (
            <div className={s.Question} id={this.props.index.toString()}>

                <div className={s.QuestionInfo}>
                    <Typography variant="h6" component="h2">
                        {this.props.index+1}.</Typography>
                    <div className={s.QuestionField}>
                        <Typography variant="h6" component="h2">
                            {this.props.value.question}
                        </Typography>
                    </div>
                </div>
                <Divider/>
                <div>
                    <Answers
                        onChangeAnswer={this.props.onChangeAnswer}
                        key={this.props.value._id}
                        onChangeCheck={this.props.onChangeCheck}
                        value={this.props.value}
                    />

                </div>
            </div>
        );
    }
}

export default Questions;
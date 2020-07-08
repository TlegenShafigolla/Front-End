import React from "react";
import s from "./Questions.module.css";
import Answers from "./Answers";
import Divider from "@material-ui/core/Divider";


class Questions extends React.Component {
    render() {
        return (
            <div className={s.Survey} id={this.props.index.toString()}>

                <div className={s.SurveyInfo}>
                   <span>
                        {this.props.index+1}.</span>
                    <div className={s.SurveyField}>
                        <span>
                            {this.props.value.question}
                        </span>
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
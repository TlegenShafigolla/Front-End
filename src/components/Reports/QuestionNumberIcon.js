import React from "react";
import s from './QuestionNumberIcon.css'

class QuestionNumberIcon extends React.Component{

    render() {

        return(
            <div className="container">
                <div className={this.props.correct ? "correctSquare" : "square"}>
                    {this.props.val}
                </div>
            </div>
        );
    }
}

export default QuestionNumberIcon;
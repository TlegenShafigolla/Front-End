import React from "react";
import Typography from "@material-ui/core/Typography";
import s from './ReportQuestion.module.css'

class ReportQuestion extends React.Component{
    render() {
        if(this.props.val === null){
            return '';
        }
        return(
            <div className={s.question} id={this.props.val.question_id.toString()}>
                <div className={s.questioninfo}>
                    <div className={s.questionOrder}>{this.props.val.order_id}.</div>
                    <div className={s.questionField}>
                        <Typography variant="body1" gutterBottom>
                            {this.props.val.question}
                        </Typography>
                    </div>
                </div>
                <div className={s.answer}>
                    {this.props.val.answers === null ? '' : this.props.val.answers.map(val =>
                        <Typography  className={s.typography} variant="body1" gutterBottom key={val.id}>
                            {val.answer}
                        </Typography>
                    )}
                </div>
            </div>
        );
    }
}

export default ReportQuestion;
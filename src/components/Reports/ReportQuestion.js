import React from "react";
import Typography from "@material-ui/core/Typography";
import s from './ReportQuestion.module.css'
import Checkbox from "@material-ui/core/Checkbox";

class ReportQuestion extends React.Component{
    render() {
        if(this.props.val === null){
            return '';
        }
        let map = {};
        let key = this.props.points ? "points" : "correct";
        for(let i = 0; i < this.props.val.session.length; i++) {
            map[this.props.val.session[i].answer_id] = this.props.val.session[i][key];
        }
        return(
            <div>
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
                            <div key={val.id + 'div'} className={s.answerForm}>
                                <Checkbox
                                    key={val.id + 'Checkbox'}
                                    color='primary'
                                    checked={val.correct > 0 || val.points > 0}
                                    />
                                <Typography
                                    className={map[val.id] > 0 ? s.typographyCorrect: map[val.id] === 0 ? s.typographyWrong: s.typography}
                                    variant="body1"
                                    key={val.id}>
                                    {val.answer}
                                </Typography>
                            </div>
                        )}
                    </div>
                    </div>
                {this.props.val.type !== "FILL THE BLANK" ? null :
                    <div className={s.question}>
                        {this.props.val.session === null ? '' : this.props.val.session.map(val =>
                            <Typography
                                className={s.typography}
                                variant="body1"
                                key={val.id}>
                                {val.answer}
                            </Typography>
                        )}
                    </div>
                }
            </div>
        );
    }
}

export default ReportQuestion;
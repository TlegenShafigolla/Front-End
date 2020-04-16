import React from "react";
import Typography from "@material-ui/core/Typography";
import s from './ReportQuestion.module.css'
import Checkbox from "@material-ui/core/Checkbox";
import {green} from "@material-ui/core/colors";
import red from "@material-ui/core/colors/red";

class ReportQuestion extends React.Component {
    render() {
        if (this.props.val === null) {
            return '';
        }
        let map = {};
        let key = this.props.points ? "points" : "correct";
        for (let i = 0; i < this.props.val.session.length; i++) {
            map[this.props.val.session[i].answer_id] = this.props.val.session[i][key];
        }
        const correct = green.A700;
        const wrong = red.A700;
        console.log(this.props.val)
        return (
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
                    <div >
                        {this.props.val.answers === null ? '' : this.props.val.answers.map(val =>
                            <div key={val.id + 'div'} className={s.answer}>
                                <div className={s.answerForm}>
                                <Checkbox
                                    disableRipple
                                    style={map[val.id] > 0 ? {color: correct} : map[val.id] === 0 ? {color: wrong} : {color: 'primary'}}
                                    key={val.id + 'Checkbox'}
                                    checked={val.point > 0 || val.correct > 0 || map[val.id] > 0 ? true : map[val.id] === 0 ? true : false}
                                />
                                <Typography
                                    variant="body1"
                                    key={val.id}>
                                    {val.answer}
                                </Typography>
                                </div>
                                <div>
                                    {this.props.points ? (val.points > 0 ? <Typography
                                        color='textSecondary'>points: {val.points}</Typography> : '') : (val.correct === 1 ?
                                        <Typography color='textSecondary'>correct</Typography> : '')}
                                    {console.log(map[val.id])}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {this.props.val.type !== "FILL THE BLANK" ? null :
                    <div className={s.question}>
                        <p>Answers: </p>
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
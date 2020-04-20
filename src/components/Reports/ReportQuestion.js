import React from "react";
import s from './ReportQuestion.module.css'
import {Checkbox, InputBase, Typography} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import red from "@material-ui/core/colors/red";
import Button from "@material-ui/core/Button";
import {postReport} from "../../services/adminAPI/reports";

class ReportQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            points: null,
            correct: 0,
            disabledButton: false,
            id: null
        }
    }

    onClickSaveButton = async () => {
        if (this.state.disabledButton) {
            return;
        }
        this.setState({disabledButton: true});
        let id=this.state.id;
        let points=this.state.points;
        let correct=this.state.correct
        await postReport(id, correct, points,).then(val => console.log(val))
        this.setState({disabledButton: false})
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.val !== this.props.val) {
            this.setState({id: this.props.val.session[0].id})
            console.log(this.props.val)
        }
    }
    onChangeCheckbox=(event)=>{
        if(event.target.checked) {
            this.setState({correct: 1})
        }
        this.setState({correct: 0})
    };
    onChangeInputBase = (event) => {
        this.setState({point: Number(event.target.value)})
    };

    render() {
        console.log(this.state.point)
        console.log(this.state.val)

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
        console.log(this.props.val.answers[0].id)
        console.log(this.state.id)
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
                    <div>
                        {this.props.val.answers === null ? '' : this.props.val.answers.map(val =>
                            <div key={val.id + 'div'} className={s.answer}>
                                <div className={s.answerForm}>
                                    <Checkbox
                                        disableRipple
                                        style={this.props.val.type !== "FILL THE BLANK" ? (map[val.id] > 0 ? {color: correct} : map[val.id] === 0 ? {color: wrong} : {color: 'primary'}) : {color: correct}}
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
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {this.props.val.type !== "FILL THE BLANK" ? null :
                    <div className={s.question}>
                        <p>Answers: </p>
                        {this.props.val.session === null ? '' : this.props.val.session.map(val =>
                            <div className={s.answers} key={val.id}>
                                <Typography
                                    className={s.typography}
                                    variant="body1"
                                    key={val.id}>
                                    {val.answer}
                                </Typography>
                                {this.props.points ? <InputBase defaultValue={val.points}
                                                                type={'number'}
                                                                onChange={this.onChangeInputBase}
                                /> : <Checkbox onChange={this.onChangeCheckbox}/>}
                            </div>
                        )}
                        <Button onClick={this.onClickSaveButton}>Save</Button>
                    </div>
                }
            </div>
        );
    }
}

export default ReportQuestion;
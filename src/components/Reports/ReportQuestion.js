import React from "react";
import s from './ReportQuestion.module.css'
import {Checkbox, InputBase, Typography} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import red from "@material-ui/core/colors/red";
import Button from "@material-ui/core/Button";
import {postReport} from "../../services/adminAPI/reports";
import $ from 'jquery'
class ReportQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            points: 0,
            correct: false,
            disabledButton: false,
            id: null,
        }
    }

    onClickSaveButton = async () => {
        if (this.state.disabledButton) {
            return;
        }
        this.setState({disabledButton: true});
        let id = this.state.id;
        let points = this.state.points;
        let correct = Number(this.state.correct);
        let session_id = this.props.session._id;
        await postReport(id, correct, points, session_id).then(val=>{
           console.log(val)
        });
        let count=1;
        this.props.newState(count);

        $('#ButtonSave').hide(500);
        this.setState({disabledButton: false})
    };

    onChangeCheckbox=(event)=>{
        this.setState({id: event.target.id});
        this.setState({correct: event.target.checked});
        $('#ButtonSave').show(500)
    };
    onChangeInputBase = (event) => {
        this.setState({points: event.target.value});
        this.setState({id: event.target.id});
        $('#ButtonSave').show(500)
    };

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
        return (
            <div>
                <div className={s.question} id={this.props.val._id.toString()}>
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
                        {this.props.val.session === null ? '' : this.props.val.session.map((val, index) =>
                            <div className={s.answers} key={val.id}>
                                <Typography
                                    className={s.typography}
                                    variant="body1"
                                    key={val.id}>
                                    {val.answer}
                                </Typography>
                                {this.props.points ? (<InputBase id={val._id.toString()} className={s.InputBase} defaultValue={val.points}
                                                                type={'number'}
                                                                onChange={this.onChangeInputBase}
                                /> ): <Checkbox style={val.correct===1||this.state.correct ? {color:correct}:
                                    {color:'#3333'}} defaultChecked={val.correct===1} id={val._id.toString()} onChange={this.onChangeCheckbox}/>}
                            </div>
                        )}
                        <div className={s.SaveButton} id='ButtonSave'>
                        <Button  onClick={this.onClickSaveButton}>Save</Button>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default ReportQuestion;
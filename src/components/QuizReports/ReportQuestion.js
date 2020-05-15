import React from "react";
import s from './ReportQuestion.module.css'
import {Checkbox, InputBase, Typography} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import red from "@material-ui/core/colors/red";
import Button from "@material-ui/core/Button";
import {postReport} from "../../services/API/adminAPI/Quiz/reports";
import $ from 'jquery'
import FillTheBlank from "./FillTheBlankReport";
import MultipleChoiceReport from "./MultipleChoiceReport";

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
        await postReport(id, correct, points, session_id).then(val => {
            console.log(val)
        });
        let count = 1;
        this.props.newState(count);

        $('#ButtonSave').hide(500);
        this.setState({disabledButton: false})
    };


    onChangeCheckbox = (event) => {
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
        let length = this.props.val.session !== undefined ? this.props.val.session.length : 0;
        for (let i = 0; i < length; i++) {
            map[this.props.val.session[i].answer_id] = this.props.val.session[i][key];
        }
        const correct = green.A700;
        const wrong = red.A700;
        return (
            <div>
                {this.props.val.type !== "FILL THE BLANK" ? <MultipleChoiceReport val={this.props.val}/> :
                    <FillTheBlank val={this.props.val}
                                  points={this.props.points}
                                  onChamgeInputBase={this.onChangeInputBase}
                                  onChangeCheckbox={this.onChangeCheckbox}
                                  onClickSaveButton={this.onClickSaveButton}/>
                }
            </div>
        );
    }
}

export default ReportQuestion;
import React from "react";
import {postReport} from "../../services/API/adminAPI/Quiz/reports";
import FillTheBlank from "./FillTheBlankReport";
import MultipleChoiceReport from "./MultipleChoiceReport";

class ReportQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            points: 0,
            disabledButton: false,
            id: null,
        }
    }


    onChangeCheckbox = async (event) => {
        let id = event.target.id
        let points = Number(event.target.checked);
        let session_id = this.props.session._id;
        await postReport(id, points, session_id)
    };
    onChangeInputBase = (event) => {
        this.setState({points: event.target.value});
        this.setState({id: event.target.id});
    };
    onSubmitInput = () => {
        let id = this.state.id;
        let points = this.state.points;
        let session_id = this.props.session._id;
        postReport(id, points, session_id).then(val => {
            console.log(val)
        });
    };

    render() {
        if (this.props.val === null) {
            return '';
        }
        return (
            <div>
                {this.props.val.type !== "FILL THE BLANK" ? <MultipleChoiceReport val={this.props.val}/> :
                    <FillTheBlank val={this.props.val}
                                  points={this.props.points}
                                  onChangeInputBase={this.onChangeInputBase}
                                  onChangeCheckbox={this.onChangeCheckbox}
                                  onSubmitInput={this.onSubmitInput}/>
                }
            </div>
        );
    }
}

export default ReportQuestion;
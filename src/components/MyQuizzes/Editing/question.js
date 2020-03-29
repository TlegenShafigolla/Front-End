import React from "react";
import ShowQuestion from "./showQuestion";
import EditQuestion from "./editQuestion";


class Question extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            editMode: false,
            answerType: this.props.value.type,
        };
    }

    changeType = (newType) => {
        this.setState({answerType: newType});
        console.log(this.state.answerType);
        console.log(this.state.editMode);
    };

    editOnClick = () => {
        this.setState({editMode: true});
    };

    saveOnClick = () => {
        this.setState({editMode: false});
    };

    render() {
        if(this.state.editMode){
            return <EditQuestion saveOnClick={this.saveOnClick} changeType={this.changeType} editMode={this.state.editMode}
                                 answerType={this.state.answerType}{...this.props}/>
        } else{
            return <ShowQuestion editOnClick={this.editOnClick} editMode={this.state.editMode}
                                 answerType={this.state.answerType} {...this.props}/>
        }
    }
}

export default Question;

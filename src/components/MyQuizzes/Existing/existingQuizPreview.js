import React from "react";

class QuizPreview extends React.Component{

    render() {
        return (
            <div> {this.props.value.description.toString()} </div>
        );
    }
}

export default QuizPreview;

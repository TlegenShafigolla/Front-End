import React from "react";
import s from './editQuestion.module.css'



class EditQuestion extends React.Component {
    render() {
        return (
            <div className={s.question}>
                <div>{this.props.value.order_id}</div>
                <div>{this.props.value.question}</div>
                <div>{this.props.value.type}</div>
            </div>
        );
    }
}

export default EditQuestion;

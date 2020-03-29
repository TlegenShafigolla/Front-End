import React from "react";
import s from "./editQuestion.module.css";
import Typography from "@material-ui/core/Typography";
import EditAnswer from "./editAnswer";
import Button from "@material-ui/core/Button";

class ShowQuestion extends React.Component{
    render() {
        return (
            <div className={s.question}>
                <div className={s.questionOrder}>{this.props.value.order}</div>
                <div className={s.questionField}>
                    <Typography variant="body1" gutterBottom>
                        {this.props.value.question}
                    </Typography>
                </div>
                <div className={s.answerType}>
                    <EditAnswer editMode={this.props.editMode} type={this.props.answerType} id={this.props.value.id} changeType={this.props.changeType}/>
                </div>
                <Button variant="contained" color="primary" onClick={this.props.editOnClick}>
                    Edit
                </Button>
            </div>
        );
    }
};

export default ShowQuestion;
import React from "react";
import s from "./css/editQuestion.module.css";
import Typography from "@material-ui/core/Typography";
import EditAnswer from "./editAnswer";
import Button from "@material-ui/core/Button";
import ShowAnswer from "./showAnswer";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";

class ShowQuestion extends React.Component {
    render() {
        return (
            <div className={s.question} id={this.props.value.order_id}>
                <div className={s.questioninfo}>
                    <div className={s.questionOrder}>{this.props.value.order_id}.</div>
                    <div className={s.questionField}>
                        <Typography variant="body1" gutterBottom>
                            {this.props.value.question}
                        </Typography>
                    </div>
                </div>

                <div className={s.answerType}>
                    <ShowAnswer
                        id={this.props.value.id}
                        {...this.props}
                    />
                </div>

                <div className={s.Button}>
                    <IconButton color="primary" onClick={this.props.editOnClick}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton aria-label="delete" onClick={this.props.deleteOnClick}>
                        <DeleteIcon/>
                    </IconButton>
                </div>
            </div>
        );
    }
};

export default ShowQuestion;
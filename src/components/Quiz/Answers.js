import React from "react";
import {Checkbox} from "@material-ui/core";
import s from "./Quiz.module.css";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Divider from "@material-ui/core/Divider";

class Answers extends React.Component {

    render() {
        if (this.props.value.type === 'MULTIPLE CHOICE') {
            return (
                <div >
                    <ol type='A' >
                        {this.props.value.answers === null ? '' : this.props.value.answers.map((val, index) =>
                            <div key={index}>
                                <div  className={s.Answer}>
                                    <li>  {val.answer}</li>
                                    <Checkbox id={val.question_id.toString()}
                                              value={val._id.toString()}
                                              onChange={this.props.onChangeCheck}
                                              color='primary' size='small'/>
                                </div>
                                <Divider/>
                            </div>
                        )}
                    </ol>

                </div>
            );
        } else {
            return (
                <div>
                    {this.props.value.answers.length === 0 ? <TextareaAutosize className={s.textarea} id={this.props.value._id} onChange={this.props.onChangeAnswer} /> : this.props.value.answers.map((val, index) =>
                        <TextareaAutosize id={val.question_id.toString()} className={s.textarea} key={index}
                                          onChange={this.props.onChangeAnswer}/>
                    )}
                </div>
            );
        }

    }


}

export default Answers;
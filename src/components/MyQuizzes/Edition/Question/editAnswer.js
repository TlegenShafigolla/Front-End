import React from "react";
import s from '../css/editAnswer.module.css'
import FillTheBlank from "./AnswerTypes/fillTheBlank";
import MultipleChoice from "./AnswerTypes/multipleChoice";
class EditAnswer extends React.Component {
    render() {
        return (
            <div>
                <div className={s.TextField}>
                    {!this.props.isMultipleChoice ?
                        <FillTheBlank
                            {...this.props}
                        /> : this.props.answers.map((val, index) =>
                                <MultipleChoice
                                    id={index.toString()}
                                    key={this.props.index_key[index]}
                                    val={val}
                                    index={index}
                                    {...this.props}
                                />)
                    }
                </div>

            </div>
        );
    }
}
export default EditAnswer;

/* {this.props.answers === [] ? '555' : this.props.answers.map((val, index) =>
                        <div key={this.props.index_key[index]} >
                            <EditAnswer
                                id={index.toString()}
                                key={this.props.index_key[index]}
                                val={val}
                                index={index}
                                isMultipleChoice={this.state.isMultipleChoice}
                                {...this.props}
                            />
                        </div>
                    )} */
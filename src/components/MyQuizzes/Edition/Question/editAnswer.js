import React from "react";
import s from '../css/editAnswer.module.css'
import FillTheBlank from "./AnswerTypes/fillTheBlank";
import MultipleChoice from "./AnswerTypes/multipleChoice";
const EditAnswer =(props)=> {
        return (
                <div className={s.TextField}>
                    {!props.isMultipleChoice ?
                        <FillTheBlank
                            {...props}
                        /> : props.answers.map((val, index) =>
                                <MultipleChoice
                                    id={index.toString()}
                                    key={props.index_key[index]}
                                    val={val}
                                    index={index}
                                    {...props}
                                />)
                    }
                </div>

        );
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
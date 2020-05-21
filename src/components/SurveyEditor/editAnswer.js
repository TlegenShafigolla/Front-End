import React from "react";
import MultipleChoice from "./multipleChoice";
import s from "./editAnswer.module.css";

class EditAnswer extends React.Component{
    render() {
        return(
            <div className={s.TextField}>
                {this.props.isMultipleChoice ?
                     this.props.answers.map((val, index) =>
                        <MultipleChoice
                            id={index.toString()}
                            key={this.props.index_key[index]}
                            val={val}
                            index={index}
                            {...this.props}
                        />) : null}
            </div>

        );
    }
}

export default EditAnswer;
import React from "react";
import s from './css/editAnswer.module.css'
import FillTheBlank from "./fillTheBlank";
import MultipleChoice from "./multipleChoice";
class EditAnswer extends React.Component {
    render() {
        console.log(this.props.isMultipleChoice)
        return (
            <div>
                <div className={s.TextField}>
                    {!this.props.isMultipleChoice ?
                        <FillTheBlank
                            {...this.props}
                        />:<MultipleChoice
                            {...this.props}
                        />
                    }
                </div>

            </div>
        );
    }
}
export default EditAnswer;
import React from "react";
import AddIcon from "@material-ui/core/SvgIcon/SvgIcon";
import IconButton from "@material-ui/core/IconButton";
import s from "./listSurveysPreview.module.css";
import Survey from "./survey";

class ListSurveyPreview extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            surveys: [],
        }
    }

    addNewSurvey = () => {

    };

    render(){
        return(
            <div className={s.Container}>
                <div>
                    {this.state.surveys.map((val, index) => {
                        return <Survey/>
                    })}
                </div>
                <IconButton color="primary" onClick={this.addNewSurvey}>
                    <AddIcon fontSize='large'/>
                </IconButton>
            </div>
        );
    }
}

export default ListSurveyPreview
import React from "react";
import AddIcon from "@material-ui/core/SvgIcon/SvgIcon";
import IconButton from "@material-ui/core/IconButton";
import s from "./listSurveysPreview.module.css";
import Survey from "./survey";
import getSurvey, {postSurvey} from "../../services/API/adminAPI/Survey/survey";
import Button from "@material-ui/core/Button";

class ListSurveyPreview extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            surveys: [],
            disabledButton: false,
        }
    }

    addNewSurvey = async () => {
        console.log("Here");
        if(this.state.disabledButton){
            return
        }
        this.setState({disabledButton: true});
        const surveys = this.state.surveys;
        const newSurvey = {
            survey_name: "Survey",
            description: "Description"
        };
        await postSurvey(newSurvey).then(val => {
            console.log(val);
            surveys.push(val);
            this.props.history.push(`/admin/surveys/edit/${val._id}`);
        });
        this.setState({surveys: surveys});
        this.setState({disabledButton: false});
    };

    render(){
        return(
            <div className={s.Container}>
                <div>
                    {this.state.surveys.map((val, index) => {
                        return <Survey key={val._id} value={val}/>
                    })}
                </div>
                <Button color="primary" onClick={this.addNewSurvey}>
                    Add New Survey
                </Button>
            </div>
        );
    }

    componentDidMount() {
        getSurvey().then(json => {
            this.setState({surveys: json.surveys});
        });
    }
}

export default ListSurveyPreview
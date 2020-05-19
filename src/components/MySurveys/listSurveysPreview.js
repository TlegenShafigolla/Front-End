import React from "react";
import Survey from "./survey";
import getSurvey, {deleteSurvey, postSurvey} from "../../services/API/adminAPI/Survey/survey";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

class ListSurveyPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            surveys: [],
            disabledButton: false,
        }
    }

    addNewSurvey = async () => {
        console.log("Here");
        if (this.state.disabledButton) {
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
    deleteSurvey = (survey_id) => {
        debugger
        let surveys = this.state.surveys;
        deleteSurvey(survey_id).then(json => console.log(json))
        for (let i = 0; i < surveys.length; i++) {
            if (survey_id === surveys[i]._id) {
                surveys.splice(i, 1);
            }
        }
        this.setState({surveys: surveys});
    };

    render() {
        console.log(this.state.surveys)
        return (
            <Grid container
                  justify="center"
                  alignItems="center"
            >
                <Grid item lg={6} md={6} sm={8} xs={12}>
                    {this.state.surveys.map((val, index) => <Survey key={val._id} deleteSurvey={this.deleteSurvey}
                                                                    value={val}/>
                    )}
                    <Grid container
                          alignItems="center"
                          justify="center"
                    >
                        <Button color="primary" onClick={this.addNewSurvey}>
                            Add New Survey
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        );
    }

    componentDidMount() {
        getSurvey().then(json => {
            console.log(json)
            this.setState({surveys: json.surveys});
        });
    }
}

export default ListSurveyPreview
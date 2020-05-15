import React from "react";
import {getReportId} from "../../services/API/adminAPI/Survey/reports";
import s from "../QuizReports/Report.module.css";
import Typography from "@material-ui/core/Typography";
import ReportCard from "./ReportCard";
import ReportSurvey from "./ReportSurvey";

class Report extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            report: null
        }
    }

    render() {
        if (this.state.report === null) {
            return '';
        }
        console.log(this.state.report)
        return (
            <div className={s.Container}>
                <div className={s.Box}>
                    <Typography className={s.quizName} variant="h5" component="p" gutterBottom>
                        {this.state.report.survey.survey_name}
                    </Typography>
                    <div className={s.Root}>
                        <ReportCard report={this.state.report}/>
                    </div>
                </div>
                {this.state.report.questions.map(val=><ReportSurvey key={val._id} val={val}/>)}
            </div>
        );
    }

    componentDidMount() {
        const path = window.location.pathname.split('/')
        console.log(path[4])
        getReportId(path[4]).then(value => {
            console.log(value)
            this.setState({report: value})
        })
    }
}

export default Report;
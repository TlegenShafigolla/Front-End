import React from "react";
import s from "../QuizReports/Report.module.css";
import ReportCard from "./ReportCard";
import ReportSurvey from "./ReportSurvey";

class Report extends React.Component {
    render() {
        console.log(this.props)
        if (this.props.report === null||this.props.report===undefined) {
            return '';
        }
        return (
            <div className={s.Container}>
                <div className={s.Box}>
                        <ReportCard report={this.props.report}/>
                </div>
                {this.props.report.questions.map(val=><ReportSurvey key={val._id} val={val}/>)}
            </div>
        );
    }

    componentDidMount() {
        this.props.RequestSurveyReport(this.props.match.params.id)
    }
}

export default Report;
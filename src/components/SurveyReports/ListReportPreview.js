import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import {getReports} from "../../services/API/adminAPI/Survey/reports";
import ReportSurveyPreview from "./ReportPreview";
import s from "../QuizReports/ListReportPreview.module.css";


class ListReportSurveyPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Reports: []
        };
    }

    render() {
        if (this.state.Reports === []) {
            return (
                <div>
                    <CircularProgress size={70}/>
                </div>
            );
        }
        console.log(this.state.Reports)
        return (
            <div className={s.Container}>
                <div className={s.Box}>
                    <div>
                        {this.state.Reports !== [] ? this.state.Reports.map((val, index) =>
                            <ReportSurveyPreview id={index} key={val._id} val={val}/>) : ' '}
                    </div>
                </div>
            </div>

        );
    }

    componentDidMount() {
        getReports().then(val => this.setState({Reports: val.Reports}))
    }
}

export default ListReportSurveyPreview;
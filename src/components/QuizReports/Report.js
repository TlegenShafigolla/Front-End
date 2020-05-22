import React from "react";
import {getReport} from "../../services/API/adminAPI/Quiz/reports";
import s from "./Report.module.css";
import ReportQuestion from "./ReportQuestion";
import ReportCard from "./ReportCard";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

class Report extends React.Component {
    constructor(props) {
        super(props);
        const {id} = this.props.match.params;
        this.state = {
            tab: 0,
            report_id: id,
            report: null,
            correctQuestions: null,
        };
    }


    render() {
        if (this.state.report === null) {
            return '';
        }
        return (
            <Grid container
                  alignItems="flex-start"
                  justify="center"
            >
                <div className={s.ArrowButton}>
                    <Link to={`/admin/quizzes/${this.state.report.quiz._id}`}>
                        <IconButton color="primary">
                            <ArrowBackIosIcon/>
                        </IconButton>
                    </Link>
                </div>
                <Grid item lg={6} md={6} sm={9} xs={12}>
                    <div className={s.Root}>
                        <ReportCard report={this.state.report}/>
                    </div>
                    {this.state.report.questions.map(val => <ReportQuestion val={val}
                                                                            key={val._id}
                                                                            session={this.state.report.session}
                                                                            newState={this.newState}
                                                                            points={this.state.report.quiz.points}/>)}

                </Grid>

            </Grid>
        );
    }


    componentDidMount() {
        getReport(this.state.report_id).then(val => {
            console.log(val);
            this.setState({report: val});
        })

    }
}

export default Report;
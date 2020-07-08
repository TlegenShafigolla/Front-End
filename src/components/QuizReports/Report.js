import React from "react";
import s from "./Report.module.css";
import ReportQuestion from "./ReportQuestion";
import ReportCard from "./ReportCard";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";

class Report extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            points: 0,
            id: null,
        }
    }
    onChangeCheckbox =  (event) => {
        let id = event.target.id
        let points = Number(event.target.checked);
        let session_id = this.props.report.session._id;
        this.props.PutReport(id, points, session_id)
    };
    onChangeInputBase = (event) => {
        this.setState({points: event.target.value});
        this.setState({id: event.target.id});
    };
    onSubmitInput = () => {
        let id = this.state.id;
        let points = this.state.points;
        let session_id = this.props.report.session._id;
        this.props.PutReport(id, points, session_id)
    };
    render() {
        if (this.props.report === null) {
            return '';
        }
        return (
            <Grid container
                  alignItems="flex-start"
                  justify="center"
            >
                <div className={s.ArrowButton}>
                    <Link to={`/admin/quizzes/${this.props.report.quiz._id}`}>
                        <IconButton color="primary">
                            <ArrowBackIosIcon/>
                        </IconButton>
                    </Link>
                </div>
                <Grid item lg={6} md={6} sm={9} xs={12}>
                    <div className={s.Root}>
                        <ReportCard report={this.props.report}/>
                    </div>
                    {this.props.report.questions.map(val => <ReportQuestion val={val}
                                                                            key={val._id}
                                                                            onChangeCheckbox={this.onChangeCheckbox}
                                                                            onSubmitInput={this.onSubmitInput}
                                                                            onChangeInputBase={this.onChangeInputBase}
                                                                            points={this.props.report.quiz.points}/>)}

                </Grid>

            </Grid>
        );
    }


    componentDidMount() {
       this.props.RequestReport(this.props.match.params.id)
    }
}

export default Report;
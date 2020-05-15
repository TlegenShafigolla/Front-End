import React from "react";
import {getReport} from "../../services/API/adminAPI/Quiz/reports";
import s from "./Report.module.css";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import QuestionNumberIcon from "./QuestionNumberIcon";
import ReportQuestion from "./ReportQuestion";
import ReportCard from "./ReportCard";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";

class Report extends React.Component {
    constructor(props) {
        super(props);
        const {id} = this.props.match.params;
        this.state = {
            tab: 0,
            report_id: id,
            report: null,
            question: null,
            correctQuestions: null,
            count: false
        };
    }

    newState = (count) => {
        this.setState({count: !this.state.count})
    };
    scrollTabHandleChange = (event, newValue) => {
        this.setState({question: this.state.report.questions[newValue], tab: newValue});
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.count !== this.state.count) {
            getReport(this.state.report_id).then(val => {
                this.setState({report: val});
            })
        }
    }

    render() {
        if (this.state.report === null) {
            return '';
        }
        return (
            <div className={s.Container}>
                <div className={s.ArrowButton}>
                    <Link to='/admin/reports'>
                        <IconButton color="primary">
                            <ArrowBackIosIcon/>
                        </IconButton>
                    </Link>
                </div>
                <div className={s.Box}>
                    <Typography className={s.quizName} variant="h5" component="p" gutterBottom>
                        {this.state.report.quiz.quiz_name}
                    </Typography>
                    <div className={s.Root}>
                        <ReportCard report={this.state.report}/>
                    </div>
                    <div className={s.Tabs}>
                        <AppBar position="static" color="inherit">
                            <Tabs
                                value={this.state.tab}
                                onChange={this.scrollTabHandleChange}
                                variant="scrollable"
                                scrollButtons="on"
                                indicatorColor="primary"
                                textColor="primary"
                                aria-label="scrollable force tabs example"
                            >
                                {this.state.report.questions.map((val, index) =>
                                    <Tab id={index} key={val._id}
                                         fullWidth={false}
                                         icon={<QuestionNumberIcon points={this.state.report.quiz.points}
                                                                    val={val}
                                                                   index={index}
                                                                />
                                            }
                                    />)}
                            </Tabs>
                        </AppBar>
                    </div>
                        <ReportQuestion val={this.state.question} session={this.state.report.session}
                                        newState={this.newState} points={this.state.report.quiz.points}/>
                </div>
            </div>
        );
    }


    componentDidMount() {
        getReport(this.state.report_id).then(val => {
            console.log(val);
            this.setState({report: val});
            this.setState({question: val.questions[0]});
        })

    }
}

export default Report;
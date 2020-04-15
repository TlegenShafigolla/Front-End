import React from "react";
import {getReport} from "../../services/adminAPI/reports";
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
        };
    }

    scrollTabHandleChange = (event, newValue) => {
        this.setState({question: this.state.report.questions[newValue], tab: newValue});
    };

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
                    <div className={s.root}>
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
                                    <Tab id={index} key={val.id}
                                         fullWidth={false}
                                         icon={<QuestionNumberIcon val={index + 1}
                                                                   correct={this.state.correctQuestions === null ? false : this.state.correctQuestions[index]}/>}
                                    />)}
                            </Tabs>
                        </AppBar>
                    </div>
                    <div>
                        <ReportQuestion val={this.state.question} points={this.state.report.points}/>
                    </div>
                </div>
            </div>
        );
    }

    correctAnswersList = () => {
        let arr = [];
        for (let i = 0; i < this.state.report.questions.length; i++) {
            let correct = false;
            let points = 0;
            for (let j = 0; j < this.state.report.questions[i].session.length; j++) {
                correct = correct || this.state.report.questions[i].session[j].correct;
                points += this.state.report.questions[i].session[j].points;
            }
            if (correct || points > 0) {
                arr.push(true);
            } else {
                arr.push(false);
            }
        }
        this.setState({correctQuestions: arr});
    };

    componentDidMount() {
        getReport(this.state.report_id).then(val => {
            console.log(val);
            this.setState({report: val});
            this.setState({question: this.state.report.questions[0]});
            this.correctAnswersList()
        })

    }
}

export default Report;
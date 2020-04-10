import React from "react";
import {getReport} from "../../services/adminAPI/reports";
import s from "./Report.module.css";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import QuestionNumberIcon from "./QuestionNumberIcon";
import ReportQuestion from "./ReportQuestion";

class Report extends React.Component{
    constructor(props){
        super(props);
        const {id} = this.props.match.params;
        this.state = {
            tab: 0,
            report_id: id,
            report: null,
            question: null
        };
    }

    scrollTabHandleChange = (event, newValue) => {
        console.log(newValue);
        this.setState({question: this.state.report.questions[newValue], tab: newValue});
    };

    render() {
        if(this.state.report === null){
            return '';
        }
        return(
            <div className={s.Container}>
                <div className={s.Box}>
                    <div className={s.root}>
                        <CardContent className={s.CardContent}>
                            <Typography className={s.title} gutterBottom>
                                {"Quiz: " + this.state.report.quiz_name}
                            </Typography>
                            <Typography className={s.title} gutterBottom>
                                {"Email: " + this.state.report.email}
                            </Typography>
                            <Typography className={s.title} gutterBottom>
                                {"To: " + this.state.report.name + " " + this.state.report.surname}
                            </Typography>
                            <Typography variant="h5" component="h2">
                                {"Description: " + this.state.report.description}
                            </Typography>
                            <Typography color="textSecondary">
                                {"No of questions: " + this.state.report.questions_count.toString()}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {"Quiz version of: " + this.state.report.created_date}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {"Invited: " + this.state.report.invited_date}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {"Mixed: " + this.state.report.mixed}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {"showResults: " + this.state.report.showResults}
                            </Typography>
                        </CardContent>
                    </div>
                    <div >
                        <AppBar position="static" color="default">
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
                                            icon={<QuestionNumberIcon val={index+1}/>} />)}
                            </Tabs>
                        </AppBar>
                    </div>
                    <div>
                        <ReportQuestion val={this.state.question}/>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        getReport(this.state.report_id).then(val => {
            console.log(val);
            this.setState({report: val});
            this.setState({question: this.state.report.questions[0]});
        })

    }
}

export default Report;
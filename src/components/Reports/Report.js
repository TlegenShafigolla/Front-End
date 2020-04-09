import React from "react";
import {getReport} from "../../services/adminAPI/reports";
import s from "../Invitations/invitationCard.module.css";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import ReportPreview from "./ReportPreview";
import Tab from "@material-ui/core/Tab";
import PhoneIcon from '@material-ui/icons/Phone';

class Report extends React.Component{
    constructor(props){
        super(props);
        const {id} = this.props.match.params;
        this.state = {
            report_id: id,
            report: null,
            question: null
        };
    }

    scrollTabHandleChange = (event, newValue) => {
        console.log(newValue);
        this.setState({question: this.state.report.questions[newValue]});
    };

    render() {
        if(this.state.report === null){
            return '';
        }
        return(
            <div>
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
                        <Typography className={s.pos} color="textSecondary">
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
                            value={0}
                            onChange={this.scrollTabHandleChange}
                            variant="scrollable"
                            scrollButtons="on"
                            indicatorColor="primary"
                            textColor="primary"
                            aria-label="scrollable force tabs example"
                        >
                            {this.state.report.questions.map((val, index) =>
                                   <Tab id={index} key={val.id} label="Item One" icon={<PhoneIcon />} />)}
                        </Tabs>
                    </AppBar>
                </div>
                <div>

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
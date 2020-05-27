import React from "react";
import {getReportGroup} from "../../services/API/adminAPI/Group/Report";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Questions from "./Questions";

class GroupReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            report: null,
            index: 0,
        }
    }

    componentDidMount() {
        const path = window.location.pathname.split('/');
        getReportGroup(path[4]).then(val => {
            this.setState({report: val})
        })
    }

    render() {
        return (
            <Grid container
                  alignItems="flex-start"
                  justify="flex-end"
                  spacing={3}
            >
                <Grid item lg={6} md={6} sm={8} xs={12}>
                    <Grid
                        container
                        direction="column"
                        spacing={1}
                    >
                        {this.state.report === null ? null : this.state.report.questions.map((val, index) => <Questions
                            index={this.state.index}
                            question_number={index}
                            key={val._id} val={val}/>)}
                    </Grid>
                </Grid>
                <Grid item lg={3} md={3} sm={2} xs={12}>
                    {this.state.report === null ? null : this.state.report.sessions.map((val, index) => <Paper
                        key={val._id} id={index}
                        onClick={(e) => this.setState({index: e.target.id})}>{val.email}</Paper>)}
                </Grid>
            </Grid>
        );
    }
}

export default GroupReport;
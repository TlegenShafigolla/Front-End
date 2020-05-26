import React from "react";
import {getReportGroup} from "../../services/API/adminAPI/Group/Report";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Questions from "./Questions";

class GroupReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            report: null
        }
    }

    componentDidMount() {
        const path = window.location.pathname.split('/');
        getReportGroup(path[4]).then(val => {
            console.log(val)
            this.setState({report: val})
        })
    }

    render() {
        console.log(this.state.report)
        return (
            <Grid container
                  alignItems="flex-start"
                  justify="center"
                  spacing={3}
            >
                <Grid item lg={6} md={6} sm={8} xs={12}>
                    <Grid
                        container
                        direction="column"
                        spacing={1}
                    >
                        {this.state.report === null ? null : this.state.report.questions.map(val => <Questions
                            key={val._id} val={val}/>)}
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default GroupReport;
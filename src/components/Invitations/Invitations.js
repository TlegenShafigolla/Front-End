import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import classes from './invitations.module.css'
import ListInvitationPreview from "./listInvitationPreview";
import getInvitations from "../../services/adminAPI/invitations";

class Invitations extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tab: 0,
            invitations: []
        };
    }

    handleChange = (event, newValue) => {
        console.log(newValue);
        this.setState({tab: newValue});
    };

    render() {
        return(
            <div className={classes.Container}>
                <div className={classes.Box}>
                    <Paper className={classes.root}>
                        <Tabs
                            value={this.state.tab}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab label="Pending" />
                            <Tab label="Deleted" />
                            <Tab label="Completed" />
                        </Tabs>
                    </Paper>
                    <div>
                        <ListInvitationPreview tab={this.state.tab} invitations={this.state.invitations}/>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        getInvitations().then(val => {
            console.log(val);
            this.setState({invitations: val.invitations});
        });
    }
}

export default Invitations;
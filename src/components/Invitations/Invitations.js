import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import classes from './invitations.module.css'
import ListInvitationPreview from "./listInvitationPreview";
import getInvitations, {deleteInvitations} from "../../services/API/adminAPI/Quiz/invitations";

class Invitations extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tab: 0,
            completed: [],
            inprogress: [],
            deleted: [],
            pending: [],
            invitations: []
        };
    }

    handleChange = (event, newValue) => {
        this.setState({tab: newValue});
        if(newValue === 0){
            this.setState({invitations: this.state.pending});
        } else if(newValue === 1){
            this.setState({invitations: this.state.deleted});
        } else{
            this.setState({invitations: this.state.completed});
        }
    };

    onClickDelete = (event, index) => {
        const invitation = this.state.invitations[index];
        let deletedInvitation = this.state.deleted;
        deletedInvitation.push(invitation);
        this.setState({deleted: deletedInvitation});
        let pendingInvitation = this.state.pending;
        pendingInvitation.splice(index, 1);
        this.setState({pending: pendingInvitation});
        deleteInvitations(invitation._id);
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
                        <ListInvitationPreview
                            tab={this.state.tab}
                            invitations={this.state.invitations}
                            inprogress={this.state.inprogress}
                            onClickDelete={this.onClickDelete}
                        />
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        getInvitations().then(val => {
            console.log(val);
            this.setState({
                completed: val['completed'],
                deleted: val['deleted'],
                pending: val['pending'],
                inprogress: val['in-progress'],
                tab: 0,
                invitations: val['pending']
            });
            console.log("Loaded");
        });
    }
}

export default Invitations;
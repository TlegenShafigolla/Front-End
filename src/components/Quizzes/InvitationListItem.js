import PersonListItem from "./PersonListItem";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import GroupListItem from "./GroupListItem";
import LinkListItem from "./LinkListItem";
import React from "react";

const InvitationListItem = (props) => {
    if (props.value.email !== undefined) {
        return <PersonListItem
            email={props.value.email}
            invited_date={props.value.invited_date}
            mixed={props.value.mixed}
            showResults={props.value.showResults}
            start_date={props.value.start_date}
            end_date={props.value.end_date}
            time_limit={props.value.time_limit}
            session={props.value.session}
        />;


    }
    if (props.value.group_id !== undefined && props.value.group_id !== null) {
        return <ExpansionPanel square style={{marginTop: '5px'}}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon/>}
            >
                <Typography>{props.value.group_name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <GroupListItem
                    group={props.value.group}
                    group_name={props.value.group_name}
                    invited_date={props.value.invited_date}
                    mixed={props.value.mixed}
                    showResults={props.value.showResults}
                    start_date={props.value.start_date}
                    end_date={props.value.end_date}
                    time_limit={props.value.time_limit}
                    session={props.value.session}
                />
            </ExpansionPanelDetails>
        </ExpansionPanel>

    }
    if (props.value.public) {
        return <ExpansionPanel square style={{marginTop: '5px'}}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon/>}
            >
                <Typography>Link</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <LinkListItem
                    link={props.value.link}
                    created_date={props.value.invited_date}
                    mixed={props.value.mixed}
                    showResults={props.value.showResults}
                    start_date={props.value.start_date}
                    end_date={props.value.end_date}
                    time_limit={props.value.time_limit}
                    session={props.value.session}
                />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    }
    return null;
};

export default InvitationListItem;
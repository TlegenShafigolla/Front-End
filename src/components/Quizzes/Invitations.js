import React from "react";
import Paper from "@material-ui/core/Paper";
import s from "./Invitations.module.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

class Invitations extends React.Component{
    render() {
        return(
            <Paper square elevation={3} className={s.Root}>
                <List>
                    {this.props.invitations.map((invitation, index) => <InvitationListItem key={index} value={invitation}/>)}
                </List>
            </Paper>
        );
    }
}

export default Invitations;

const InvitationListItem = (props) => {
    if(props.value.email !== null){
        return <PersonListItem email={props.value.email} created_date={props.value.invited_date}/>;
    }
    if(props.value.group_id !== undefined && props.value.group_id !== null){
        return <GroupListItem />
    }
    if(props.value.public){
        return <LinkListItem link={props.value.link} created_date={props.value.invited_date}/>
    }
    return null;
};

const PersonListItem = (props) => {
    return (
        <ListItem>
            <ListItemText
                primary={props.email}
                secondary={props.created_date}/>
        </ListItem>
    );
};

const GroupListItem = (props) => {
    return (
        <div>Group</div>
    );
};

const LinkListItem = (props) => {
    return (
        <div>Link</div>
    );
};
/*
_id: "5ec2ecf6b61f9c409c88b861"
deleted: false
finished: true
public: false
group: []
admin_id: "5ea86b192b827e365edcdb0b"
quiz_id: "5ec2e19300c32243c78b4ea4"
used_quiz_id: "5ec2ecf6b61f9c409c88b860"
invited_date: "2020-05-18T20:15:50.262Z"
start_date: null
end_date: null
time_limit: null
link: "h3vND57Zf41OkJbG"
email: "askargabitm@gmail.com"
name: "Gabit"
surname: "Askar"
*/
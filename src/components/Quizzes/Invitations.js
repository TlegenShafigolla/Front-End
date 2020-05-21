import React from "react";
import InvitationListItem from "./InvitationListItem";

class Invitations extends React.Component {
    render() {
        console.log(this.props)
        return (<div>
                {this.props.invitations.map((invitation, index) => <InvitationListItem key={index}
                                                                                       value={invitation}/>)}
            </div>
        );
    }
}

export default Invitations;

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
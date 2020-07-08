import React from "react";
import InvitationListItem from "./InvitationListItem";

const Invitations = (props) => {
    return (<div>
            {props.invitations.map((invitation, index) => <InvitationListItem key={index}
                                                                              value={invitation}/>)}
        </div>
    );
}

export default Invitations;


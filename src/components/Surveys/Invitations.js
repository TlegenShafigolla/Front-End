import React from "react";
import InvitationSurveyListItem from "./InvitationListItem";

const InvitationsSurvey = (props) => {
    if(props.invitations===undefined){
        return null
    }
    return (<div>
            {props.invitations.map((invitation, index) => <InvitationSurveyListItem key={index}
                                                                                    value={invitation}/>)}
        </div>
    );
}

export default InvitationsSurvey;


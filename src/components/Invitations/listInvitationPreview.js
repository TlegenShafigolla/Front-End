import React from "react";
import Quiz from "../MyQuizzes/Existing/quiz";
import InvitationCard from "./invitationCard";

class ListInvitationPreview extends React.Component{

    tabTypes = ["Pending", "Deleted", "Completed"];

    render() {
        return (
            <div>
                {this.props.invitations !== [] ? this.props.invitations.map((val, index) =>
                    <InvitationCard
                        key={index}
                        id={index}
                        invitation={val}
                    />) : ' '}
            </div>
        );
    }
};

export default ListInvitationPreview;
import React from "react";

class InvitationCard extends React.Component{

    render() {
        return(
            <div>
                {this.props.invitation.email}
            </div>
        );
    }
}

export default InvitationCard;
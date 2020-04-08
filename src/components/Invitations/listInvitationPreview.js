import React from "react";
import Quiz from "../MyQuizzes/Existing/quiz";
import InvitationCard from "./invitationCard";

class ListInvitationPreview extends React.Component{

    tabTypes = ["Pending", "Deleted", "Completed"];

    render() {
        return (
            <div>
                {this.props.tab === 0 && this.props.inprogress !== [] ? this.props.inprogress.map((val, index) =>
                    <InvitationCard
                        key={index}
                        id={index}
                        invitation={val}
                        type={3}
                    />) : ' '}
                {this.props.invitations !== [] ? this.props.invitations.map((val, index) =>
                    <InvitationCard
                        key={index}
                        id={index}
                        invitation={val}
                        type={this.props.tab}
                        onClickDelete={this.props.onClickDelete}
                    />) : ' '}
            </div>
        );
    }
};

export default ListInvitationPreview;
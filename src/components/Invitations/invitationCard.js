import React from "react";
import s from "./invitationCard.module.css";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";

class InvitationCard extends React.Component{

    render() {
        return(
            <div className={s.root}>
                <CardContent className={s.CardContent}>
                    <Typography className={s.title} gutterBottom>
                        {"Quiz: " + this.props.invitation.quiz.quiz_name}
                    </Typography>
                    <Typography className={s.title} gutterBottom>
                        {"Email: " + this.props.invitation.email}
                    </Typography>
                    <Typography className={s.title} gutterBottom>
                        {"To: " + this.props.invitation.name + " " + this.props.invitation.surname}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {"Description: " + this.props.invitation.quiz.description}
                    </Typography>
                    <Typography className={s.pos} color="textSecondary">
                        {"No of questions: " + this.props.invitation.quiz.questions_count.toString()}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {"Quiz version of: " +this.props.invitation.quiz.created_date}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {"Invited: " +this.props.invitation.invited_date}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {"Mixed: " +this.props.invitation.quiz.mixed}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {"showResults: " +this.props.invitation.quiz.showResults}
                    </Typography>
                </CardContent>
            </div>
        );
    }
}

export default InvitationCard;
import React from "react";
import s from "./invitationCard.module.css";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

class InvitationCard extends React.Component{

    render() {
        return(
            <div className={s.Root}>
                <CardContent className={s.CardContent}>
                    <div className={s.header}>
                        <div className={s.headerLeftColumn}>
                            <Typography variant="h4" component="p" gutterBottom>
                                {"Quiz: " + this.props.invitation.quiz.quiz_name}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {"Quiz version of: " +this.props.invitation.quiz.created_date}
                            </Typography>
                        </div>
                        <div className={s.headerRightColumn}>
                            <Typography className={s.Title} gutterBottom>
                                {"Email: " + this.props.invitation.email}
                            </Typography>
                            <Typography className={s.Title} gutterBottom>
                                {"To: " + this.props.invitation.name + " " + this.props.invitation.surname}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {"Invited: " + this.props.invitation.invited_date}
                            </Typography>
                        </div>
                    </div>
                    <Typography variant="body2" component="p">
                        {"Description: " + this.props.invitation.quiz.description}
                    </Typography>
                    <Typography className={s.pos} color="textSecondary">
                        {"No of questions: " + this.props.invitation.quiz.questions_count.toString()}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {"Mixed: " + this.props.invitation.quiz.mixed}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {"showResults: " + this.props.invitation.quiz.showResults}
                    </Typography>
                    {this.props.type === 3 ?
                        <Typography variant="body2" component="p">
                            {"Type: In-Progress"}
                        </Typography> : ''}
                    {this.props.type === 0 ?
                        <Button onClick={event => this.props.onClickDelete(event, this.props.id)}>
                            Cancel
                        </Button> : ''}
                </CardContent>
            </div>
        );
    }
}

export default InvitationCard;
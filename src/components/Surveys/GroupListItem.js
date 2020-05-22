import Grid from "@material-ui/core/Grid";
import s from "../Quizzes/Invitations.module.css";
import Chip from "@material-ui/core/Chip";
import Link from "@material-ui/core/Link";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import Typography from "@material-ui/core/Typography";
import {session} from "../../services/API/session";

const GroupSurveyListItem = (props) => {
    let group = props.group
    let email = props.session.email;
    console.log(email)


    return (
        <Grid container
              direction="column"
              justify="flex-start"
              alignItems="center">
            {group.map((val, index) => <Grid container
                                             justify="center"
                                             alignItems="center"
                                             spacing={1}
                                             key={index}>
                    <Typography variant='body1'>{val}</Typography>
                    {props.session !== undefined && props.session.email === val ?
                        <Grid item> <Link>See Report</Link> </Grid> : null}
                </Grid>
            )}
        </Grid>

    )
        ;
};
export default GroupSurveyListItem;
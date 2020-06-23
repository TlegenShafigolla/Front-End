import React, {useState} from "react";
import s from './Profile.module.css'
import Typography from "@material-ui/core/Typography";
import FaceIcon from '@material-ui/icons/Face';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Alerts from "../common/Alert";
import ProfileForm from "./ProfileForm";

const Profile = (props) => {

    let onSubmit = (value) => {
        props.feedback(value.feedback);
    }
    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start">
            <Grid item lg={8} md={8} sm={10} xs={12}>
                <Paper square elevation={3} className={s.ProfilePaper}>
                    <div className={s.ProfileInfo}>
                        <div>
                            <FaceIcon className={s.Avatar} fontSize='large'/>
                        </div>
                        <Typography variant='h6'>{props.Profile.name + " " + props.Profile.surname}</Typography>
                        <Typography>  {props.Profile.email}</Typography>
                    </div>

                </Paper>
            </Grid>
            <Grid item lg={8} md={8} sm={10} xs={12}>
                <ProfileForm onSubmit={onSubmit}/>
            </Grid>
            <Alerts variant="filled" severity="success" open={props.Success}
                  children='Success! Feedback sent!'/>

        </Grid>
    )
};
export default Profile;

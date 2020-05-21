import React from "react";
import s from './Profile.module.css'
import getProfile from "../../services/API/adminAPI/profile";
import Typography from "@material-ui/core/Typography";
import {TextareaAutosize} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FaceIcon from '@material-ui/icons/Face';
import postFeedback from "../../services/API/adminAPI/feedback";
import Snackbar from "@material-ui/core/Snackbar";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert/Alert";
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName:'',
            email:'',
            feedback: '',
            openSnackbar: false,
            submitPressed: false,
        };
    }

    snackClose = () => {
        this.setState({openSnackbar: false})
    };

    handleOnChange = (event) => {
        this.setState({feedback: event.target.value});
    };

    handleOnSubmit = () => {
        if(this.state.submitPressed){
            return;
        }
        this.setState({submitPressed: true});
        if(this.state.feedback !== ''){
            postFeedback(this.state.feedback).then(value => {
                if(value.Status === "Success"){
                    this.setState({openSnackbar: true});
                    this.setState({feedback: ''});
                }
            });
        }
        this.setState({submitPressed: false});
    };

    render() {
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
                                <Typography variant='h6' >{this.state.displayName}</Typography>
                                <Typography>  {this.state.email}</Typography>
                            </div>

                    </Paper>
                </Grid>
                <Grid item lg={8} md={8} sm={10} xs={12}>
                    <Paper square elevation={3} className={s.FeedbackPaper}>
                        <TextField
                            id="outlined-helperText"
                            label="Leave your feedback here"
                            helperText="It will help us a lot. Thanks!"
                            variant="outlined"
                            value={this.state.feedback}
                            onChange={this.handleOnChange}
                            fullWidth
                            multiline
                            rowsMax={4}
                        />
                        <Button color='primary' onClick={this.handleOnSubmit}>submit</Button>
                    </Paper>
                </Grid>
                <Snackbar
                    open={this.state.openSnackbar}
                    onClose={this.snackClose}>
                    <Alert variant="filled" severity="success">
                        Success! Feedback sent!
                    </Alert>
                </Snackbar>

            </Grid>
        )
    };

    async componentDidMount() {
        const profile = await getProfile();
        const displayName = profile['name'] + " " + profile['surname'];
        const email=profile['email'];
        this.setState({displayName: displayName});
        this.setState({email: email});
        }
}
export default Profile;

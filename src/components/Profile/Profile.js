import React from "react";
import s from './Profile.module.css'
import getProfile from "../../services/API/adminAPI/profile";
import Typography from "@material-ui/core/Typography";
import {TextareaAutosize} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FaceIcon from '@material-ui/icons/Face';
import postFeedback from "../../services/API/adminAPI/feedback";
import Snackbar from "@material-ui/core/Snackbar";
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
                <div className={s.profile}>

                    <div className={s.profileInfo}>
                        <div >
                             <FaceIcon className={s.avatar} fontSize='large'/>
                        </div>
                        <Typography variant='h6' >{this.state.displayName}</Typography>
                        <Typography>  {this.state.email}</Typography>
                    </div>
                    <div className={s.feedback}>
                        <Typography>Feedback</Typography>
                        <TextareaAutosize value={this.state.feedback} className={s.textarea} onChange={this.handleOnChange}/>
                        <Button color='primary' onClick={this.handleOnSubmit}>submit</Button>
                    </div>
                    <Snackbar
                        open={this.state.openSnackbar}
                        message="Success! Feedback sent!"
                        onClose={this.snackClose}
                    />
                </div>
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

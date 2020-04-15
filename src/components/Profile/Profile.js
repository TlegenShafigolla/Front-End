import React from "react";
import s from './Profile.module.css'
import getProfile from "../../services/adminAPI/profile";
import MenuItem from "@material-ui/core/MenuItem";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import {TextareaAutosize} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FaceIcon from '@material-ui/icons/Face';
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName:'',
            email:''
        };
    }

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
                        <TextareaAutosize className={s.textarea}/>
                        <Button color='primary'>submit</Button>
                    </div>

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

import React from "react";
import s from './Profile.module.css'
import Footer from "../Footer/Footer";
import getProfile from "../../services/api/profile";
import MenuItem from "@material-ui/core/MenuItem";
import CssBaseline from "@material-ui/core/CssBaseline";
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
            <div>
                <div className={s.profile}>
                    <div className={s.profile1}>

                    </div>

                    <div className={s.profileinfo}>
                        <div className={s.avatar}>

                        </div>
                        {this.state.displayName}
                        <br/>
                        {this.state.email}
                         <CssBaseline />
                        <MenuItem>setings</MenuItem>
                    </div>
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

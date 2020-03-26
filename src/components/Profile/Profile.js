import React from "react";
import s from './Profile.module.css'
import Footer from "../Footer/Footer";
class Profile extends React.Component {
    render() {


        return (
            <div>
                <div className={s.profile}>
                    <div className={s.profileinfo}></div>
                    <div className={s.profilephoto}></div>
                </div>
                <Footer/>
            </div>
        )
    };
}

export default Profile;

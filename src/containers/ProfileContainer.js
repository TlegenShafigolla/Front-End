import React from "react";
import {getProfile} from "../redux/Reselects/Auth-reselect";
import Profile from "../components/Profile/Profile";
import {connect} from "react-redux";
import {Success} from "../redux/Reselects/Profile-reselect";
import {feedback} from "../redux/Profile/actions";


let mapStateToProps = (state) => {
    return {
        Profile: getProfile(state),
        Success:Success(state),
    }
}
export default connect(mapStateToProps, {feedback})(Profile)
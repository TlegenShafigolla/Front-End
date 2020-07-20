import React, {useEffect, useState} from "react";
import AdminHeader from "../components/AdminHeader/AdminHeader";
import SideBar from "../components/SideBar/SideBar";
import "../css/App.css";
import {Routes} from "../function/Routes";
import {Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {requestProfile, logout} from "../redux/Auth/actions";
import Preloader from "../components/common/Preloader";
import {getProfile, isLoggedIn} from "../redux/Reselects/Auth-reselect";
import {compose} from "redux";

const Admin = (props) => {
    let [isSideBar, openSideBar] = useState(false);
    useEffect(() => {
        props.requestProfile(null)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    let LogOut = () => {
        props.logout();
    };
    let openSideBarOnClick = () => {
        openSideBar(true)
    };
    let onClose = () => {
        openSideBar(false)
    };
    if (props.isLoggedIn === null) {
        return <Preloader/>
    }
    if (!props.isLoggedIn ) {
        return <Redirect to="/login"/>;
    }
    return (
        <div>
            <AdminHeader
                OpenButton={openSideBarOnClick}
                Logout={LogOut}
                OpenSideBar={isSideBar}
                DisplayName={props.Profile.name + " " + props.Profile.surname}
            />
            <SideBar
                close={onClose}
                open={isSideBar}
            />
            <Routes open={isSideBar}/>
        </div>
    );
}

let mapStateToProps = (state) => {
    return {
        Profile: getProfile(state),
        isLoggedIn: isLoggedIn(state)
    }
}
export default compose(connect(mapStateToProps, {logout, requestProfile}), withRouter)(Admin);

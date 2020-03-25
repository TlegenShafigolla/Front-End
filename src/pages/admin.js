import React, {Component} from "react";
import AdminHeader from "../components/AdminHeader/AdminHeader";
import SideBar from "../components/SideBar/SideBar";
import "../css/App.css";
import {Routes} from "../function/Routes";
import {Redirect} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";

class admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSideBarOpen: false,
            isLoggedIn: true
        }
    }
    LogOut = () => {
        localStorage.clear();
        this.setState({isLoggedIn: false})
    }
    render() {
        if (!this.state.isLoggedIn) {
            return <Redirect to="/login"/>;
        }
        return (
            <div>
                <SideBar open={this.state.isSideBarOpen}/>
                <AdminHeader OpenButton={() => this.setState({isSideBarOpen: !this.state.isSideBarOpen})}
                             Logout={this.LogOut}
                             OpenSideBar={this.state.isSideBarOpen}/>
                <Routes open={this.state.isSideBarOpen}/>
            </div>
        );
    }

}

export default admin;

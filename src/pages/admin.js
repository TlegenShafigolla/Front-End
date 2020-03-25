import React, {Component} from "react";
import AdminHeader from "../components/AdminHeader/AdminHeader";
import SideBar from "../components/SideBar/SideBar";
import "../App.css";
import {Routes} from "../components/SideBar/Routes";
import {Redirect} from "react-router-dom";

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
        this.setState({isLoggedIn:false})
    }

    render() {
        if (!this.state.isLoggedIn) {
            return <Redirect to="/login"/>;
        }

        return (
            <div className="AdminPage">
                <SideBar open={this.state.isSideBarOpen}/>
                <div className="Content">

                    <AdminHeader OpenButton={() => this.setState({isSideBarOpen: true})} Logout={this.LogOut}/>
                    <div>
                        <Routes/>
                    </div>
                </div>
            </div>
        );
    }
}

export default admin;

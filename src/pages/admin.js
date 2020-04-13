import React, {Component} from "react";
import AdminHeader from "../components/AdminHeader/AdminHeader";
import SideBar from "../components/SideBar/SideBar";
import "../css/App.css";
import {Routes} from "../function/Routes";
import {Redirect} from "react-router-dom";
import getProfile from "../services/adminAPI/profile";

class admin extends Component {
    pageName = {

    };

    constructor(props) {
        super(props);
        this.state = {
            isSideBarOpen: false,
            isLoggedIn: true,
            displayName: '',
            pageName: '',
        }
    }
    LogOut = () => {
        localStorage.clear();
        this.setState({isLoggedIn: false})
    };
    openSideBar = () => {
        this.setState({isSideBarOpen: !this.state.isSideBarOpen})
    };

    onClickSideBar = (pageName) => {
        this.setState({pageName: pageName});
    };

    render() {
        if (!this.state.isLoggedIn) {
            return <Redirect to="/login"/>;
        }
        return (
            <div>
                <AdminHeader
                    OpenButton={this.openSideBar}
                    Logout={this.LogOut}
                    OpenSideBar={this.state.isSideBarOpen}
                    DisplayName={this.state.displayName}
                    PageName={this.state.pageName}
                />
                <SideBar
                    open={this.state.isSideBarOpen}
                    onClickSideBar={this.onClickSideBar}
                />
                <div onClick={()=>this.setState({isSideBarOpen: false})} >
                    <Routes open={this.state.isSideBarOpen}/>
                </div>

            </div>
        );
    }

    componentDidMount() {
        getProfile().then(value => this.setState({displayName: value['name'] + " " + value['surname']}));
     }

}

export default admin;

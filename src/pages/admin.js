 import React, {Component} from "react";
import AdminHeader from "../components/AdminHeader/AdminHeader";
import SideBar from "../components/SideBar/SideBar";
import "../css/App.css";
import {Routes} from "../function/Routes";
import {Redirect} from "react-router-dom";
import getProfile from "../services/API/adminAPI/profile";

class admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSideBarOpen: false,
            isLoggedIn: true,
            displayName: '',
        }
    }
    LogOut = () => {
        localStorage.clear();
        this.setState({isLoggedIn: false})
    };
    openSideBar = () => {
        this.setState({isSideBarOpen: !this.state.isSideBarOpen})
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
                />
                <SideBar
                    open={this.state.isSideBarOpen}
                />
                <div onClick={()=>this.setState({isSideBarOpen: false})} >
                    <Routes open={this.state.isSideBarOpen}/>
                </div>

            </div>
        );
    }

    componentDidMount() {
        if(localStorage.getItem('admin_name') !== null){
            this.setState({displayName: localStorage.getItem('admin_name') + " " + localStorage.getItem('admin_surname')});
        } else{
            getProfile().then(value => {
                this.setState({displayName: value['name'] + " " + value['surname']});
                localStorage.setItem('admin_name', value['name']);
                localStorage.setItem('admin_surname', value['surname']);
            });
        }
     }

}

export default admin;

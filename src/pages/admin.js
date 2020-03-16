import React from "react";
import AdminHeader from "../components/AdminHeader/AdminHeader";
import SideBar from "../components/SideBar/SideBar";
import "../App.css";
import SideBarRoutes from "../components/SideBar/SideBarRoutes";

class admin extends React.Component {

 

  render() {
    return (
      <div className="AdminPage">
        <AdminHeader />
        <SideBar />
        <div className="Content">
          <SideBarRoutes />
        </div>
      </div>
    );
  }
}
export default admin;

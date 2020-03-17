import React from "react";
import AdminHeader from "../components/AdminHeader/AdminHeader";
import SideBar from "../components/SideBar/SideBar";
import "../App.css";
import SideBarRoutes from "../components/SideBar/Routes";
import s from '../css/AdminPage.module.css'
class admin extends React.Component {

 

  render() {
    return (
      <div className="AdminPage">
        

        <SideBar />
        <div className='Content'>

        <AdminHeader />
        <div className={s.Content}>
          <SideBarRoutes />
        </div>
        </div>
        </div>
      
    );
  }
}
export default admin;

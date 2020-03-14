import React from "react";
import AdminHeader from "../components/AdminHeader/AdminHeader";
import Content from "../components/Content/Content";
import Dashbord from "../components/Dashbord/Dashbord";
import s from '../css/AdminPage.module.css'
class admin extends React.Component {
  render() {
    return (
      <div className={s.AdminPage}>
        <AdminHeader/>
       <Dashbord/> 
       <Content />
        
      </div>
    );
  }
}
export default admin;

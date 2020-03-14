import React from "react";
import Header from "../components/Header/Header";
import Content from "../components/Content/Content";
import Dashbord from "../components/Dashbord/Dashbord";
import s from '../css/AdminPage.module.css'
// import "../App.css";
class admin extends React.Component {
  render() {
    return (
      <div className={s.AdminPage}>
        <Header />
       <Dashbord/> 
       <Content />
        
      </div>
    );
  }
}
export default admin;

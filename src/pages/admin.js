import React from "react";
import Header from "../components/Header";
import "../App.css";
import Content from "../components/Content";
import Dashbord from "../components/Dashbord";
class admin extends React.Component {
  render() {
    return (
      <div className="AdminPage">
        <Header/>
       <Dashbord/>
       <Content/>
        
      </div>
    );
  }
}
export default admin;

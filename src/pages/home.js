import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";
class home extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <NavLink to="/login"><button>SignIn</button></NavLink>
        <Footer />
      </div>
    );
  }
}
export default home;

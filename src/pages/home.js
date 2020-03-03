import React from "react";
import Header from "../containers/Header";
import Footer from "../containers/Footer";
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

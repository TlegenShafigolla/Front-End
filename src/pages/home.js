import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Route } from "react-router-dom";
import Login from "./login";
class home extends React.Component {
  render() {
    return (
      <div>
        <Header page='home' />
        <div>
          <img src="https://klike.net/uploads/posts/2019-06/1561182204_1.jpg" />
          
          
        </div>
        <Footer />
        

      </div>
    );
  }
}
export default home;

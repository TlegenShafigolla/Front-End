import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import s from '../css/HomePage.module.css'
class home extends React.Component {
  render() {
    return (
      <div className={s.home}>
        <Header page='home' />
        <div className={s.body}>
            d;slf
        </div>
        <Footer/>
      </div>
    );
  }
}
export default home;
import React from "react";
import Header from "../components/Header/Header";
import s from '../css/HomePage.module.css'

class home extends React.Component {
  render() {
    return (
      <div className={s.home}>
        <Header page='home' />
      </div>
    );
  }
}
export default home;

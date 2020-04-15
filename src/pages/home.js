import React from "react";
import Header from "../components/Header/Header";
import s from '../css/HomePage.module.css'
import background from '../images/homeBackground.jpg'

class home extends React.Component {
  render() {
    return (
      <div className={s.home}>
        <Header page='home' />
        <img src={background} className={s.backgroundImage}/>
      </div>
    );
  }
}
export default home;

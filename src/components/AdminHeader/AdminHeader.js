import React from "react";
import s from "./AdminHeader.module.css";
import { SideBarCall } from "../../function/DasnbordButton";

class AdminHeader extends React.Component {
 
render(){

  return (
    
    <header className={s.header}>
    <button id="3" className={s.btn} onClick={SideBarCall}></button>
     <button className={s.btn1}>test</button>
      Logo1
    </header>
  );
}
}
export default AdminHeader;

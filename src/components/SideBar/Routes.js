 import React from 'react'
import { Route, Redirect } from "react-router-dom";
import Menu from '../Menu/Menu';
import Menu1 from '../Menu1/Menu1';
import s from '../../css/Content.module.css'
export const Routes=()=> {
   
        return (
    
        <div className={s.content}>

          <Route exact path="/admin/menu" component={Menu} />
          <Route exact path="/admin/menu1" component={Menu1} />
         <Redirect exact from='/admin' to='/admin/menu'/>
        </div>
     
    );
  
}



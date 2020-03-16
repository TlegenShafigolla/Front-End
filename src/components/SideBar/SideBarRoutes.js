import React from 'react'
import { Route, Redirect } from "react-router-dom";
import Menu from '../Menu/Menu';
import Menu1 from '../Menu1/Menu1';

class SideBarRoutes extends React.Component {
    render(){
        return (
    
        <div>

          <Route path="/admin/menu" component={Menu} />
          <Route path="/admin/menu1" component={Menu1} />
         <Redirect from='/admin' to='/admin/menu'/>
        </div>
     
    );
  }
}

export default SideBarRoutes;

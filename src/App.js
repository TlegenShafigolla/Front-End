import React, {Component} from 'react';

import './App.css';

import Header from './containers/Header';
import Footer from './containers/Footer';
import Login from './components/Login'



class App extends React.Component{
render(){
  return(
    <div>
      <Header/>
   <Login/>
    <Footer/>
    </div>
  );
}

}

export default App;

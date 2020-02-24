import React, {Component} from 'react';

import './App.css';
import SignIn from './components/SignIn';
import Header from './containers/Header';
import Footer from './containers/Footer';




class App extends React.Component{
render(){
  return(
    <div>
      <Header/>
    <SignIn/>
    <Footer/>
    </div>
  );
}

}

export default App;

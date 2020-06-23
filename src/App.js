import React,  {Component}from "react";
import "./css/App.css";
import Routes from "./routes";

class App extends Component {
    render() {
    return (
        <div className='App'>
        <Routes/>
        </div>
      );
  }
}
export default App
export const api = "http://35.228.95.87:2000";
//192.168.1.72
//35.228.95.87
import React,  {Component}from "react";
import "./css/App.css";
import Routes from "./routes";

export default class App extends Component {
  render() {
    return (
        <div className='App'>
        <Routes/>
        </div>
      );
  }
}

export const api = "http://35.228.95.87:2000";
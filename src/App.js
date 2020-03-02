import React from "react";
import { Route, Switch,} from "react-router-dom";
import "./App.css";
import Header from "./containers/Header";
import Footer from "./containers/Footer";
import Login from "./components/login";



class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/">
          <Header />
          <Login />
          <Footer />
        </Route>
        
      </Switch>
    );
  }
}
export default App;

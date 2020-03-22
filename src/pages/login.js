import React from "react";
import { login } from "../services/serverlog";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { Redirect } from "react-router-dom";
import s from '../css/Login.module.css'
import { Button } from "@material-ui/core";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      email: "", 
    password: "",
    loggedIn: false 
  };

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }

  onChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  onChangeEmail(event) {
    this.setState({ email: event.target.value });
  }
getSession(){}
  render() {
    const email = this.state.email;
    const password = this.state.password;
    const status = window.localStorage.getItem('status');
   

      if (status === 'admin' ) {
      return <Redirect to="/admin" />;
      }
      if (status === 'user') {
      return <Redirect to="/user" />;
      }
      
    return (

      <form
        onSubmit={async(e) => {
          await login(email, password, e.preventDefault());
          this.setState({loggedIn: true});    
        }}
      >
        <Header page='login'/>
        <div className={s.SignIn}>
          <input
            type="email"
            className={s.email}
            placeholder="Email"
            name="email"
            value={this.state.email}
            onChange={this.onChangeEmail}
          />
          <br />
          <input
            type="password"
            placeholder="password"
            name="password"
            className={s.password}
            value={this.state.password}
            onChange={this.onChangePassword}
          />
          <br />

          <Button variant='contained' color='primary'>Continue</Button>

        </div>
          <Footer />
      </form>
    );
  }
}

export default Login;

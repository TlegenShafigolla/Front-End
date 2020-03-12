import React from "react";
import { login } from "../services/serverlog";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Redirect } from "react-router-dom";
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
        <Header/>
        <div className="SignIn">
          <input
            type="email"
            className="email"
            placeholder="Email"
            name="email"
            id="email"
            value={this.state.email}
            onChange={this.onChangeEmail}
          />
          <br />
          <input
            type="password"
            placeholder="password"
            name="password"
            id="password"
            value={this.state.password}
            onChange={this.onChangePassword}
          />
          <br />

          <button className="btn login" type="submit">
            CONTINUE
          </button>

        </div>
          <Footer />
      </form>
    );
  }
}

export default Login;

import React from "react";
import { login } from "../services/serverlog";
import Footer from "../containers/Footer";
import Header from "../containers/Header";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }

  onChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  onChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  render() {
    const email = this.state.email;
    const password = this.state.password;

    return (
      <form
        onSubmit={e => {
          login(email, password, e.preventDefault());
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

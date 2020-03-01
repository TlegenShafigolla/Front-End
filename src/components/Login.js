import React from "react";
import { login } from "../services/serverlog";

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
    const emaill=this.state.email;
    const passwordd=this.state.password;

    return (
      <form
        onSubmit={(e) => {
          login(emaill,passwordd,e.preventDefault());
        }}
      >
        <div className="SignIn">
          <input
            type="email"
            className="email"
            placeholder="Email"
            name="email"
            id="email"
            value={this.state.email}
            onChange={this.onChangeEmail}
            // value={this.state.email}
            // onChange={this.handleUserInput}
          />
          <br />
          <input
            type="password"
            placeholder="password"
            name="password"
            id="password"
            value={this.state.password}
            onChange={this.onChangePassword}
          />{" "}
          <br />
          <button className="btn login" type="submit">
            {" "}
            CONTINUE{" "}
          </button>
        </div>{" "}
      </form>
    );
  }
}

export default Login;

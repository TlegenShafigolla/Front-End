import React from "react";
import s from "../../css/Login.module.css";
import {TextField} from "@material-ui/core";

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.email,
            password: this.props.password,
            error: this.props.error
        }
    }
        onChangePassword = (event) => {
            this.setState({password: event.target.value});
            this.setState({error: false})
        };

        onChangeEmail = (event) => {
            this.setState({email: event.target.value});
            this.setState({error: false})
        };

    render() {
        return (
            <div>
                <div className={s.input}>
                    <TextField
                        type="email"
                        placeholder="Email"
                        name="email"
                        label='Email'
                        variant='outlined'
                        autoComplete='off'
                        onChange={this.onChangeEmail}
                        autoFocus
                        fullWidth
                        error={this.state.error}
                    />
                </div>
                <div className={s.input}>
                    <TextField
                        error={this.state.error}
                        fullWidth
                        label='Password'
                        variant='outlined'
                        type="password"
                        placeholder="password"
                        name="password"
                        onChange={this.onChangePassword}
                    />
                </div>
            </div>
        );
    }
}

export default SignIn;
import React from "react";
import s from "../../css/Login.module.css";
import {TextField} from "@material-ui/core";
import {login} from "../../services/serverlog";
import logo from "../../images/logoPng.png";
import Button from "@material-ui/core/Button";
import {Link, Redirect} from "react-router-dom";

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loggedIn: false,
            disabledButton: false,
            error:false
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
    onClickButton = async () => {
        if (this.state.disabledButton) {
            return;
        }
        this.setState({disabledButton: true});
        await login(this.state.email, this.state.password).then(data => {
            console.log(data);
            if(data.message === "Auth failed") {
                this.setState({error: true})
            } else{
                //localStorage.setItem('refresh_token',data['refresh_token']);
                localStorage.setItem("access_token", data["access_token"]);
                //localStorage.setItem("status", data["type"]); TODO add type to Node
                localStorage.setItem("status", 'admin');
                localStorage.setItem('access_time', Date());
            }
        });

        this.setState({loggedIn: true});
        this.setState({disabledButton: false});

    };
    render() {
        const status = localStorage.getItem('status');

        if (status === 'admin') {
            return <Redirect to='/admin/profile'/>;
        }
        if (status === 'user') {
            return <Redirect to="/user"/>;
        }

        return (
            <div className={s.SignIn}>
                <img className={s.logo} src={logo} alt="Logo"/>
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
                <Button variant='contained' color='primary' onClick={this.onClickButton}>Continue</Button>
                <div className={s.forgot}>
                    <Link to='#'underline='none'>Forgot password?</Link>
                    <Link to='/registration' underline='none'>sign Up</Link>
                </div>
            </div>
        );
    }
}

export default SignIn;
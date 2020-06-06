import React from "react";
import s from "../../css/Login.module.css";
import {TextField} from "@material-ui/core";
import {login} from "../../services/API/login";
import logo from "../../images/logoPng.png";
import Button from "@material-ui/core/Button";
import {Link, Redirect} from "react-router-dom";

const SignIn=(props)=> {

   let onChangePassword = (event) => {
        props.onChangePassword(event.target.value);
    };

   let onChangeEmail = (event) => {
        props.onChangeEmail(event.target.value);
    };
    // onClickButton = async () => {
    //     if (this.state.disabledButton) {
    //         return;
    //     }
    //     this.setState({disabledButton: true});
    //     await login(this.props.email, this.state.password).then(data => {
    //         console.log(data);
    //         if (data.message === "Auth failed") {
    //             this.setState({error: true})
    //         } else {
    //             //localStorage.setItem('refresh_token',data['refresh_token']);
    //             localStorage.setItem("access_token", data["access_token"]);
    //             localStorage.setItem("status", data["type"]);
    //             localStorage.setItem('access_time', Date());
    //         }
    //     });
    //
    //     this.setState({loggedIn: true});
    //     this.setState({disabledButton: false});
    //
    // };

    // render() {
    //     const status = localStorage.getItem('status');
    //
    //     if (status === 'admin') {
    //         return <Redirect to='/admin/profile'/>;
    //     }
    //     if (status === 'user') {
    //         return <Redirect to="/user"/>;
    //     }
        return (
            <form onSubmit={()=>console.log('p')} className={s.loginPage}>
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
                            onChange={onChangeEmail}
                            value={props.email}
                            autoFocus
                            fullWidth
                            error={props.error}
                        />
                    </div>
                    <div className={s.input}>
                        <TextField
                            error={props.error}
                            fullWidth
                            label='Password'
                            variant='outlined'
                            type="password"
                            placeholder="password"
                            name="password"
                            onChange={onChangePassword}
                        />
                    </div>
                    <Button variant='contained' color='primary' >Continue</Button>
                    <div className={s.forgot}>
                        <Link to='#' underline='none'>Forgot password?</Link>
                        <Link to='/registration' underline='none'>Register</Link>
                    </div>
                </div>
            </form>
        );
    }

export default SignIn;
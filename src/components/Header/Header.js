import React from "react";
import s from "./Header.module.css";
import {NavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";
import logo from "../../images/192x192logoGray.png";
import {Typography} from "@material-ui/core";

const Header = props => {
    let page = props.page;
    if (page === "home") {
        return (
            <header className={s.header}>
                <div className={s.headerLogo}>
                    <img className={s.logo} src={logo} alt="Logo"/>
                    <Typography className={s.name} variant="h5" noWrap color="primary">
                        QUIZZES
                    </Typography>
                    <div className={s.headerButton}>
                        <Button color="primary">
                            Register
                        </Button>
                        <NavLink to="/login">
                            <Button variant="contained" color="primary">
                                SignIn
                            </Button>
                        </NavLink>
                    </div>
                </div>
            </header>
        );
    } else if (page === "login") {
        return (
            <header className={s.header}>
                <Button variant="contained" color="primary">
                    SignUp
                </Button>
            </header>
        );
    }
};
export default Header;


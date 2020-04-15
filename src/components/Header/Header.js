import React from "react";
import s from "./Header.module.css";
import {NavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";

const Header = props => {
    let page = props.page;
    if (page === "home") {
        return (
            <header className={s.header}>
                <NavLink to="/login">
                    <Button variant="contained" color="primary">
                        SignIn
                    </Button>
                </NavLink>
                <Button color="primary">
                    SignUp
                </Button>
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


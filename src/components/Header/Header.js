import React from "react";
import s from "./Header.module.css";
import {NavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";
import logo from "../../images/192x192logoGray.png";
import {Typography} from "@material-ui/core";

const Header = () => {
        return (
            <header className={s.header}>
                    <img className={s.logo} src={logo} alt="Logo"/>
                    <Typography className={s.name} variant="h5" noWrap color="primary">
                        QUIZZES
                    </Typography>
                    <div className={s.headerButton}>
                        <NavLink to='/registration'>
                        <Button color="primary">
                            Register
                        </Button>
                        </NavLink>
                        <NavLink to="/login">
                            <Button variant="contained" color="primary">
                                SignIn
                            </Button>
                        </NavLink>
                    </div>
            </header>
        );
};
export default Header;


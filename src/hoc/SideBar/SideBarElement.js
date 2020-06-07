import React from "react";
import {NavLink} from "react-router-dom";
import s from "../../components/SideBar/SideBar.module.css";
import Button from "@material-ui/core/Button";

export const Element = ({to, icon, children}) => {
    return (<NavLink to={to} activeClassName={s.focus}>
            <Button color='primary'
                    className={s.main}
                    startIcon={icon}>
                {children}
            </Button>
        </NavLink>
    );
}

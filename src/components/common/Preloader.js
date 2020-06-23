import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import s from "./common.module.css"

const Preloader = (props) => {
    return <div className={s.Preloader} ><CircularProgress size={70}/></div>
}
export default Preloader;
import React from "react";
import s from './css/Board.module.css'
import {Link} from 'react-scroll'
import Paper from "@material-ui/core/Paper/Paper";

const board = (props) => {
    return (
        <Paper square elevation={3} className={props.value.length === 0 ? s.display : s.BoardRows}>
        <Link
            activeClass="active"
            to={props.value.order_id.toString()}
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
        >
            <div className={s.Board}>
                <div className={s.OrderId}>
                    {props.value.order_id}
                </div>
                {props.value.type === 'FILL THE BLANK' ? 'FB' : 'MC'}
            </div>
        </Link>
        </Paper>

    );
};

export default board;
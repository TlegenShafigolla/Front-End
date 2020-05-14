import React from "react";
import s from './css/Board.module.css'
import {Link} from 'react-scroll'

const board = (props) => {
    return (
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
    );
};

export default board;
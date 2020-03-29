import React from "react";
import s from './Board.module.css'
import * as Scroll from 'react-scroll';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
class board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            question_id: props.id,

        };
    }
    render() {
        return (
            <a href={'#'+this.props.value.order_id}  >
            <div className={s.Board} >
            <div className={s.orderid}>
                {this.props.value.order_id}
            </div>
            </div>
            </a>
        );
    };
};
export default board;
import React from "react";
import s from './Board.module.css'
import { Link} from 'react-scroll'
class board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            question_id: props.id,

        };
    }
    render() {
        console.log(this.props.value)
        return (
            <Link
                activeClass="active"
                to={this.props.value.order_id.toString()}
                spy={true}
                smooth={true}
                offset={-70}
                duration= {500}
            >
            <div className={s.Board}>
                <div className={s.orderid}>
                    {this.props.value.order_id}
                </div>
                {this.props.value.type==='FILL THE BLANK'?'FB':'MC'}
            </div>
            </Link>
        );
    };
}
export default board;
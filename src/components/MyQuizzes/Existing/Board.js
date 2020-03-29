import React from "react";
import s from './Board.module.css'
class board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            question_id: props.id,

        };
    }
    render() {
        return (
            <div className={s.Bord}>
            <div className={s.orderid}>
                {this.props.value.order_id}
            </div>
            </div>
        );
    };
};
export default board;
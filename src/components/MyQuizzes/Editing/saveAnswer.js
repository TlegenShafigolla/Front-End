import React from "react";
import TextField from "@material-ui/core/TextField";

class saveAnswers extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            index:this.props.index,
            value:this.props.value
        }
    }
    render() {
        return (
            <TextField
                id={this.state.index.toString()}
                key={this.state.index}
                placeholder="Answer"
                fullWidth
                defaultValue={this.state.value}
                // onChange={this.props.onChangeAnswer}

            />

        );
    }
}
export default saveAnswers;
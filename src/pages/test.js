import React from 'react'
import {Dialog} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {getInvitation} from "../services/api/invitation";

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
            email: '',
            correctEmail:false,
        }
    }

    onChangeEmail = (event) => {
        this.setState({email: event.target.value})
    }
    onClickContinue = async () => {
        // const email = {
        //     email: this.state.email
        // }
        // await postTest(email)
        // this.setState({correctEmail:true})
    }

componentWillMount() {
        getInvitation().then(json => {
            this.setState({status: json.status})
        }).then(val=>console.log(val))
}

    render() {
        if (this.state.status === 'Success') {
            return (
                <div>
                    <Dialog open={true}>
                        <DialogContent>
                            <TextField margin="dense"
                                       id="Email"
                                       label="Email Address"
                                       type="email"
                                       onChange={this.onChangeEmail}
                                       fullWidt/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.onClickContinue}>Continue</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            );
        }
        if (this.state.status === 'Success' &&this.state.correctEmail) {
            return (
                 <div>
                    test
                </div>
            )
        }
        else {
            return (
                <div>
                    error
                </div>
            )
        }
    }


}

export default Test;
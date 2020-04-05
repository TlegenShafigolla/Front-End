import React from 'react'
import {Dialog} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {getInvitation, postEmail} from "../services/api/invitation";

class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: null,
            email: null,
            statusEmail: false,
        }
    }

    onChangeEmail = (event) => {
        this.setState({email: event.target.value})
    };

    onClickContinue = async () => {
        const path = window.location.pathname.split('/');
        const email = this.state.email;
        await postEmail(path[2], email).then(json => console.log(json));
    };

    UNSAFE_componentWillMount = async () => {
        const path = window.location.pathname.split('/')
        localStorage.setItem('quiz_link', path[2]);
        await getInvitation(path[2]).then(json => {
            console.log(json);
            this.setState({status: "Success" === json.Status});
        });
    };

    render() {
        if(this.state.status === null){
            return '';
        }
        if (this.state.status === true && this.state.statusEmail === false) {
            return (
                <div>
                    <Dialog open={true}>
                        <DialogContent>
                            <TextField margin="dense"
                                       id="Email"
                                       label="Email Address"
                                       type="email"
                                       onChange={this.onChangeEmail}
                                       fullWidth/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.onClickContinue}>Continue</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            );
        } else if (this.state.status === true && this.state.statusEmail === true) {
            return (
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, explicabo.
                </div>
            )
        } else {
            return (
                <div>
                    error
                </div>
            )
        }
    }

}

export default Quiz;
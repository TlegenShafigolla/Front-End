import React from "react";
import {Dialog} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
 class CheckEmail  extends React.Component{
     render() {
         return (
             <div>
                 <Dialog open={true} fullWidth={true} maxWidth='xs'>
                     <DialogContent>
                         <TextField
                                    error={this.props.error}
                                    margin="dense"
                                    id="Email"
                                    label="Email Address"
                                    type="email"
                                    onChange={this.props.onChangeEmail}
                                    fullWidth/>
                     </DialogContent>
                     <DialogActions>
                         <Button onClick={this.props.onClickContinue}>Continue</Button>
                     </DialogActions>
                 </Dialog>
             </div>
         );
     }
 }
 export default CheckEmail;
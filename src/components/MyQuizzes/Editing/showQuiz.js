import React from "react";
import s from "../listQuizPreview.module.css";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import {Tooltip} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import Snackbar from "@material-ui/core/Snackbar";

class ShowQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openSnackbar: false,
            vertical: 'top',
            horizontal: 'center',
        }
    }

    onClickInvite = () => {
        this.setState({open: true})
    }
    onClickInviteInDialog = (newState) => {
        this.setState({open: false});
        this.setState({openSnackbar: true, ...newState})
    }
    snackClose = () => {
        this.setState({openSnackbar: false})
    }

    render() {
        return (<div className={s.root}>
            <CardContent className={s.CardContent}>
                <Typography className={s.title} color="textSecondary" gutterBottom>
                    {this.props.quiz_name}  </Typography>
                <Typography variant="h5" component="h2"> {this.props.description} </Typography>
                <Typography className={s.pos}
                            color="textSecondary"> {this.props.value.questions_count.toString()} </Typography>
                <Typography variant="body2"
                            component="p"> {this.props.last_edited_date.toString()} </Typography>
            </CardContent>
            <CardActions className={s.CardActions}>
                <Button onClick={this.onClickInvite}>Invite</Button>
                <Button onClick={this.props.editMode}>
                    Edit
                </Button>
                <Link to={'/admin/quizzes/edit/' + this.props.value.id.toString()}>
                    <IconButton color="primary" className={s.ArrowButton} onClick={this.handleClick}>
                        <ArrowForwardIosIcon fontSize='large'/>
                    </IconButton>
                </Link>
                <Tooltip title='Delete'>
                    <IconButton size='small' className={s.DeleteButton} onClick={this.props.deleteQuizOnClick}
                                aria-label='delete'>
                        <HighlightOffIcon fontSize='small' color='secondary'/>
                    </IconButton>
                </Tooltip>
            </CardActions>
            <Dialog open={this.state.open} onBackdropClick={() => this.setState({open: false})}
                    aria-labelledby="Invite">
                <DialogActions>
                    <IconButton size='small' onClick={() => this.setState({open: false})}
                                aria-label='delete'>
                        <HighlightOffIcon fontSize='small' color='secondary'/>
                    </IconButton>
                </DialogActions>
                <DialogTitle id="Invite">Invite: {this.props.quiz_name}</DialogTitle>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="type" name="Results">
                        <FormControlLabel value="person" control={<Radio color="primary"/>}
                                          checked={true}
                                          label="Person"/>
                        <FormControlLabel value="Class" control={<Radio color="primary"/>}
                                          checked={true}
                                          disabled={true} label='Class'/>

                    </RadioGroup>
                </FormControl>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        fullWidth
                    /> <TextField
                    autoFocus
                    margin="dense"
                    id="Surname"
                    label="Surname"
                    fullWidth
                />
                    <TextField
                        margin="dense"
                        id="Email"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={this.onClickInviteInDialog}>
                        Invite
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={this.state.openSnackbar}
                message="Message"
                onClose={this.snackClose}
            />
        </div>);
    }
}

export default ShowQuiz;

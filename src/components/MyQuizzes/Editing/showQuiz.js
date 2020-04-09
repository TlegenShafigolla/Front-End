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
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import Snackbar from "@material-ui/core/Snackbar";
import {postQuizInvitation} from "../../../services/adminAPI/quiz";

class ShowQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openSnackbar: false,
            name: null,
            surname: null,
            email: null,
            quiz_id: this.props.quiz_id,
            inviteChange: false,
            errorName: false,
            errorSurname: false,
            errorEmail: false
        }
    }

    onChangeName = (event) => {
        this.setState({name: event.target.value})
        this.setState({errorName: false})
    };
    onChangeSurname = (event) => {
        this.setState({surname: event.target.value})
        this.setState({errorSurname: false})
    };
    onChangeEmail = (event) => {
        this.setState({email: event.target.value})
        this.setState({errorEmail: false})
    };
    onClickInvite = () => {
        this.setState({open: true})
    };
    onClickInviteInDialog = async () => {
        let email=/[0-9a-z_-]+@[0-9a-z_-]+\.[a-z]{2,5}$/i;
        console.log(email)
        if (this.state.name !== null && this.state.name !== '' && this.state.surname !== null && this.state.surname !== '' && email.test(this.state.email)) {
            const invite = {
                name: this.state.name,
                surname: this.state.surname,
                email: this.state.email,
                quiz_id: this.state.quiz_id
            };
            await postQuizInvitation(invite).then((val) => {
                if (val.Status === 'Success') {
                    this.setState({openSnackbar: true});
                }
                console.log(val)
            });

            this.setState({open: false});
        }
        if (this.state.name === '' || this.state.name === null) {
            this.setState({errorName: true})
        }
        if (this.state.surname === '' || this.state.surname === null) {
            this.setState({errorSurname: true})
        }
        if (!email.test(this.state.email)) {
            this.setState({errorEmail: true})
        }

    };
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
                <Button onClick={this.onClickInvite}>
                    Invite
                </Button>
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
            <Dialog open={this.state.open}
                    aria-labelledby="Invite"
            >
                <DialogActions>
                    <IconButton size='small' onClick={() => {
                        this.setState({open: false})
                        this.setState({email: null})
                        this.setState({name: null})
                        this.setState({surname: null})
                    }}
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
                        error={this.state.errorName}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        fullWidth
                        variant='outlined'
                        onChange={this.onChangeName}
                    /> <TextField
                    error={this.state.errorSurname}
                    margin="dense"
                    id="Surname"
                    label="Surname"
                    fullWidth
                    variant='outlined'
                    onChange={this.onChangeSurname}
                />
                    <TextField
                        error={this.state.errorEmail}
                        margin="dense"
                        id="Email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant='outlined'
                        onChange={this.onChangeEmail}
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
                message="Success"
                onClose={this.snackClose}
            />
        </div>);
    }
}

export default ShowQuiz;

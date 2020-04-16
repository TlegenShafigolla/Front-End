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
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';
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
            errorEmail: false,
            last_edited_date: this.props.last_edited_date,
            quiz_name: this.props.quiz_name
        }
    }

    onChangeName = (event) => {
        this.setState({name: event.target.value});
        this.setState({errorName: false})
    };
    onChangeSurname = (event) => {
        this.setState({surname: event.target.value});
        this.setState({errorSurname: false})
    };
    onChangeEmail = (event) => {
        this.setState({email: event.target.value});
        this.setState({errorEmail: false})
    };
    onClickInvite = () => {
        this.setState({open: true})
    };
    onClickInviteInDialog = async () => {
        let email = /[0-9a-z_-]+@[0-9a-z_-]+\.[a-z]{2,5}$/i;
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
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.last_edited_date !== this.props.last_edited_date) {
            this.setState({last_edited_date: Date})
        }
    }

    render() {
        return (<div className={s.root}>
            <CardContent className={s.CardContent}>
                <Typography variant="h5" component="h2">
                    {this.props.quiz_name}  </Typography>
                <Typography className={s.title} gutterBottom> {this.props.description} </Typography>
                <Typography className={s.pos} > {this.props.value.questions_count.toString()} </Typography>
                <Typography variant="body2"
                            component="p"
                            color="textSecondary"
                            >Version: {this.props.last_edited_date.toString()} </Typography>
            </CardContent>
            <CardActions className={s.CardActions}>
                <div className={s.ButtonPanel}>
                    <Tooltip title='Invite'>
                        <IconButton color="primary" onClick={this.onClickInvite}>
                           <ShareIcon fontSize='meduim'/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Edit'>
                        <IconButton color="primary" onClick={this.props.editMode}>
                            <EditIcon fontSize='meduim'/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Delete'>
                        <IconButton size='small' onClick={this.props.deleteQuizOnClick}
                                    aria-label='delete'>
                            <DeleteIcon fontSize='medium' color='primary'/>
                        </IconButton>
                    </Tooltip>
                </div>
                <Link to={'/admin/quizzes/edit/' + this.props.value.id.toString()}>
                    <IconButton color="primary" className={s.ArrowButton} onClick={this.handleClick}>
                        <ArrowForwardIosIcon fontSize='large'/>
                    </IconButton>
                </Link>
            </CardActions>
            <Dialog open={this.state.open}
                    aria-labelledby="Invite"
            >
                <DialogActions>
                    <IconButton size='small' onClick={() => {
                        this.setState({open: false});
                        this.setState({email: null});
                        this.setState({name: null});
                        this.setState({surname: null})
                    }}
                                aria-label='delete'>
                        <HighlightOffIcon fontSize='small' color='secondary'/>
                    </IconButton>
                </DialogActions>
                <DialogTitle id="Invite">Invite: {this.state.quiz_name}</DialogTitle>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="type" name="Results">
                        <div className={s.radioButton}>

                            <FormControlLabel value="person" control={<Radio color="primary"/>}
                                              checked={true}
                                              label="Person"/>
                            <FormControlLabel value="Class" control={<Radio color="primary"/>}
                                              checked={true}
                                              disabled={true} label='Class'/>
                        </div>

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

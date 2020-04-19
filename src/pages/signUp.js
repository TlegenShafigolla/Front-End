import React from "react";
import s from '../css/SignUp.module.css'
import logo from "../images/logoPng.png";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {registration} from "../services/userAPI/registration";
class SignUp extends React.Component{
    constructor(props) {
        super(props);
       this.state={
           email:'',
           name:'',
           surname:'',
           password:'',
           occupation:'',
           confirmPassword:''
       }
    }
    onChangeEmail=(event)=>{
        this.setState({email:event.target.value})
    };
    onChangeName=(event)=>{
        this.setState({name:event.target.value})
    };
    onChangeSurname=(event)=>{
        this.setState({surname:event.target.value})
    };
    onChangeOccupation=(event)=>{
        this.setState({occupation:event.target.value})
    };
    onChangePassword=(event)=>{
        this.setState({password:event.target.value})
    };
    onChangeConfirmPassword=(event)=>{
        this.setState({confirmPassword:event.target.value})
    };
    onClickSubmitButton=async()=>{
        let email =this.state.email;
        let name =this.state.name.trim();
        let surname =this.state.surname.trim();
        let occupation =this.state.occupation.trim();
        let password =this.state.password.trim();
        let emailTest = /[0-9a-z_-]+@[0-9a-z_-]+\.[a-z]{2,5}$/i;
        let confirmPassword =this.state.confirmPassword.trim();
        if(emailTest.test(email)&&name!==''&&surname!==''&&occupation!==''&&password===confirmPassword&&password!=='') {
            await registration(name, surname, password, occupation, email).then(val=>console.log(val))
        };
    }
    render() {

        return(
            <div className={s.registrationPage}>
                <div className={s.SignUp}>
                    <img className={s.logo} src={logo} alt="Logo"/>
                        <TextField
                            margin='dense'
                            type="email"
                            name="email"
                            label='Email'
                            variant='outlined'
                            autoComplete='off'
                            onChange={this.onChangeEmail}
                            fullWidth
                            autoFocus
                        />
                        <TextField
                            margin='dense'
                            type='name'
                            name="name"
                            label='Name'
                            variant='outlined'
                            autoComplete='off'
                            onChange={this.onChangeName}
                            fullWidth
                        />
                        <TextField
                            margin='dense'
                            type="surname"
                            name="surname"
                            label='Surname'
                            variant='outlined'
                            autoComplete='off'
                            onChange={this.onChangeSurname}
                            fullWidth
                        />
                        <TextField
                            margin='dense'
                            type="occupation"
                            name="occupation"
                            label='Occupation'
                            variant='outlined'
                            autoComplete='off'
                            onChange={this.onChangeOccupation}
                            fullWidth
                        />
                        <TextField
                            margin='dense'
                            fullWidth
                            label='Password'
                            variant='outlined'
                            type="password"
                            name="password"
                            onChange={this.onChangePassword}
                        />
                        <TextField
                            margin='dense'
                            fullWidth
                            label='Confirm password'
                            variant='outlined'
                            type="password"
                            name="password"
                            onChange={this.onChangeConfirmPassword}
                        />
                    <div className={s.Button}>
                    <Button onClick={this.onClickSubmitButton} variant='contained' color='primary'>Submit</Button>
                    </div>
                </div>
            </div>
        );
    }
}
export default SignUp;
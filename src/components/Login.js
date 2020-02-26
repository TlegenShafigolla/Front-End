import React from 'react';

class Login extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         email: '',
    //         password: ''
    //     } 
    // } 
    // handleUserInput = (e) => {
    //     const name = e.target.name;
    //     const value = e.target.value;
    //     this.setState({[name]: value});
    //   }
   
    render() {
        return ( <form  action="http://35.228.95.87:7000" method="POST" name = "test" id = "form" >

            <div className = "SignIn" >

            <input type = "email"
            className = "email"
            placeholder = "Email"
            name = "email"
            id = "email"
            // value={this.state.email} 
            // onChange={this.handleUserInput}
            / >
                <br/>
            <input type = "password"
            placeholder = "password"
            name = "password"
            id = "password"
/> <br/>
            <button className = "btn login" type = "submit" onClick = {this.login} > CONTINUE </button> 
            </div> </form>
        );


    }

}
 
export default Login;
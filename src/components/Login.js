import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: '',
    password:''};
    
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
        
      }
    
      onChangePassword(event){
        this.setState({password: event.target.value});
        
      }
  
      onChangeEmail(event) {
        this.setState({email: event.target.value});
       
      }
  
    Login=async(e)=>{
        e.preventDefault();
        return fetch('http://35.228.95.87:7000/login', {
        method: 'Post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "email": this.state.email,
          "password": this.state.password,
        })
    }).then(res => {
            return res.json();        
    })
    // .then(json=>console.log(JSON.parse(SuccessLogin)[acces_token]))
    
    .then(data=>{console.log(data);
        if(data['type']==='admin')
    localStorage.setItem('admin',data['access_token']);
    else
    localStorage.setItem('user',data['access_token']);

    })

    .catch(error=>console.log(error))
    }
    
        render() {
            
        return ( <form onSubmit={this.Login} >

            
            <div className = "SignIn" >
             
            <input type = "email"
            className = "email"
            placeholder = "Email"
            name = "email"
            id = "email"
            value={this.state.email}  onChange={this.onChangeEmail}
            // value={this.state.email} 
            // onChange={this.handleUserInput}
            / >
                <br/>
            <input type = "password"
            placeholder = "password"
            name = "password"
            id = "password"
            value={this.state.password}  onChange={this.onChangePassword}
/> <br/>
            <button className = "btn login" type = "submit" > CONTINUE </button> 
            </div> </form>
        );


    }

}
 
export default Login;
import React from 'react';
import Email from './Email';
import BtnLogin from './btnlogin';
import Password from './password';
class SignIn extends React.Component{
render(){
    return(
        <div id="SignIn">
            <Email/>
            <Password/>
            <BtnLogin/>
        </div>
    );
}
}
export default SignIn;
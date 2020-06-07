import SignIn from "../components/Login/login";
import {connect} from "react-redux";
import {LogIn} from "../redux/LoginPage/actions";

let mapStateToProps = (state) => {
    return {
        Auth: state.loginPage.Auth
    }
}

export default connect(mapStateToProps,{LogIn})(SignIn);


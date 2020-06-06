import SignIn from "../components/Login/login";
import {connect} from "react-redux";
import {onChangeEmail, onChangePassword} from "../redux/LoginPage/actions";

let mapStateToProps = (state) => {
    return {
        email: state.loginPage.email,
        password: state.loginPage.password,
        disabledButton: state.loginPage.disabledButton,
        error: state.loginPage.error,
    }
}

export default connect(mapStateToProps, {onChangeEmail,onChangePassword})(SignIn);


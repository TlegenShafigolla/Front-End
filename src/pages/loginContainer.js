import SignIn from "../components/Login/login";
import {connect} from "react-redux";
import {LogIn} from "../redux/Auth/actions";

let mapStateToProps = (state) => {
    return {
        Auth: state.Auth.Auth
    }
}

export default connect(mapStateToProps,{LogIn})(SignIn);

